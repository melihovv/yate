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
    = insert:insert         {return insert;}
    / assignment
    / condition:condition   {return condition;}
    / content:eachLoop      {return content;}
    / text:text             {return text;}

insert 'insert'
    = insertOpenSymbols id:$id closeSymbols {
        if (isUndefined(local[id]) && isUndefined(_this.context[id])) {
            throw Error('Variable \'' + id + '\' is undefined');
        }

        if (isNotPrimitive(_this.context[id])) {
            throw Error('Variable \'' + _this.context[id] + '\' is not primitive');
        }

        return local[id] || _this.context[id];
    }

assignment 'assignment'
    = assignmentOpenSymbols id:$id ws '=' ws number:$number closeSymbols {
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

eachLoopInsert
    = insertEachLoopOpenSymbols id:id closeSymbols {
        return [id, 'eachLoop'];
    }

eachLoopBody
    = id:eachLoopInsert                {return id;}
    / unit:unit                        {return unit;}


ifStartBlock 'ifStartBlock'
    = ifStartBlockOpenSymbols id:$id closeSymbols {
        return id;
    }

ifEndBlock 'ifEndBlockSymbols'
    = '{{/if' closeSymbols

ifStartBlockOpenSymbols 'ifOpenSymbols'
    = '{{#if' wsmandatory


eachStartBlock 'eachStartBlock'
    = eachStartBlockOpenSymbols id:$id closeSymbols {
        return id;
    }

eachStartBlockOpenSymbols 'eachStartBlockOpenSymbols'
    = '{{#each' wsmandatory

eachEndBlock 'eachEndBlock'
    = '{{/each' closeSymbols


insertOpenSymbols 'insertOpenSymbols'
    = '{{' ws

insertEachLoopOpenSymbols 'insertEachLoopOpenSymbols'
    = '{{+' ws

assignmentOpenSymbols 'assigmentOpenSymbols'
    = '{{@' ws

closeSymbols 'closeSymbols'
    = ws '}}'


id 'id'
    = id:$([A-z$_][A-z0-9$_]*) {return id;}

number 'number'
    = number:$('0' / [1-9]([0-9]*)) {return Number(number);}

text 'text'
    = text:$(char)+ {return text}

char 'char'
    = !insertOpenSymbols !assignmentOpenSymbols !ifStartBlockOpenSymbols !eachStartBlockOpenSymbols char:$(.) {return char;}


// White space
ws 'white spaces' = ws:$(nl / tab / space)* {return ws;}
wsmandatory 'white spaces mandatory' = ws:$(nl / tab / space)+ {return ws;}

// New line: unix, windows or old-mac style
nl  = nl:$(unl / wnl / mnl) {return nl;}
unl = '\n'      {return '\n';}
wnl = '\r\n'    {return '\r\n';}
mnl = '\r'      {return '\r';}

tab   = '\t'    {return '\t';}
space = ' '     {return ' ';}
