/**
 * @module @sails-generate-mongoose-model
 * 
 * @description Generates a Mongoose data model for use in Sails.js
 * @type {Dictionary}
 * @usage
 *  @bash `sails generate mongoose-model <new-model-name>`
 * @docs https://mongoosejs.com/docs/models.html
 */

/**
 * Module dependencies
 */

var path = require('path');

module.exports = {

  /**
   * Absolute path to the templates for this generator.
   * 
   * @type {String}
   */

  templatesDirectory: path.resolve(__dirname, './templates'),
  
  /**
   * Function to run before processing the `targets` defined below.
   * 
   * @param  {Dictionary} scope
   * @param  {Dictionary} exits
   */
  before: function (scope, exits) {

    // Define the first argument provided via CLI.
    const firstArg = scope.args[0];
    
    // Define an example of the CLI syntax, to be displayed if the generation fails.
    const example = '\n\nTo create a new Mongoose model, use the following syntax:\n\nsails generate mongoose-model <NewModelName>';
    
    // If there is no first argument, exit with an error message.
    if (typeof firstArg === 'undefined') {
      return exits.error(`You did not provide a name for the model.${example}`);
    }
    
    // If the first argument is not a string, exit with an error message.
    if (typeof firstArg !== 'string') {
      return exits.error(`The name you provided for the model is not a string.${example}`);
    }

    // If the first argument contains a slash symbol, exit with an error message.
    if (firstArg.includes('/')) {
      return exits.error(`The model name cannot contain a slash ("/") and you cannot specify a subfolder in which to generate the model.${example}`);
    }
    
    // Attach all data needed to generate the file to the global "scope" variable.
    scope.modelName       = firstArg.toLowerCase();
    scope.modelProperName = scope.modelName[0].toUpperCase() + scope.modelName.slice(1);
    scope.modelFileName   = `${scope.modelProperName}.js`;
    
    // Finished with no errors
    return exits.success();
  },

  /**
   * The files/folders to generate
   * 
   * @type {Dictionary}
   */

  targets: {

    // Generate the JS file for the model.
    './api/models/:modelFileName': {
      template: 'Model.js',
    },
  },

  /**
   * Function to run after processing the `targets` defined above.
   * 
   * @param  {Dictionary} scope
   * @param  {Function}   done
   */

  after: function (scope, done) {

    // Log success message to console.
    console.log(`A new Mongoose model named ${scope.modelProperName} was created.`);

    // Finished
    return done();
  },
};
