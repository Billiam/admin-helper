/* Template Class */
(function () {
    'use strict';

    describe('Template', function () {
        var template = local(function() {
            return '{item_a} : <b>{item_b}</b>';
        });
        var repeatingTemplate = local(function() {
            return '{key} : <b>{value}</b>';
        });
        var arrayTemplate = local(function() {
            return '{item_a} : <b>{item_b}</b>';
        });
        var templateVars = local(function() {
            return { item_a: 'banana', item_b: 'foo <>' }}
        );
        var arrayVars = local(function() {
            return [
                { item_a: 'banana', item_b: 'apple' },
                { item_a: 'foo <>', item_b: 'bar' }
            ]
        });

        describe('.render', function () {
            context('when escaping html', function() {
                var result = local(function() {
                    return Template.render(template(), templateVars());
                });

                it ('escapes and interpolates parameters into templates', function() {
                    expect(result()).to.equal('banana : <b>foo &lt;&gt;</b>');
                });
            });

            context('when not escaping html', function() {
                var result = local(function() {
                    return Template.render(template(), templateVars(), true);
                });

                it ('interpolates parameters into templates', function() {
                    expect(result()).to.equal('banana : <b>foo <></b>');
                });
            });
        });

        describe('.renderObject', function() {
            context('when escaping html', function() {
                var result = local(function() {
                    return Template.renderObject(repeatingTemplate(), templateVars());
                });

                it ('escapes, iterpolates, and concatenates key/value pairs from objects', function() {
                    expect(result()).to.equal('item_a : <b>banana</b>item_b : <b>foo &lt;&gt;</b>');
                });
            });

            context('when not escaping html', function() {
                var result = local(function() {
                    return Template.renderObject(repeatingTemplate(), templateVars(), true);
                });

                it ('iterpolates and concatenates key/value pairs from objects', function() {
                    expect(result()).to.equal('item_a : <b>banana</b>item_b : <b>foo <></b>');
                });
            });
        });

        describe('.renderEach', function() {
           context('when escaping html', function() {
                var result = local(function() {
                    return Template.renderEach(arrayTemplate(), arrayVars());
                });

                it ('escapes, iterpolates, and concatenates key/value pairs from array items', function() {
                    expect(result()).to.equal('banana : <b>apple</b>foo &lt;&gt; : <b>bar</b>');
                });
            });

            context('when not escaping html', function() {
                var result = local(function() {
                    return Template.renderEach(arrayTemplate(), arrayVars(), true);
                });

                it ('iterpolates and concatenates key/value pairs from objects', function() {
                    expect(result()).to.equal('banana : <b>apple</b>foo <> : <b>bar</b>');
                });
            });
        });

        describe('._escape', function() {
            var result = local(function() {
                return Template._escape('<>"\'/&amp;');
            });

            it ('escapes HTML characters in input strings', function() {
                expect(result()).to.equal('&lt;&gt;&quot;&#39;&#x2F;&amp;amp;');
            });
        });
    });
})();