/* Xpath Class */
(function () {
    'use strict';

    describe('Xpath', function () {
        var data = local(function() {
            var div = document.createElement('div');

            div.innerHTML = '<ul>\
                <li class="foo">item1<span id="first_span"></span></li>\
                <li class="bar">item<span id="second_span"></span></li>\
            </ul>';

            return div;
        });

        describe('._evaluate', function() {
            context('with no source argument', function() {
                it('finds elements relative to the document body', function() {
                    var result = Xpath._evaluate('.', null, false);

                    expect(result).to.have.property('tagName', 'BODY');
                });
            });

            context('with a source argument', function() {
                var source = local(function() {
                    return data().getElementsByTagName('li')[1];
                });

                it('only finds elements in the source argument', function() {
                    var result = Xpath._evaluate('.', source(), false);

                    expect(result).to.have.property('className', 'bar');
                });
            });

            it('finds single items', function() {
                var result = Xpath._evaluate('.//li', data(), false);
                expect(result).to.have.property('tagName','LI');
            });

            it('finds multiple items', function() {
                var result = Xpath._evaluate('.//span', data(), true);
                expect(result).to.have.property('length', 2);
            });
        });


        describe('.find', function() {
            context('when nodes match the search', function() {
                it('returns a single node', function() {
                    var result = Xpath.find('.//li', data());
                    expect(result).to.have.property('className', 'foo');
                });
            });

            context('with no matching nodes', function() {
                it('returns nothing', function() {
                    var result = Xpath.find('.//a', data());
                    expect(result).to.be.null;
                });
            });
        });

        describe('.findAll', function() {
            context('when nodes match the search', function() {
                it('returns a multiple nodes', function() {
                    var result = Xpath.findAll('.//li', data());
                    expect(result.length).to.equal(2);
                });
            });

            context('with no matching nodes', function() {
                it('returns an empty list', function() {
                    var result = Xpath.findAll('.//div', data());
                    expect(result.length).to.equal(0);
                });
            });
        });
    });
})();