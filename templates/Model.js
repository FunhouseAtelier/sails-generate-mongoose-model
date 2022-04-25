/**
 * @name <%= modelProperName %>
 * 
 * @description Mongoose data model for use in Sails.js
 * @type {Dictionary}
 * @source `api/models/<%= modelProperName %>.js`
 * @docs https://mongoosejs.com/docs/models.html
 * @usage 
 *  @global `<%= modelProperName %>`
 *  @global `sails.models.<%= modelName %>`
 */

/**
 * Module definitions
 * 
 * @const {Object} OID - a convenient reference to the Mongoose ObjectId data type
 */

const OID = sails.mongoose.Schema.Types.ObjectId;

/**
 * Module exports
 * 
 * @return {Dictionary}
 */

module.exports = {

  /**
   * Schema definition
   * 
   * @type {Dictionary}
   * @docs https://mongoosejs.com/docs/guide.html#definition
   */

  schema: {
    //…
  },

  /**
   * constructSchema()
   *
   * Note that this function must be synchronous!
   *
   * @param  {Dictionary} schemaDefinedAbove
   * the raw schema defined above, or `{}` if no schema was provided
   * @param  {SailsApp}   sails
   * just in case you have globals disabled, this way you always have access to "sails"
   * @return {MongooseSchema}
   */

  constructSchema: function (schemaDefinedAbove, sails) {

    /**
     * schema options
     * 
     * @type {Dictionary}
     * @docs https://mongoosejs.com/docs/guide.html#options
     * @property {String}             collection
     *  Determines the name to be used for the collection in the database. The generator
     *  sets this to the singular name of the model, to avoid the ambiguity of automatic
     *  pluralization by Mongoose, and to match the behavior of Waterline.
     * @property {Boolean|Dictionary} timestamps
     *  Detemines how Mongoose handles automatic generation and storage of timestamps
     *  for when a document was created or last updated. The generator sets this to 
     *  "true" so automatic timestamps will be enabled.
     * @property {Boolean}            autoIndex
     *  Determines whether Mongoose rebuilds the database indexes when it initially
     *  connects to the database. Rebuilding the indexes is suitable for development, but
     *  not for production, so the generator sets this to check which environment Sails
     *  is running in and enable or disable auto-indexing accordingly.
     */

    let schemaOptions = {
      collection: '<%= modelName %>',
      timestamps: true,
      autoIndex: sails.config.environment === 'development' ? true : false,
    }

    /*  The schema defintion and options are passed to the schema constructor. */
    let newSchema = new sails.mongoose.Schema(schemaDefinedAbove, schemaOptions);

    /**
     * Schema virtual fields are not stored in the database, they are used as Mongoose
     * document properties that act as getters, setters, or references to other data
     * models that may be populated when Mongoose performs a database query.
     * 
     * @docs https://mongoosejs.com/docs/guide.html#virtuals
     */

    /* These virtual getter examples can be used to convert the datetime objects automatically stored in the "createdAt" and "updatedAt" properties into a numerical format, representing the number of milliseconds elapsed since the Unix epoch. */

    // newSchema.virtual('createdAtValue').get(function() {
    //   return this.createdAt?.valueOf();
    // });
    // newSchema.virtual('updatedAtValue').get(function() {
    //   return this.updatedAt?.valueOf();
    // });

    /**
     * document instance methods
     * 
     * @docs https://mongoosejs.com/docs/guide.html#methods
     */

    /* This document instance method example will add a "meow" method to each Mongoose document based on this data model, which will output text to the console. */

    // newSchema.method('meow', function () {
    //   console.log('meeeeeoooooooooooow');
    // });

    /**
     * model static methods
     * 
     * @docs https://mongoosejs.com/docs/guide.html#statics
     */

    /* This model static method example will add a "findByName" method to the global data model that will find all documents with a matching "name". */

    // newSchema.static('findByName', function (name) {
    //   return this.find({ name: name });
    // });

    /**
     * schema plugins
     * 
     * @docs https://mongoosejs.com/docs/plugins.html
     */

    /* This schema plugin example with allow virtuals to be included in the plain Javascript objects returned when the "lean" option is used to query the database. Note that plugins must first be installed, such as with NPM, before they can be enabled in any schema. */
    
    // newSchema.plugin(require('mongoose-lean-virtuals'));

    /* Finally, the instantiated Schema instance is returned. */
    return newSchema;
  },
};
