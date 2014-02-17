/* Template Class */
(function () {
    'use strict';

    describe('Template', function () {
        var template = local(function() {
            return '{item_a} : <b>{item_b}</b>'
        });
        var repeatingTemplate = local(function() {
            return '{key} : <b>{value}</b>'
        });
        var templateVars = local(function() {
            return { item_a: 'banana', item_b: 'foo <>' }}
        );

        describe('.render', function () {
            var result = local(function() {
                return Template.render(template(), templateVars());
            });

            it ('interpolates parameters into templates', function() {
                expect(result()).to.equal('banana : <b>foo &lt;&gt;</b>');
            });
        });

        describe('.renderObject', function() {
            var result = local(function() {
                return Template.renderObject(repeatingTemplate(), templateVars());
            });

            it ('iterpolates and concatenates key/value pairs from objects', function() {
                expect(result()).to.equal('item_a : <b>banana</b>item_b : <b>foo &lt;&gt;</b>');
            });
        });

        describe('._escape', function() {
            it ('escapes HTML characters in input strings', function() {
                var result = Template._escape('<>"\'/&amp;');
                expect(result).to.equal('&lt;&gt;&quot;&#39;&#x2F;&amp;amp;');
            });
        });
    });
})();