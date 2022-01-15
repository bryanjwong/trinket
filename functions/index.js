const functions = require("firebase-functions");

const admin = require("firebase-admin");
admin.initializeApp();

const objectives = require('./objectives.json'); 

function getRandomObjective() {
  var obj = objectives[Math.floor(Math.random()*objectives.length)];
  obj["completed"] = false;
  return obj;
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
      
      // Handle reward
      const reward = obj["reward"];
      if (reward["type"] === "exp") {
        promises.push(admin.database()
                            .ref("/users/"+context.params.usr+"/active_trinket/currExp")
                            .set(admin.database.ServerValue.increment(reward["value"])));
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

exports.handleTrinketLevelUp = functions.database.ref("/users/{usr}/active_trinket/")
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
    return admin.database().ref("/users/"+context.params.usr+"/active_trinket/").set(obj);
  });