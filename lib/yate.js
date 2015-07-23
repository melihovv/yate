'use strict';

var parser = require('./parser.js');
var render = require('./render.js');

/**
 * Compile template.
 * @param {string} template Yate template.
 * @returns {@function render} Render template function.
 */
var compile = function (template) {
    if (typeof template !== 'string') {
        throw Error('You must pass a string, but you passed: ' + template);
    }

    var ast = [];
    try {
        ast = parser.parse(template);
    } catch (e) {
        throw Error(e.line + '.' + e.column + ': ' + e.message);
    }

    /**
     * Render template.
     * @function
     * @name render
     * @param {object} [context]
     * @returns {string}
     */
    return function (context) {
        return render(ast, context);
    };
};

compile.prototype = null;
compile.constructor = null;

module.exports = compile;
