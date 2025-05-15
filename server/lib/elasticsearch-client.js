const { Client } = require("@elastic/elasticsearch");

const client = new Client({
  node: "http://localhost:9200",
});

async function createPipeline() {
  await client.ingest.putPipeline({
    id: "quake-normalizer",
    body: {
      description: "Clean and normalize earthquake data",
      processors: [
        {
          remove: {
            field: [
              "updated",
              "tz",
              "detail",
              "felt",
              "cdi",
              "mmi",
              "alert",
              "status",
              "tsunami",
              "net",
              "code",
              "ids",
              "sources",
              "types",
              "nst",
              "dmin",
              "rms",
              "magType",
              "title",
            ],
            ignore_missing: true,
          },
        },
        {
          date: {
            field: "time",
            formats: ["UNIX_MS"],
            target_field: "@timestamp",
            ignore_failure: true,
          },
        },
        {
          remove: {
            field: "time",
            ignore_missing: true,
          },
        },
        {
          rename: {
            field: "latitude",
            target_field: "coordinates.lat",
            ignore_missing: true,
          },
        },
        {
          rename: {
            field: "longitude",
            target_field: "coordinates.lon",
            ignore_missing: true,
          },
        },
      ],
    },
  });

  console.log("✅ Ingest pipeline 'quake-normalizer' created");
}

async function createEarthquakesIndex() {
  const indexName = "earthquakes";
  const exists = await client.indices.exists({ index: indexName });

  if (!exists) {
    await client.indices.create({
      index: indexName,
      body: {
        mappings: {
          properties: {
            "@timestamp": { type: "date" },
            coordinates: { type: "geo_point" },
            depth: { type: "float" },
            mag: { type: "float" },
            place: {
              type: "text",
              fields: {
                keyword: { type: "keyword" },
              },
            },
            sig: { type: "short" },
            type: { type: "keyword" },
            url: { enabled: false },
          },
        },
      },
    });

    console.log("✅ Index 'earthquakes' created with mapping");
  } else {
    console.log("🟢 Index 'earthquakes' already exists");
  }
}

async function setup() {
  await createPipeline();
  await createEarthquakesIndex();
}

setup().catch(console.error);

client
  .info()
  .then(() => console.log("🟢 Elasticsearch is running"))
  .catch((err) => console.error("🔴 Could not connect to ES:", err));

module.exports = client;
