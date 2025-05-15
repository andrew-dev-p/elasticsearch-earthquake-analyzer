const { Client } = require("@elastic/elasticsearch");

const client = new Client({
  node: "http://localhost:9200",
});

client
  .info()
  .then(() => console.log("🟢 Elasticsearch is running"))
  .catch((err) => console.error("🔴 Could not connect to ES:", err));

module.exports = client;
