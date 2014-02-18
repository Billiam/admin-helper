/* Highlight Class */
(function () {
    'use strict';
        var data = local(function() {
            var table = document.createElement('table');

            table.innerHTML = SpecFixtures.ADMIN_ROWS;

            return table;
        }, function(table) {
            if (table && table.parentNode) {
                table.parentNode.removeChild(table);
            }
        });

        describe('AdminHelper', function () {
            describe('_iterateRows', function() {
                var spy = local(function() {
                    return sinon.spy();
                });

                var helper = local(function() {
                    return {
                        run: spy()
                    };
                });

                beforeEach(function() {
                    document.body.appendChild(data());

                    AdminHelper._iterateRows([helper()]);
                });

                it('finds admin rows', function() {
                    expect(spy().calledOnce).to.be.true;
                });

                it('passes admin rows to provided classes', function() {
                    var result = spy().firstCall.args[0].all();

                    expect(result[0]).to.have.property('tagName', 'TR');
                });
            });
        });
})();
