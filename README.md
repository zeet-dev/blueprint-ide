# Blueprint IDE

This repo sets up a Blueprint IDE for you to use to forge your custom Blueprints. This can also be super helpful if you're looking to store your Blueprint definitions in a Git repo. [Watch a demo of how to use this repo](https://www.loom.com/share/f77529b8f0bd4aaf958ab8a7651cd4ab):

<a href="https://www.loom.com/share/f77529b8f0bd4aaf958ab8a7651cd4ab">
<img width="744" alt="Screenshot 2023-11-09 at 13 17 46" src="https://github.com/zeet-dev/blueprint-ide/assets/894178/fc4343a4-aab9-450f-b686-e87fddd9df19">
</a>

## Usage

If you're launching this repo in VS Code, it will automatically pull in the rich input schema validation from this [JSON schema definition](https://anchor.zeet.co/static/schemas/blueprint-rich-input-schema.schema.json). Highly recommended!

This environment requires Node.js 20 or higher. You can use ASDF to quickly install the proper Node.js version. After that's complete, run `npm install` to install the required dependencies.

You'll also want to copy the `.env.template` file to `.env` and add your `ZEET_API_KEY`. You can generate an API key here: https://zeet.co/account/api

## Developing a Blueprint

Blueprints in the `./blueprints` folder will get picked up by the `npm run apply` command (except for the `example.json` Blueprint). You can use the `example.json` file as a starting point for your own Blueprints.

To update your own Blueprints, add a new JSON file to the `./blueprints` folder, and name it in this format: `{BLUEPRINT_ID}.json`. For example, if your Blueprint ID is `c06f95b5-17ce-44a3-8893-4d5881fcc7ea`, then your file should be named `c06f95b5-17ce-44a3-8893-4d5881fcc7ea.json`. This will enable the `npm run apply` command to pick up your Blueprint and properly apply it to your Zeet account.

Advanced inputs can be defined for a Blueprint using its `richInputSchema`. You can check out the more JSON schema for all valid input types here: https://anchor.zeet.co/static/schemas/blueprint-rich-input-schema.schema.json

## Applying a Blueprint

Once you've updated a Blueprint to your liking, you can apply it to your Zeet account by running `npm run apply`. At this point you should be complete!
