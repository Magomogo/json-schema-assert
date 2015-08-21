json-schema-assert
==================

[![Build Status](https://travis-ci.org/Magomogo/json-schema-assert.svg)](https://travis-ci.org/Magomogo/json-schema-assert)

JSON Schema assert utility. Uses the [tv4](https://www.npmjs.org/package/tv4) JSON Schema validator,
and the formats provided by the [tv4-formats](https://github.com/ikr/tv4-formats/). It loads all the
referenced JSON schemas over the internet to bootstrap tv4.

## Usage with Mocha

    describe('a specific geolocation', function () {
        var jsonAssert = new JsonSchemaAssert('http://json-schema.org/geo');
    
        before(function (done) {
            jsonAssert.before(done);
        });
    
        it('conforms the schema', function (done) {
            jsonAssert.isValid(
                {latitude: 54.8587913, longitude: 83.1052262},
                'http://json-schema.org/geo',
                done
            );
        });
    });

## Usage with Jasmin

    describe('a specific geolocation', function () {
        var jsonAssert = new JsonSchemaAssert('http://json-schema.org/geo');
    
        beforeAll(function (done) {
            jsonAssert.before(done);
        });
    
        it('conforms the schema', function (done) {
            jsonAssert.isValid(
                {latitude: 54.8587913, longitude: 83.1052262},
                'http://json-schema.org/geo',
                
                function (error) {
                    expect(error).toBe(undefined);
                    done();
                }
            );
        });
    });
