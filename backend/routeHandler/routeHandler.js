const url = require("url");

function parseURL(event) {
  url.path;
}

routeMapping["GET"].url;
const router = {
  get: (url, handler) => {
    routeMapping.GET[url] = handler;
  },
  post: (event, handler) => {
    routeMapping.POST[url] = handler;
  },
  put: (event, handler) => {
    routeMapping.PUT[url] = handler;
  },
  delete: (event, handler) => {
    routeMapping.DELETE[url] = handler;
  },
};
const routeMapping = {
  GET: {},
  POST: {},
  PUT: {},
  DELETE: {},
};

async function handleGet(event) {
  parseURL(event.res);
}

async function routeHandler(event, context) {
  let body;
  let statusCode = "200";
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };

  try {
    if (
      routeMapping[event.httpMethod] &&
      routeMapping[event.httpMethod][event.path]
    ) {
      return routeMapping[event.httpMethod][event.path](event, context);
    } else if (routeMapping[event.httpMethod]) {
      for (const key in Object.keys(routeMapping[event.httpMethod])) {
        // if It matches the :id regex
      }
    } else {
      // Raise error for unsupported HTTP verb
    }
  } catch (err) {
    statusCode = "400";
    body = err.message;
  } finally {
    body = JSON.stringify(body);
  }

  return {
    statusCode,
    body,
    headers,
  };
}

// body = await dynamo.scan({ TableName: "Heroes" }).promise();

module.exports = { router, handler: routeHandler };
