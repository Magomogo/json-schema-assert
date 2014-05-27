(function () {
    'use strict';

    var request = require('request'),
        Validator = require('json-schema-validator'),
        assert = require('assert'),

        validator,
        loader = function (url, callback) {

            request({
                url: url,
                strictSSL: false,
                json: true
            }, function (error, response, body) {
                if (error) {
                    callback(error);
                    return;
                }

                if (200 !== response.statusCode) {
                    callback({url: url, code: response.statusCode});
                    return;
                }
                callback(null, body);
            });
        },
        JsonSchemaAssert = function (schemas) {
            this.schemas = schemas;
        };

    JsonSchemaAssert.prototype.before = function (done) {
        validator = new Validator(this.schemas);
        validator.fetchSchemas(loader, function (err) {
            if (err) {
                done(new Error(JSON.stringify(err)));
            } else {
                done();
            }
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