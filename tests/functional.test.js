(function () {
    'use strict';

    var assert = require('assert'),
        JsonSchemaAssert = require('../index.js'),
        jsonAssert = new JsonSchemaAssert('http://json-schema.org/geo');

    describe('json-schema-assert', function () {

        before(function (done) {
            jsonAssert.before(done);
        });

        it('does valid assertion', function (done) {
            jsonAssert.isValid({
                latitude: 54.8587913,
                longitude: 83.1052262
            }, 'http://json-schema.org/geo', done);
        });

        it('reports invalid assertion', function (done) {
            jsonAssert.isValid({
                latitude: '54.8587913',
                longitude: '83.1052262'
            }, 'http://json-schema.org/geo', function (err) {

                assert(err instanceof Error);
                done();
            });
        });
    });

}());