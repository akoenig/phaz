# phaz [![Build Status](https://travis-ci.org/akoenig/phaz.png?branch=master)](https://travis-ci.org/akoenig/phaz)

> Verifies that all your package.json files contain expected attributes.

I was in the need of a simple tool for checking if all my package.json files have a defined set of attributes. So the requirement was that the tool should be über-simple (without using json schema validators etc.). `phaz`, is the result :)

## Installation

Install with [npm](https://npmjs.org/package/phaz) globally.

    npm i -g phaz

## Usage examples

Let's say you want to check all your package.json files:

    cd projects
    phaz name version bugs

Output:

    deflector
    lingua (missing: bugs)
    express-slicer
    filepad (missing: bugs)
    fuchur (missing: bugs)
    gulp-imacss
    gulp-image2cssref
    gulp-npm
    gulp-picturizer
    gulp-svg2png
    imacss
    markdown2pdf (missing: bugs)
    ninit
    phaz (missing: bugs)
    ...


Will check all `package.json` files within all subdirectories of the current working directory.

You can check a single `package.json` file as well.

    phaz projects/myproject/package.json name author license

## API

If you want to use this thingy in one of your projects, install it as a dependency:

    npm i --save phaz

And use it like

```javascript
var fs = require('fs'),
    p  = require('phaz'),
    strom;

strom = fs.createReadStream('/path/to/a/package.json')
    .pipe(p.haz(['name', 'version', 'engine']))
    .pipe(process.stdout);

strom.on('error', function onError (err) {
    return console.error('Autsch! %s', err);
});
```

### p.haz([attributes])

#### attributes
Type: `Array`

Default: []

The attributes that should be checked.

## Changelog

### Version 0.1.0 (20140315)

- Initial version. Implemented stream and CLI.

# Author

2014, [André König](http://iam.andrekoenig.info) (andre.koenig@posteo.de)