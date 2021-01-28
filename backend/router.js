const router = require("aws-lambda-router");
const AWS = require("aws-sdk");
AWS.config.update({ region: "us-west-2" });

const dynamo = new AWS.DynamoDB.DocumentClient();

const baseRoute = "/heroes";
const routeWithId = `${baseRoute}/:id`;
const handler = router.handler({
  proxyIntegration: {
    routes: [
      {
        path: baseRoute,
        method: "GET",
        action: async (request, context) => {
          await dynamo.scan({ TableName: "Heroes" }).promise();
        },
      },
      {
        path: routeWithId,
        method: "GET",
        action: async (request, context) => {
          return "You called me with: " + request.paths.id;
        },
      },
      {
        path: routeWithId,
        method: "DELETE",
        action: async (request, context) => {
          return "You called me with: " + request.paths.id;
        },
      },
      {
        path: baseRoute,
        method: "POST",
        action: async (request, context) => {
          return "You called me with: " + request.paths.id;
        },
      },
      {
        path: baseRoute,
        method: "PUT",
        action: async (request, context) => {
          return "You called me with: " + request.paths.id;
        },
      },
    ],
  },
});

module.exports = router;
