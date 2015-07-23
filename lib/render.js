'use strict';

/**
 * Yate render.
 * Traverses ast and renders template.
 */

/**
 * Render ast to result string.
 * @param {array} ast
 * @param {object} [context] Key/value store is used when substituting a
 *     variable value.
 * @returns {string} Compiled template.
 */
var render = function (ast, context) {
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
                if (typeof sandBox[i][id] !== 'undefined') {
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
                throw Error('Variable \'' + id + '\' is not primitive');
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
                throw Error(id + ' is not an array');
            }
        },

        // checks if object is an object.
        arrayOfObjects: function (object) {
            if (typeof object !== 'object' && !object) {
                throw Error(object + ' is not an object');
            }
        }
    };

    var result = '';

    // Scope stack.
    // It's a place where kept declared variables.
    // Also it performs the function of storage every scope.
    // A variable will be searching in such order - sandbox[0]...sandbox[N] ->
    // context, where N is number of scopes.
    var sandBox = [];
    sandBox.unshift({});

    ast.forEach(nodeHandler);

    return result;

    /**
     * Traverses ast and handles each node.
     *
     * If type of node is text, it simply adds text to result.
     *
     * If type of node is assignment it adds corresponding property in sandbox.
     *
     * If type of node is insertion then it adds corresponding value from
     * sandbox (if it was declared inside template) or context to result. If
     * there is no property or variable with such id it throws exception.
     *
     * If type of node is condition it continues traversing node's body
     * depending on was condition true or false.
     *
     * If type of node is each loop it adds corresponding object to new scope.
     * After body was traversed, created scope is deleted. Condition node also
     * create its own scope.
     *
     * @param {object} node
     */
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

    /**
     * Continues body traversing if condition is true, at the same time it
     * creates a new scope.
     * @param {string} id Id of conditional variable.
     * @param {array} body
     * @param {boolean} insertNewLineAfterBody Insert new line after body or
     *     not.
     */
    function conditionHandler(id, body, insertNewLineAfterBody) {
        checkErrorsIn.condition(id);

        if (helpers.getFromSandBoxById(id) || context[id]) {
            sandBox.unshift({});
            body.forEach(nodeHandler);
            sandBox.shift();
            result += insertNewLineAfterBody ? '\n' : '';
        }
    }

    /**
     * For each object in array it creates new scope and continues body
     * traversing, after each iteration scope is deleted.
     * @param {string} id Id of an array of objects.
     * @param {array} body
     * @param {boolean} insertNewLineAfterBody Insert new line after body or
     *     not. New line will be added if array of objects contains at least
     *     two objects.
     */
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

render.prototype = null;
render.constructor = null;

module.exports = render;
