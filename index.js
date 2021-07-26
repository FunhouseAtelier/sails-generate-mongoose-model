/**
 * @module @sails-generate-mongoose-model
 * @desc Generates a Mongoose data model for use in Sails.js
 * @usage
 *  @bash `sails generate mongoose-model <new-model-name>`
 * @docs https://mongoosejs.com/docs/models.html
 */

/**
 * Module dependencies
 */
var path = require('path');

/**
 * Module exports
 */
module.exports = {

  /**
   * Absolute path to the templates for this generator
   * @type {String}
   */
  templatesDirectory: path.resolve(__dirname, './templates'),
  
  /**
   * Function to run before processing the `targets` defined below
   * @param  {Dictionary} scope
   * @param  {Function}   done
   */
  before: function (scope, done) {

    // Define the first argument provided via CLI
    const firstArg = scope.args[0];
    
    // Define an example of the CLI syntax, to be displayed if the generation fails
    const example = 
      `To create a new Mongoose model, use the following syntax:
      
      sails generate mongoose-model <NewModelName>`
    ;
    
    // If there is no first argument, finish with an error message
    if (typeof firstArg === 'undefined') {
      return done(new Error(
        `You did not provide a name for the model. ${example}`
      ));
    }
    
    // If the first argument is not a string, finish with an error message
    if(typeof firstArg !== 'string') {
      return done(new Error(
        `The name you provided for the model is not a string. ${example}`
      ));
    }

    // If the first argument contains a slash symbol, finish with an error message
    if(firstArg.includes('/')) {
      return done(new Error(
        `The model name cannot contain a slash ("/") and you cannot specify a subfolder in which to generate the model. ${example}`
      ));
    }
    
    // Attach all data needed to generate the file to the global "scope" variable
    scope.modelName       = firstArg.toLowerCase();
    scope.modelProperName = scope.modelName[0].toUpperCase() + scope.modelName.slice(1);
    scope.modelFileName   = `${scope.modelProperName}.js`;
    
    // Finished with no errors
    return done();
  },

  /**
   * The files/folders to generate
   * @type {Dictionary}
   */
  targets: {

    // Generate the JS file for the component
    './api/models/:modelFileName': {
      template: 'Model.js',
    },
  },

  /**
   * Function to run after processing the `targets` defined above
   * @param  {Dictionary} scope
   * @param  {Function}   done
   */
  after: function (scope, done) {

    // Log success message to console
    console.log(`A new Mongoose model named ${scope.modelProperName} was created.`);

    // Finished
    return done();
  },
};
