'use strict';

/**
 * Yate compiler.
 * Traverses ast and compiles template.
 */

/**
 * Compile ast to result string.
 * @param {array} ast
 * @param {object} context
 * @returns {string}
 */
var compile = function (ast, context) {
    context || (context = {});

    var helpers = {
        // Get value by id from sandbox or context.
        getById: function (id) {
            return this.getFromSandBoxById(id) || context[id];
        },

        // Get value by id from sandbox.
        getFromSandBoxById: function (id) {
            var length = sandBox.length;
            for (var i = 0; i < length; ++i) {
                if (sandBox[i][id]) {
                    return sandBox[i][id];
                }
            }
        },

        // Checks if value is not primitive.
        isNotPrimitive: function (value) {
            return Array.isArray(value) || typeof value === 'object';
        },

        // Checks if value is undefined.
        isUndefined: function (value) {
            return typeof value === 'undefined';
        },

        // Checks if value is not in sandbox and context.
        isNotExistingVariable: function (id) {
            if (helpers.isUndefined(helpers.getFromSandBoxById(id)) &&
                helpers.isUndefined(context[id])) {
                throw Error('Variable \'' + id + '\' is undefined');
            }
        }
    };

    // Check errors in...
    var checkErrorsIn = {
        // insertion {{property}}.
        insertion: function (id) {
            helpers.isNotExistingVariable(id);

            if (helpers.isNotPrimitive(context[id])) {
                throw Error('Variable \'' + context[id] + '\' is not primitive');
            }
        },

        // condition {{#if condition}}{{/if}}.
        condition: function (id) {
            helpers.isNotExistingVariable(id);
        },

        // each loop {{#each people}}{{/each}}.
        each: function (id) {
            if (helpers.isUndefined(context[id])) {
                throw Error('Variable \'' + id + '\' is undefined');
            }

            var objects = context[id];
            if (!Array.isArray(objects)) {
                throw Error(objects + ' is not an array');
            }
        },

        // checks if object is an object.
        arrayOfObjects: function (object) {
            if (typeof object !== 'object') {
                throw Error(object + ' is not an object');
            }
        }
    };

    var result = '';

    // Scope stack.
    var sandBox = [];
    sandBox.unshift({});

    ast.forEach(nodeHandler);

    return result;

    function nodeHandler(node) {
        var id = node.id;

        switch (node.type) {
            case 'text':
                result += node.text;
                break;
            case 'assignment':
                sandBox[0][id] = node.value;
                break;
            case 'insertion':
                checkErrorsIn.insertion(id);
                result += helpers.getById(id);
                break;
            case 'condition':
                conditionHandler(id, node.body);
                break;
            case 'condition_line':
                conditionHandler(id, node.body, true);
                break;
            case 'each':
                eachHandler(id, node.body);
                break;
            case 'each_line':
                eachHandler(id, node.body, true);
                break;
        }
    }

    // Condition node handler.
    function conditionHandler(id, body, insertNewLineAfterBody) {
        checkErrorsIn.condition(id);

        if (helpers.getFromSandBoxById(id) || context[id]) {
            sandBox.unshift({});
            body.forEach(nodeHandler);
            sandBox.shift();
            result += insertNewLineAfterBody ? '\n' : '';
        }
    }

    // Each loop node handler.
    function eachHandler(id, body, insertNewLineAfterBody) {
        checkErrorsIn.each(id);

        var objects = context[id];
        var length = objects.length;

        objects.forEach(function (object, index) {
            checkErrorsIn.arrayOfObjects(object);

            sandBox.unshift(object);
            body.forEach(nodeHandler);
            sandBox.shift();

            if (insertNewLineAfterBody && index + 1 !== length) {
                result += '\n';
            }
        });
    }
};

compile.prototype = null;
compile.constructor = null;

module.exports = compile;
