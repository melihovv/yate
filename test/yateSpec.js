describe('Yate', function () {
    'use strict';

    var render = require('../lib/yate');

    it('must render empty template without exception', function () {
        render('').must.equal('');
    });

    it('must render simple text', function () {
        render('hello').must.equal('hello');
    });

    it('must not waste context', function () {
        var template = '{{@count=10}}';
        var context = {};
        render(template, context);
        var demand = require('must');
        demand(context['count']).be.undefined();
    });

    describe('insertion value of variable', function () {
        it('must insert number', function () {
            var expected = '10';
            var template = '{{number}}';
            render(template, {number: 10}).must.equal(expected);
        });

        it('must insert string', function () {
            var expected = '10';
            var template = '{{number}}';
            render(template, {number: '10'}).must.equal(expected);
        });

        it('must throw exception when insert not existing variable', function () {
            var template = '{{number}}';
            var number = 0;
            try {
                render(template, {word: 'word'});
            } catch (e) {
                ++number;
            }
            number.must.equal(1);
        });

        it('must throw exception when insert non primitive type', function () {
            var template = '{{type}}';
            var number = 0;
            try {
                render(template, {type: ['word']});
            } catch (e) {
                ++number;
            }
            number.must.equal(1);
        });
    });

    describe('integer variable declaration with initialization', function () {
        var expected = '10';

        it('must compile template', function () {
            var template = '{{@count=10}}{{count}}';
            render(template).must.equal(expected);
        });

        it('must compile template with white spaces between managing symbols and content', function () {
            var template = '{{@ count =\n10  \t}}{{    count}}';
            render(template).must.equal(expected);
        });

        it('must override passed variable with the same name', function () {
            var template = '{{@ count =\n10  \t}}{{    count}}';
            render(template, {count: 11}).must.equal(expected);
        });
    });

    describe('condition', function () {
        describe('must render template with condition', function () {
            var template = '{{#if cond}}hello{{/if}}';

            it('truthy condition', function () {
                var expected = 'hello';
                render(template, {cond: true}).must.equal(expected);
            });

            it('falsy condition', function () {
                var expected = '';
                render(template, {cond: false}).must.equal(expected);
            });
        });

        it('must throw exception when variable is undefined', function () {
            var template = '{{type}}';
            var number = 0;
            try {
                render(template, {});
            } catch (e) {
                ++number;
            }
            number.must.equal(1);
        });

        describe('nested elements', function () {
            it('must allow nested integer variable declaration with assignment', function () {
                var template = '{{#if cond}}{{@count=10}}{{/if}}{{count}}';
                var expected = '10';
                render(template, {cond: true}).must.equal(expected);
            });

            it('must allow nested insertion of variable value', function () {
                var template = '{{#if cond}}{{count}}{{/if}}';
                var expected = '10';
                render(template, {
                    cond: true,
                    count: 10
                }).must.equal(expected);
            });

            describe('nested condition', function () {
                var template = '{{#if cond1}}{{#if cond2}}{{count}}{{/if}}{{/if}}';

                it('truthy second condition', function () {
                    var expected = '10';
                    render(template, {
                        cond1: true,
                        cond2: true,
                        count: 10
                    }).must.equal(expected);
                });

                it('falsy second condition', function () {
                    var expected = '';
                    render(template, {
                        cond1: true,
                        cond2: false,
                        count: 10
                    }).must.equal(expected);
                });
            });

            it('must allow nested text', function () {
                var template = '{{#if cond}}hello again{{/if}}';
                var expected = 'hello again';
                render(template, {cond: true}).must.equal(expected);
            });

            it('must allow nested loops', function () {
                var template = '{{#if cond}}{{#each people}}{{+name}}{{/each}}{{/if}}';
                var context = {
                    people: [
                        {name: 'Homer'},
                        {name: 'Bart'}
                    ],
                    cond: true
                };
                var expected = 'HomerBart';
                render(template, context).must.equal(expected);
            });
        });
    });

    describe('each loop', function () {
        it('must render template with each loop: one property', function () {
            var template = '{{#each people}}{{+name}}{{/each}}';
            var context = {
                people: [
                    {name: 'Homer'},
                    {name: 'Bart'}
                ]
            };
            var expected = 'HomerBart';
            render(template, context).must.equal(expected);
        });

        it('must render template with each loop: two propeties', function () {
            var template = '{{#each people}}{{+name}}{{+lastname}}{{/each}}';
            var context = {
                people: [
                    {name: 'Homer', lastname: 'Simpson'},
                    {name: 'Bart', lastname: 'Simpson'}
                ]
            };
            var expected = 'HomerSimpsonBartSimpson';
            render(template, context).must.equal(expected);
        });

        it('must render template with nested text', function () {
            var template = '{{#each people}}hello{{/each}}';
            var context = {
                people: [
                    {name: 'Homer'},
                    {name: 'Bart'}
                ]
            };
            var expected = 'hellohello';
            render(template, context).must.equal(expected);
        });

        it('must render template with nested text and instructions', function () {
            var template = '{{#each people}}{{+name}}hello{{/each}}';
            var context = {
                people: [
                    {name: 'Homer'},
                    {name: 'Bart'}
                ]
            };
            var expected = 'HomerhelloBarthello';
            render(template, context).must.equal(expected);
        });

        it('must throw exception when object is undefined', function () {
            var template = '{{#each people}}{{/each}}';
            var context = {};
            var number = 0;
            try {
                render(template, context).must.throw();
            } catch (e) {
                ++number;
            }
            number.must.equal(1);
        });

        it('must throw exception when object property is undefined', function () {
            var template = '{{#each people}}{{+lastname}}{{/each}}';
            var context = {
                people: [
                    {name: 'Homer'},
                    {name: 'Bart'}
                ]
            };
            var number = 0;
            try {
                render(template, context).must.throw();
            } catch (e) {
                ++number;
            }
            number.must.equal(1);
        });

        it('must throw exception when object property is not primitive', function () {
            var template = '{{#each people}}{{+lastname}}{{/each}}';
            var context = {
                people: [
                    {name: ['Homer']},
                    {name: 'Bart'}
                ]
            };
            var number = 0;
            try {
                render(template, context).must.throw();
            } catch (e) {
                ++number;
            }
            number.must.equal(1);
        });

        it('must throw exception when object is not an object', function () {
            var template = '{{#each people}}{{+lastname}}{{/each}}';
            var context = {
                people: [
                    ['Homer'],
                    {name: 'Bart'}
                ]
            };
            var number = 0;
            try {
                render(template, context).must.throw();
            } catch (e) {
                ++number;
            }
            number.must.equal(1);
        });

        it('must throw exception when array is not an array', function () {
            var template = '{{#each people}}{{+lastname}}{{/each}}';
            var context = {
                people: ''
            };
            var number = 0;
            try {
                render(template, context).must.throw();
            } catch (e) {
                ++number;
            }
            number.must.equal(1);
        });

        it('must allow nested inserting value of variable', function () {
            var template = '{{#each people}}{{hello}}{{/each}}';
            var context = {
                people: [
                    {name: 'Homer'},
                    {name: 'Bart'}
                ],
                hello: 'Hello'
            };
            var expected = 'HelloHello';
            render(template, context).must.equal(expected);
        });

        it('must allow nested integer variable declaration with initialization', function () {
            var template = '{{#each people}}{{@hello=42}}{{/each}}{{hello}}';
            var context = {
                people: [
                    {name: 'Homer'},
                    {name: 'Bart'}
                ]
            };
            var expected = '42';
            render(template, context).must.equal(expected);
        });

        it('must allow nested condition', function () {
            var template = '{{#each people}}{{#if cond}}hello{{/if}}{{/each}}';
            var context = {
                people: [
                    {name: 'Homer'},
                    {name: 'Bart'}
                ],
                cond: true
            };
            var expected = 'hellohello';
            render(template, context).must.equal(expected);
        });

        it('must allow nested loops', function () {
            var template = '{{#each people}}{{+name}}{{#each fruits}}{{+name}}{{/each}}{{/each}}';
            var context = {
                people: [
                    {name: 'Homer'},
                    {name: 'Bart'}
                ],
                fruits: [
                    {name: 'Banana'},
                    {name: 'Apple'}
                ]
            };
            var expected = 'HomerBananaAppleBartBananaApple';
            render(template, context).must.equal(expected);
        });
    });

    describe('complicated templates', function () {
        it('must render template with text and instructions without conditions and loops', function () {
            var template = ' {{@count=10}}People count = {{count}}';
            var expected = ' People count = 10';
            render(template).must.equal(expected);
        });

        it('must render template with text and instructions without loops', function () {
            var template = ' {{@count=10}}{{#if count}}People count = {{count}}{{/if}}';
            var expected = ' People count = 10';
            render(template).must.equal(expected);
        });

        it('must render the most complicated template', function () {
            var template =
                '{{@count=42}}' +
                '{{#if cond1}}' +
                '{{#each people}}' +
                '{{+name}}' +
                '{{hello}}' +
                '{{#if cond2}}' +
                '{{#each fruits}}' +
                '{{+fruit}}' +
                '{{/each}}' +
                '{{/if}}' +
                '{{/each}}' +
                '{{count}}' +
                '{{/if}}';
            var expected = 'HomerHelloBartHello42';
            var context = {
                people: [{name: 'Homer'}, {name: 'Bart'}],
                fruits: [{fruit: 'Banana'}, {fruit: 'Apple'}],
                hello: 'Hello',
                cond1: true,
                cond2: false
            };
            render(template, context).must.equal(expected);
        });
    });
})
;
