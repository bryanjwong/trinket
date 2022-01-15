const functions = require("firebase-functions");

const admin = require("firebase-admin");
admin.initializeApp();

const objectives = require('./objectives.json'); 
const trinkets = require('./trinkets.json'); 

function getRandomObjective() {
  var obj = objectives[Math.floor(Math.random()*objectives.length)];
  obj["completed"] = false;
  return obj;
}

function getRandomTrinket(trinketId) {
  var trinket = trinkets[Math.floor(Math.random()*trinkets.length)];
  trinket["trinketId"] = trinketId;
  trinket["currExp"] = 0;
  trinket["level"] = 1;
  trinket["evolveLevel"] = 1;
  trinket["totalSteps"] = 0;
  trinket["totalDuration"] = 0;
  return trinket;
}

exports.handleObjWrite = functions.database.ref("/users/{usr}/objectives/{obj}/")
  .onWrite((change, context) => {
    promises = [];
    const obj = change.after.val();
    functions.logger.log(context.params.usr, context.params.obj);
    functions.logger.log(obj);

    // Objective is complete
    if (obj["completed"] === true) {

      functions.logger.log(context.params.obj, "completed");
      obj["completion_time"] = Date.now();
      
      // Handle rewards
      const reward = obj["reward"];
      if (reward["type"] === "exp") {
        promises.push(
          admin.database()
               .ref("/users/"+context.params.usr+"/consts/activeId")
               .once("value")
               .then((snapshot) => {
                 var activeId = snapshot.val();
                 admin.database()
                      .ref("/users/"+context.params.usr+"/trinkets/"+activeId+"/currExp")
                      .set(admin.database.ServerValue.increment(reward["value"]))
               })
        ); 
      }
      if (reward["type"] === "trinket") {
        promises.push(
          admin.database()
               .ref("/users/"+context.params.usr+"/consts/trinketId")
               .once("value")
               .then((snapshot) => {
                 var trinketId = snapshot.val();
                 functions.logger.log("snapshot", snapshot);
                 functions.logger.log("trinketId", trinketId);
                 return admin.database()
                             .ref("/users/"+context.params.usr+"/trinkets/")
                             .child(trinketId)
                             .set(getRandomTrinket(trinketId))
               })
               .then((snapshot) => {
                 return admin.database()
                             .ref("/users/"+context.params.usr+"/consts/trinketId")
                             .set(admin.database.ServerValue.increment(1))
               })
        );
      }

      // Copy completed objective to completed objectives list
      promises.push(admin.database().ref("/users/"+context.params.usr+"/completed_objectives/").push(obj));

      // Replace completed objective with new objective
      promises.push(change.after.ref.parent.child(context.params.obj).set(getRandomObjective()));
    }

    return Promise.all(promises);
  });

exports.getNewObjs = functions.database.ref("/users/{usr}/objectives")
  .onCreate((snap, context) => {
    promises = [];
    promises.push(admin.database().ref("/users/"+context.params.usr+"/objectives/obj1").set(getRandomObjective()));
    promises.push(admin.database().ref("/users/"+context.params.usr+"/objectives/obj2").set(getRandomObjective()));
    promises.push(admin.database().ref("/users/"+context.params.usr+"/objectives/obj3").set(getRandomObjective()));
    return Promise.all(promises);
  });

exports.handleTrinketLevelUp = functions.database.ref("/users/{usr}/trinkets/{tid}")
  .onWrite((change, context) => {
    var obj = change.after.val();
    if (obj["currExp"] < obj["goalExp"]) return;

    while (obj["currExp"] >= obj["goalExp"]) {
      obj["currExp"] -= obj["goalExp"];
      obj["level"]++;
      if (obj["level"] == 5 || obj["level"] == 10) {
        obj["evolveLevel"]++;
      }
    }
    return change.after.ref.set(obj);
    // return admin.database().ref("/users/"+context.params.usr+"/active_trinket/").set(obj);
  });

exports.swapActive