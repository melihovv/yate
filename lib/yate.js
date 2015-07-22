'use strict';

var parser = require('./parser.js');
var compile = require('./compiler.js');

/**
 * Render template.
 * @param {string} template
 * @param {object} [context]
 * @returns {string|undefined}
 */
var render = function (template, context) {
    if (typeof template !== 'string') {
        return;
    }

    var ast = [];
    try {
        ast = parser.parse(template);
    } catch (e) {
        console.error('%d.%d: %s', e.line, e.column, e.message);
        return;
    }

    var compiled = compile(ast, context);

    return compiled;
};

render.prototype = null;
render.constructor = null;

module.exports = render;
