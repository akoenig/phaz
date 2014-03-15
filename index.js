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

var util    = require('util'),
    through = require('through');

/**
 * Stream that checks if the given attributes
 * are in the respective package.json.
 *
 * @param  {array} attrs An array with all the names of the properties that should be available.
 *
 * @return {Stream} The stream object (will contain a JSON string with the package stats).
 *
 */
exports.haz = function haz (attrs) {

    var len;

    if (!util.isArray(attrs)) {
        attrs = [attrs];
    }

    len = attrs.length;

    function check (pkg) {
        /*jshint validthis:true */

        var i = 0,
            result = {};

        try {
            pkg = JSON.parse(pkg);
        } catch (e) {
            return this.emit('error', new Error('Invalid package.json'));
        }

        if (!pkg.name) {
            return this.emit('error', new Error('Invalid package.json. No name attribute defined!!1'));
        }

        result.name = pkg.name;
        result.missing = [];

        for (i; i < len; i = i + 1) {
            if (!pkg[attrs[i]]) {
                result.missing.unshift(attrs[i]);
            }
        }

        this.queue(JSON.stringify(result));
    }

    return through(check);
};