{
    var _this = this;
    _this.context || (_this.context = {});
    var local = {};

    function isNotPrimitive(value) {
        return Array.isArray(value) || typeof value === 'object';
    }

    function isUndefined(value) {
        return typeof value === 'undefined';
    }
}

start
    = unit*

unit
    = insert:insert                 {return insert;}
    / assignment
    / condition:condition           {return condition;}
    / conditionLine:conditionLine   {return conditionLine;}
    / content:eachLoop              {return content;}
    / eachLoop:eachLoopLine         {return eachLoop;}
    / text:text                     {return text;}


insert 'insert'
    = openSymbols id:$ID closeSymbols {
        if (isUndefined(local[id]) && isUndefined(_this.context[id])) {
            throw Error('Variable \'' + id + '\' is undefined');
        }

        if (isNotPrimitive(_this.context[id])) {
            throw Error('Variable \'' + _this.context[id] + '\' is not primitive');
        }

        return local[id] || _this.context[id];
    }

assignment 'assignment'
    = assignmentOpenSymbols id:$ID WS '=' WS number:$NUMBER closeSymbols {
        local[id] = number;
    }

condition
    = id:ifStartBlock unit:unit* ifEndBlock {
        if (isUndefined(local[id]) && isUndefined(_this.context[id])) {
            throw Error('Variable \'' + id + '\' is undefined');
        }

        if (local[id] || _this.context[id]) {
            return Array.prototype.join.call(unit, '');
        }
    }

conditionLine
    = id:ifLineStartBlock unit:unit* ifLineEndBlock {
        if (isUndefined(local[id]) && isUndefined(_this.context[id])) {
            throw Error('Variable \'' + id + '\' is undefined');
        }

        if (local[id] || _this.context[id]) {
            return Array.prototype.join.call(unit, '') + '\n';
        }
    }

eachLoop
    = id:eachStartBlock body:eachLoopBody* eachEndBlock {
        if (isUndefined(_this.context[id])) {
            throw Error('Variable \'' + id + '\' is undefined');
        }

        var objects = _this.context[id];
        if (!Array.isArray(objects)) {
            throw Error(objects + ' is not an array');
        }

        var result = '';

        objects.forEach(function (object) {
            if (typeof object !== 'object') {
                throw Error(object + ' is not an object');
            }

            body.forEach(function (key) {
                if (Array.isArray(key)) {
                    if (isUndefined(object[key[0]])) {
                        throw Error('Variable \'' + key[0] + '\' is undefined');
                    }

                    if (isNotPrimitive(object[key[0]])) {
                        throw Error('Variable \'' + object[key[0]] + '\' is not primitive');
                    }

                    result += object[key[0]];
                } else if (key) {
                    result += key;
                }
            });
        });

        return result;
    }


eachLoopLine
    = id:eachLineStartBlock body:eachLoopBody* eachLineEndBlock {
        if (isUndefined(_this.context[id])) {
            throw Error('Variable \'' + id + '\' is undefined');
        }

        var objects = _this.context[id];
        if (!Array.isArray(objects)) {
            throw Error(objects + ' is not an array');
        }

        var result = '';
        var objectsLength = objects.length;

        objects.forEach(function (object, index) {
            if (typeof object !== 'object') {
                throw Error(object + ' is not an object');
            }

            body.forEach(function (key) {
                if (Array.isArray(key)) {
                    if (isUndefined(object[key[0]])) {
                        throw Error('Variable \'' + key[0] + '\' is undefined');
                    }

                    if (isNotPrimitive(object[key[0]])) {
                        throw Error('Variable \'' + object[key[0]] + '\' is not primitive');
                    }

                    result += object[key[0]];
                } else if (key) {
                    result += key;
                }

                if (index + 1 !== objectsLength) {
                    result += '\n';
                }
            });
        });

        return result;
    }

eachLoopInsert
    = insertEachLoopOpenSymbols id:ID closeSymbols {
        return [id, 'eachLoop'];
    }

eachLoopBody
    = id:eachLoopInsert                {return id;}
    / unit:unit                        {return unit;}


ifStartBlock 'ifStartBlock'
    = ifStartBlockOpenSymbols id:$ID closeSymbols {
        return id;
    }

ifEndBlock 'ifEndBlockSymbols'
    = OPEN_SYMBOLS_NO_WS '/if' closeSymbols

ifStartBlockOpenSymbols 'ifOpenSymbols'
    = OPEN_SYMBOLS_NO_WS '#if' WS_MANDATORY


ifLineStartBlock
    = ifLineStartBlockOpenSymbols id:$ID closeSymbols {
        return id;
    }

ifLineEndBlock 'ifLineEndBlock'
    = OPEN_SYMBOLS_NO_WS '/if_line' closeSymbols

ifLineStartBlockOpenSymbols 'ifLineStartBlockOpenSymbols'
    = OPEN_SYMBOLS_NO_WS '#if_line' WS_MANDATORY


eachStartBlock 'eachStartBlock'
    = eachStartBlockOpenSymbols id:$ID closeSymbols {
        return id;
    }

eachStartBlockOpenSymbols 'eachStartBlockOpenSymbols'
    = OPEN_SYMBOLS_NO_WS '#each' WS_MANDATORY

eachEndBlock 'eachEndBlock'
    = OPEN_SYMBOLS_NO_WS '/each' closeSymbols


eachLineStartBlock 'eachLineStartBlock'
    = eachLineStartBlockOpenSymbols id:$ID closeSymbols {
        return id;
    }

eachLineStartBlockOpenSymbols 'eachLineStartBlockOpenSymbols'
    = OPEN_SYMBOLS_NO_WS '#each_line' WS_MANDATORY

eachLineEndBlock 'eachLineEndBlock'
    = OPEN_SYMBOLS_NO_WS '/each_line' closeSymbols


insertEachLoopOpenSymbols 'insertEachLoopOpenSymbols'
    = OPEN_SYMBOLS_NO_WS '+' WS

assignmentOpenSymbols 'assigmentOpenSymbols'
    = OPEN_SYMBOLS_NO_WS '@' WS

openSymbols 'openSymbols'
    = '{{' WS

OPEN_SYMBOLS_NO_WS 'OPEN_SYMBOLS_NO_WS'
    = '{{'

closeSymbols 'closeSymbols'
    = WS '}}'


ID 'id'
    = id:$([A-z$_][A-z0-9$_]*) {return id;}

NUMBER 'number'
    = number:$('0' / [1-9]([0-9]*)) {return Number(number);}

text 'text'
    = text:$(char)+ {return text}

char 'char'
    = !openSymbols !assignmentOpenSymbols !ifStartBlockOpenSymbols !eachStartBlockOpenSymbols !ifLineStartBlockOpenSymbols !eachLineStartBlockOpenSymbols char:$(.) {return char;}

// White spaces
WS 'white spaces' = ws:$(NL / TAB / SPACE)* {return ws;}
WS_MANDATORY 'white spaces mandatory' = ws:$(NL / TAB / SPACE)+ {return ws;}

// New line: unix, windows or old-mac style
NL  = nl:$(UNIX_NL / WINDOWS_NL / MACOS_NL) {return nl;}
UNIX_NL = '\n'          {return '\n';}
WINDOWS_NL = '\r\n'     {return '\r\n';}
MACOS_NL = '\r'         {return '\r';}

TAB   = '\t'    {return '\t';}
SPACE = ' '     {return ' ';}
