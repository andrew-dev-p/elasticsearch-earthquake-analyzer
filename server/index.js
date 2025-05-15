const express = require("express");
const app = express();

app.use(express.json());

const client = require("./lib/elasticsearch-client");

const data = require("./data-management/retrieve-and-ingest-data");

app.use("/ingest-data", data);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
