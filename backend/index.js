const router = require("./routeHandler");

exports.handler = async (event, context) => {
  return await router.handler(event, context);
};
