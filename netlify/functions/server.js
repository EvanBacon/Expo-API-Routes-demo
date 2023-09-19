const { createRequestHandler } = require("./netlify-adapter");

const handler = createRequestHandler({
  build: require("path").join(__dirname, "../../dist"),
  mode: process.env.NODE_ENV,
});

module.exports = { handler };
