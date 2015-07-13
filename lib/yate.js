'use strict';

var parser = require('./parser.js');

/**
 * Render template.
 * @param {string} template
 * @param {object} context
 * @returns {string|undefined}
 */
var render = function (template, context) {
    if (typeof template === 'undefined') {
        return;
    }
    parser.context = context;
    return parser.parse(template).join('');
};

render.prototype = null;
render.constructor = null;

module.exports = render;
