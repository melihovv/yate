'use strict';

var parser = require('./parser.js');

/**
 * Render template.
 * @param {string} template
 * @param {object} context
 * @returns {string}
 */
module.exports = function (template, context) {
    parser.context = context;
    return parser.parse(template).join('');
};
