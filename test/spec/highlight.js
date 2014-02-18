/* Highlight Class */
(function () {
    'use strict';

    describe('Highlight', function () {
        describe('.run', function () {
            var node = local(function() {
                var node = document.createElement('div');
                node.setAttribute('class', 'foo');
                return node;
            });

            var nodes = local(function() {
                return [node()];
            });

            beforeEach(function() {
                Highlight.run(nodes());
            });

            it ('applies highlight class to provided items', function() {
                expect(node().classList.contains('admin_helper_highlight')).to.be_true;
            });
        });
    });
})();