# yate

Yet Another Template Engine

Now node.js is only supported

## Features
- integer variable declaration with initialization `{{@count=10}}`
- insertion value of variable `{{count}}`
- condition `{{#if count}}Hello{{/if}}`
- array of object iteration `{{#each people}} {{name}} {{/each}}`

## Usage

```javascript
var compile = require('yate');

var template =
    '{{@peopleCount = 10}}' +
    '{{#if peopleCount}}' +
        'Expected people count: {{peopleCount}}' +
        '\n' +
        'Real people:' +
        '{{#each people}}' +
            ' {{name}}' +
        '{{/each}}' +
    '{{/if}}';

var render = compile(template);

var context = {
    people: [
        {
            name: 'Homer'
        },
        {
            name: 'Bart'
        }
    ]
};

console.log(render(context));
```
```
Produce:
`Expected people count: 10
 Real people: Homer Bart`
```
