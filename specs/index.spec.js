/*
 * phaz
 *
 * Copyright(c) 2014 André König <andre.koenig@posteo.de>
 * MIT Licensed
 *
 */

/**
 * @author André König <andre.koenig@posteo.de>
 *
 */

'use strict';

var fs   = require('fs'),
    path = require('path'),
    p    = require('../');

describe('The "phaz" stream', function () {

    var pkgjson = path.join(__dirname, '..', 'package.json'),
        brokenpkgjson = path.join(__dirname, 'broken-package.json');

    it('should be able to handle existing attributes', function (done) {
        var result = '';

        fs.createReadStream(pkgjson)
            .pipe(p.haz(['name', 'version']))
            .on('data', function (chunk) {
                result = result + chunk;
            })
            .on('end', function () {
                result = JSON.parse(result);
                
                expect(result.missing.length).toBe(0);

                done();
            });
    });

    it('should be able to detect a missing attribute', function (done) {
        var result = '';

        fs.createReadStream(pkgjson)
            .pipe(p.haz(['namee']))
            .on('data', function (chunk) {
                result = result + chunk;
            })
            .on('end', function () {
                result = JSON.parse(result);
                
                expect(result.missing.length).toBe(1);

                done();
            });
    });

    it('should be able to handle a broken package.json', function (done) {
        var result = '';

        fs.createReadStream(brokenpkgjson)
            .pipe(p.haz(['name']))
            .on('error', function (err) {
                expect(err.toString()).toBe('Error: Invalid package.json');

                done();
            });
    });
});