const AWS = require("aws-sdk");
AWS.config.update({ region: "us-west-2" });

const dynamo = new AWS.DynamoDB.DocumentClient();
const routeHandler = require("./routeHandler/routeHandler.js");

let params = {
  TableName: "Heroes",
};
let heroes_url = "/heroes";

routeHandler.router.get(heroes_url, async (event, context) => {
  //
});
routeHandler.router.get(`${heroes_url}/:id`, async (event, context) => {
  //
});
routeHandler.router.post(heroes_url, async (event, context) => {
  //
});
routeHandler.router.put(heroes_url, async (event, context) => {
  //
});
routeHandler.router.delete(heroes_url, async (event, context) => {
  //
});

exports.handler = async (event, context) => {
  return routeHandler.handler(event, context);
};
// /heroes/:id
