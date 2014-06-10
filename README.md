json-schema-assert
==================

[![Build Status](https://travis-ci.org/Magomogo/json-schema-assert.svg)](https://travis-ci.org/Magomogo/json-schema-assert)

json schema assert utility for mocha tests

## Usage

    jsonAssert = new JsonSchemaAssert('http://json-schema.org/geo');

    before(function (done) {
        jsonAssert.before(done);
    });

    it('does valid assertion', function (done) {
        jsonAssert.isValid({
            latitude: 54.8587913,
            longitude: 83.1052262
        }, 'http://json-schema.org/geo', done);
    });

