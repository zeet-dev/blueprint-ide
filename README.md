# Rich Input Schema Example

This repo contains an example of a rich input schema for a custom blueprint. A rich input schema allows you to define a custom input form for your blueprint, which is useful when you want to provide a custom user experience or guide rails for your blueprint.

## Usage

If you're launching this repo in VS Code, it will automatically pull in the rich input schema validation from this [JSON schema definition](https://anchor.zeet.co/static/schemas/blueprint-rich-input-schema.schema.json).

## Example

To update your blueprint with a rich input schema, you'll want to create a new blueprint JSON, and then run a GraphQL mutation to update the blueprint with the new schema.

Running this operation:

```graphql
mutation updateBlueprint($id: UUID!, $input: UpdateBlueprintInput!) {
  updateBlueprint(blueprintID: $id, input: $input) {
    id
  }
}
```

With these variables (make sure to stringify the JSON object for the `richInputSchema` field):

```json
{
  "id": "YOUR_BLUEPRINT_ID",
  "input": {
    "richInputSchema": "[{\"id\":\"db_version\",\"name\":\"Version\",\"required\":true,\"description\":\"The database engine version\",\"options\":[\"Option #1\",\"Option #2\",\"Option #3\"],\"type\":\"STRING\"}]"
  }
}
```

If all goes well, you will see your changes to your blueprint with the new rich input schema!
