(function () {
    'use strict';

    var assert = require('assert'),
        Validator = require('json-schema-validator'),

        JsonSchemaAssert = function (schemas) {
            this.schemas = schemas;
        },

        validator;

    JsonSchemaAssert.prototype.before = function (done) {
        Validator.simple(this.schemas, function (error, v) {
            validator = v;
            done(error);
        });
    };

    JsonSchemaAssert.prototype.isValid = function (json, typeId, done) {
        var result = validator.validate(json, typeId);

        if (!result.valid) {
            done(new Error([
                'Validation error:',
                result.error.message,
                'at',
                '"' + result.error.dataPath + '"',
                'defined at',
                '"' + result.error.schemaPath + '"',
                'in:\n',
                JSON.stringify(json, undefined, 2)
            ].join(' ')));
            return;
        }

        assert(result.valid);
        done();
    };

    module.exports = JsonSchemaAssert;
}());
