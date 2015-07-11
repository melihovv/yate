# yate
[![Build Status](https://travis-ci.org/melihovv/yate.svg?branch=master)](https://travis-ci.org/melihovv/yate)

Yet Another Template Engine

## Features
- integer variable declaration with initialization `{{@count=10}}`
- insertion value of variable `{{count}}`
- condition `{{#if count}}Hello{{/if}}`
- array of object iteration `{{#each people}} {{name}} {{/each}}`

## Usage

```
var template =
    `{{peopleCount = 10}} +
    {{#if peopleCount}} +
        Expected people count: {{peopleCount}} +
        
        Real people:
        {{#each people}} +
            {{name}}
        {{/each}} +
    {{/if}}`;

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

yate.render(template, context);

Produce:
`Expected people count: 10

Real people:
Homer
Bart`
```
