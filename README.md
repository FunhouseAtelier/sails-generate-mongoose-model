# sails-generate-mongoose-model

A Mongoose data model generator for use with the Sails command-line interface.

## Installation

```sh
$ npm install sails-generate-mongoose-model
```

Then merge the following into your `.sailsrc` file:

```json
{
  "modules": {
    "mongoose-model": "sails-generate-mongoose-model"
  }
}
```

> Note that instead of `"sails-generate-mongoose-model"`, you can also choose to provide the path to the generator locally (e.g. "./generators/mongoose-model").
> This is useful if, for example, you have specific best practices for particular projects or teams within your organization, and you want to be able to check in generators to your code repository.
>
> Certain generators are installed by default in Sails, but they can be overridden.  Other generators add support for generating entirely new kinds of things.
> Check out [Concepts > Extending Sails > Generators](https://sailsjs.com/docs/concepts/extending-sails/generators) for information on installing generator overrides / custom generators and information on building your own generators.

## Usage

```bash
$ sails generate mongoose-model <NewModelName>
```

## Related projects

To use Mongoose in Sails.js you will need to override the default ORM hook for Waterline. See the [sails-hook-orm-mongoose](https://github.com/FunhouseAtelier/sails-hook-orm-mongoose) repository for code and instructions that will help you do it.

## Need help?

See [Extending Sails > Generators > Custom Generators](https://sailsjs.com/docs/concepts/extending-sails/generators/custom-generators) in the [Sails documentation](https://sailsjs.com/documentation), or check out [recommended support options](https://sailsjs.com/support).

[Sails.js](https://sailsjs.com)

## Contributing

Please observe the guidelines and conventions laid out in the [Sails project contribution guide](https://sailsjs.com/documentation/contributing) when opening issues or submitting pull requests.

## License

This Mongoose data model generator is available under the **MIT license**.

The [Sails framework](https://sailsjs.com) is free and open-source under the [MIT License](https://sailsjs.com/license).

![image_squidhome@2x.png](http://i.imgur.com/RIvu9.png)
