require("dotenv").config();
const fs = require("fs");
const path = require("path");
const { request, gql } = require("graphql-request");

const blueprintDir = "./blueprints";
const blueprintFiles = fs
  .readdirSync(blueprintDir)
  .filter((file) => file.endsWith(".json"));

blueprintFiles.forEach(async (file) => {
  if (file.includes("example")) return;

  const blueprint = JSON.parse(
    fs.readFileSync(path.join(blueprintDir, file), "utf8")
  );
  const blueprintId = file.split(".")[0];
  console.info(`Updating blueprint ID ${blueprintId}...`);

  const document = gql`
    mutation updateBlueprint($id: UUID!, $input: UpdateBlueprintInput!) {
      updateBlueprint(blueprintID: $id, input: $input) {
        id
      }
    }
  `;

  const variables = {
    id: blueprintId,
    input: {
      displayName: blueprint.displayName,
      richInputSchema: JSON.stringify(blueprint.richInputSchema),
    },
  };

  const endpoint = "https://anchor.zeet.co/graphql";

  try {
    await request(endpoint, document, variables, {
      authorization: `Bearer ${process.env.ZEET_API_KEY}`,
    });
    console.info(
      `\tUpdated complete: https://zeet.co/console/blueprints/${blueprintId}`
    );
  } catch (error) {
    console.error("\tUpdate failed!", error);
  }
});
