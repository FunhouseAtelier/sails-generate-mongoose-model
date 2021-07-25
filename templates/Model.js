/**
 * @name <%= modelProperName %>
 * @desc A Mongoose data model for use in Sails.js
 * @type {Dictionary}
 * @source `api/models/<%= modelProperName %>.js`
 * @docs https://mongoosejs.com/docs/models.html
 * @usage 
 *  @global `<%= modelProperName %>`
 *  @global `sails.models.<%= modelName %>`
 */

/**
 * module definitions
 * @const {object} OID - a convenient reference to the Mongoose ObjectId data type
 */
const OID = sails.mongoose.Schema.Types.ObjectId;

module.exports = {

  /**
   * schema definition
   * @type {Dictionary}
   * @docs https://mongoosejs.com/docs/guide.html#definition
   */
  schema: {

  },

  /**
   * constructSchema()
   *
   * Note that this function must be synchronous!
   *
   * @param  {Dictionary} schemaDefinedAbove  [the raw schema defined above, or `{}` if no schema was provided]
   * @param  {SailsApp} sails                 [just in case you have globals disabled, this way you always have access to `sails`]
   * @return {MongooseSchema}
   */
  constructSchema: function (schemaDefinedAbove, sails) {

    /**
     * schema options
     * @type {Dictionary}
     * @docs https://mongoosejs.com/docs/guide.html#options
     * @property {string} collection
     *  Determines the name to be used for the collection in the database. The generator
     *  sets this to the singular name of the model to avoid the ambiguity of automatic
     *  pluralization by Mongoose, and to match the behavior of Waterline.
     * @property {boolean|Dictionary} timestamps
     *  Detemines how Mongoose handles automatic generation and storage of timestamps
     *  for when a document was created or last updated The generator sets this to change
     *  the default field names to "created_at" and "updated_at", so that javascript Date
     *  objects, which are more human-readable than Unix epoch timestamps, are stored in
     *  the database, while the virtual getters below, "createdAt" and "updatedAt", can
     *  be used to convert them to numeric format, for ease of use in Javascript code.
     * @property {boolean} autoIndex -
     *  Determines whether Mongoose rebuilds the database indexes when it initially
     *  connects to the database. Rebuilding the indexes is suitable for development, but
     *  not for production, so the generator sets this to check which environment Sails
     *  is running in and enable or disable auto-indexing accordingly.
     */
    let schemaOptions = {
      collection: '<%= modelName %>',
      timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
      },
      autoIndex: sails.config.environment === 'development' ? true : false,
    }

    //  The schema defintion and options are passed to the schema constructor.
    let newSchema = new sails.mongoose.Schema(schemaDefinedAbove, schemaOptions);

    /**
     * Schema virtual fields are not stored in the database, they are used as Mongoose
     * document properties that act as getters, setters, or references to other data
     * models that may be populated when Mongoose performs a database query.
     * @docs https://mongoosejs.com/docs/guide.html#virtuals
     */
    newSchema.virtual('createdAt').get(function() {
      return this.created_at.valueOf();
    });

    newSchema.virtual('updatedAt').get(function() {
      return this.updated_at.valueOf();
    });

    /**
     * Document instance methods can be defined below. 
     * @docs https://mongoosejs.com/docs/guide.html#methods
     */
    // // Example:
    // newSchema.method('meow', function () {
    //   console.log('meeeeeoooooooooooow');
    // });

    /**
     * Model static methods can be defined below.
     * @docs https://mongoosejs.com/docs/guide.html#statics
     */
    // // Example:
    // newSchema.static('findByName', function (name, callback) {
    //   return this.find({ name: name }, callback);
    // });

    /**
     * Schema plugins can be defined below.
     * @docs https://mongoosejs.com/docs/plugins.html
     */
    // // Example: (must first be installed via NPM)
    // newSchema.plugin(require('mongoose-lean-virtuals'));

    // Finally, the instantiated Schema instance is returned.
    return newSchema;
  },
};
