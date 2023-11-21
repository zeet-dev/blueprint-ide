# Blueprint IDE

This repo sets up a Blueprint IDE for you to use to forge your custom Blueprints. This can also be super helpful if you're looking to store your Blueprint definitions in a Git repo. [Watch a demo of how to use this repo](https://www.loom.com/share/f77529b8f0bd4aaf958ab8a7651cd4ab):

[<img width="744" alt="Screenshot 2023-11-09 at 13 17 46" src="https://github.com/zeet-dev/blueprint-ide/assets/894178/fc4343a4-aab9-450f-b686-e87fddd9df19">](https://www.loom.com/share/f77529b8f0bd4aaf958ab8a7651cd4ab)

## Usage

If you're launching this repo in VS Code, it will automatically pull in the rich input schema validation from this [JSON schema definition](https://anchor.zeet.co/static/schemas/blueprint-rich-input-schema.schema.json). Highly recommended!

This environment requires Node.js 20 or higher. You can use ASDF to quickly install the proper Node.js version. After that's complete, run `npm install` to install the required dependencies.

You'll also want to copy the `.env.template` file to `.env` and add your `ZEET_API_KEY`. You can generate an API key here: https://zeet.co/account/api

## Developing a Blueprint

Blueprints in the `./blueprints` folder will get picked up by the `npm run apply` command (except for the `example.json` Blueprint). You can use the `example.json` file as a starting point for your own Blueprints.

To update your own Blueprints, add a new JSON file to the `./blueprints` folder, and name it in this format: `{BLUEPRINT_ID}.json`. For example, if your Blueprint ID is `c06f95b5-17ce-44a3-8893-4d5881fcc7ea`, then your file should be named `c06f95b5-17ce-44a3-8893-4d5881fcc7ea.json`. This will enable the `npm run apply` command to pick up your Blueprint and properly apply it to your Zeet account.

### Input

Advanced inputs can be defined for a Blueprint using its `richInputSchema`. You can check out the more JSON schema for all valid input types here: https://anchor.zeet.co/static/schemas/blueprint-rich-input-schema.schema.json

<img width="1041" alt="Screenshot 2023-11-09 at 13 42 30" src="https://github.com/zeet-dev/blueprint-ide/assets/894178/373c0b4b-21ec-46e5-8e14-d333865cbfab">

### Ouput

It is also possible to define the set of information that will be exposed by a Project that was created based on the blueprint. For that goal, you can use the `outputSchema` property and define a list of `entries` that can accept the following formation:

| **Property** | **Description**                                                                                                                                | **Type** | **Required** |
|--------------|------------------------------------------------------------------------------------------------------------------------------------------------|----------|--------------|
| name         | The unique name identifier that can be used for the connector schema match                                                                     | STRING   | true         |
| type         | Type of information. Allowed values: `STRING` \| `INTEGER` \| `BOOLEAN` \| `FLOAT`                                                             | ENUM     | true         |
| dataPath     | Path of the information with dot notation. See below for more details.                                                                         | STRING   | true         |
| dataSource   | The type of data source where the information will be extracted. Allowed values: `INPUT` \| `DEPLOY` \| `RESOURCE`. See below for more details.| ENUM     | true         |
| displayName  | The name that will be possible visible when an UI is available for the outputs                                                                 | STRING   | true         |

#### dataPath

For `dataSource` `RESOURCE` type the path has the format of <kubernete_object_type>.<object_name>.<path.to.information>. For *kubernete_object_type* we can have the possible values:

- `config_maps`: Config Map kubernetes object type
- `deployments`: Deployment kubernetes object type
- `endpoints`: Endpoint kubernetes object type
- `nodes`: Node kubernetes object type
- `pods`: Pods kubernetes object type
- `secrets`: Secret kubernetes object type
- `services`: Services kubernetes object type

If, for instance, you want to make the `clusterIP` exposed, you could use `services.my-service.spec.clusterIP` as the `dataPath` value.

For all the other `dataSource` values (i.e. `INPUT` and `DEPLOY`) the `dataPath` value is the `<path.to.information>` directly, without any prefix.

> It is also important to note that the `<path.to.information>` can be a complex selector that follows [gjson](https://github.com/tidwall/gjson), allowing complex selecting of single array element and more!

#### dataSource

The following values are possible for the `dataSource`:

- `INPUT`: this type is useful to forward a input defined value to the output, like a DB password
- `DEPLOY`: the deploy type allows to surface a Terraform state output
- `RESOURCE`: this type surfaces the live K8S object. Check the previous `dataPath` for more details.

### Connector

The connector schema allows to define an organized grouping of the Blueprint Output. Currently, the connector allows only the type `OUTPUT`, which maps the values to the Blueprint exposed outputs.

The connector will be visualized available as the `Connnection Info` button that will open a modal with the connector information.

<img width="341" alt="image" src="https://github.com/zeet-dev/blueprint-ide/assets/3503650/587e4861-9914-42a4-9828-f34a633a74e7">

*Connection Info Modal*

<img width="530" alt="image" src="https://github.com/zeet-dev/blueprint-ide/assets/3503650/7e0a6a4c-c5dd-43a9-a1a7-53609dae18a4">

A list of `entries` that can accept the following formation:

| **Property**          | **Description**                                                                    | **Type** | **Required** |
|-----------------------|------------------------------------------------------------------------------------|----------|--------------|
| type                  | The type of the connector. Allowed values: `DATABASE_CONNECTION`                   | STRING   | true         |
| fields                | The list information that will be groups the connector type                        | ARRAY    | true         |
| fileds[].name         | The unique name identifier that matches the output entry value                     | STRING   | true         |
| fileds[].type         | Source of the connector information for the entry. Allowed values: `OUTPUT`        | ENUM     | true         |
| fileds[].displayName  | The name that will be displayed in the `Connnection Info` button field             | STRING   | true         |

## Applying a Blueprint

Once you've updated a Blueprint to your liking, you can apply it to your Zeet account by running `npm run apply`. At this point you should be complete!
