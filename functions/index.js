const functions = require("firebase-functions");

const admin = require("firebase-admin");
admin.initializeApp();

const objectives = require('./objectives.json'); 

function getRandomObjective() {
  return objectives[Math.floor(Math.random()*objectives.length)];
}

exports.handleObjWrite = functions.database.ref("/users/{usr}/objectives/{obj}/")
    .onWrite((change, context) => {
      promises = [];
      const obj = change.after.val();
      functions.logger.log(context.params.usr, context.params.obj);
      functions.logger.log(obj);

      const type = obj["type"];

      // Objective is complete
      if ((type === "ge" && obj["current"] >= obj["goal"]) || 
          (type === "le" && obj["current"] <= obj["goal"])) {

        functions.logger.log(context.params.obj, "completed");

        // Copy completed objective to completed objectives list
        promises.push(admin.database().ref("/users/"+context.params.usr+"/completed_objectives/").push(obj));

        // Replace completed objective with new objective
        promises.push(change.after.ref.parent.child(context.params.obj).set(getRandomObjective()));
      }

      return Promise.all(promises);
    });
