const url = require("url");

function parseURL(event) {
  url.path;
}

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
      for (const url of Object.keys(routeMapping[event.httpMethod])) {
        // get all matches of pathParameters in the url designated by a colon then a word like character.
        const matches = url.match(/:\w+[^\\]/g);
        let replacedPath = url;
        // replace all 
        for (const match of matches) {
          const colonlessMatch = match.substring(1);
          replacedPath = replacedPath.replace(
            match,
            event.pathParameters[colonlessMatch]
          );
        }
        if (event.path === replacedPath) {
          return routeMapping[event.httpMethod][url](event, context);
        } else {
          // Raise 404 Error for unknown path
          statusCode = "404";
          body = "Path not found";
        }
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
