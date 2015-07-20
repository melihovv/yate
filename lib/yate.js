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
    if (typeof template === 'undefined') {
        return;
    }

    var ast = parser.parse(template);
    var compiled = compile(ast, context);

    return compiled;
};

render.prototype = null;
render.constructor = null;

module.exports = render;
