/* Summarize Result */
(function () {
    'use strict';

    describe('Summarize', function () {
        var totals = local(function() {
            return {
                a: 5,
                b: 6
            }
        });

        var emptyTotals = local(function() {
            return {};
        });

        describe('._render', function () {
            var summary = local(function() {
                return document.getElementById('admin_helper');
            });

            var target = local(function() {
                var div = document.createElement('div');
                div.innerHTML = '<span id="TSEntryInline"></span>';

                return div;
            }, function(item) {
                if (item && item.parentNode) {
                    item.parentNode.removeChild(item);
                }
            });

            context('when page has suitable target', function() {
                beforeEach(function() {
                    document.body.appendChild(target());
                });

                context('when no admin entries exist', function() {
                    beforeEach(function() {
                        Summarize._render(emptyTotals());
                    });

                    it('does not display summary', function() {
                        expect(summary()).to.be.null;
                    });
                });

                context('when admin entries exist', function() {
                    beforeEach(function() {
                        Summarize._render(totals());
                    });

                    it('adds helper summary to the page', function() {
                        expect(summary()).not.to.be.null;
                    });

                    it('adds helper before entry element', function() {
                        expect(summary().nextSibling).to.have.property('id','TSEntryInline');
                    });

                    it('renders summary data', function() {
                        expect(summary().innerHTML).to.have.string('<li>a: <span class="admin_helper_hours">5.00</span></li>');
                        expect(summary().getElementsByTagName('li')).to.have.length(2);
                    });
                });
            });

            context('when page has no suitable target', function() {
                beforeEach(function() {
                    Summarize._render(totals());
                });

                it('adds nothing to the page', function() {
                    expect(summary()).to.be.null;
                });
            });
        });

        describe('._shouldRender', function() {
            context('with valid total data', function() {
                it('will render data', function() {
                    expect(Summarize._shouldRender(totals())).to.be.true;
                });
            });
            context('without valid total data', function() {
                it('will not render data', function() {
                    expect(Summarize._shouldRender(emptyTotals())).to.be.false;
                });
            });
        });

        describe('._formatTotals', function() {
            context('without a specified decimal', function() {
                var result = local(function() {
                    return Summarize._formatTotals(totals());
                });
                it('returns string values', function() {
                    expect(result().a).to.be.a('string');
                });
                it('formats values to 2 decimal places', function() {
                    expect(result().a).to.eql('5.00');
                });
            });

            context('with a specified decimal', function() {
                 var result = local(function() {
                    return Summarize._formatTotals(totals(), 9);
                });
                it('formats values to the specified decimal places', function() {
                    expect(result().a).to.eql('5.000000000');
                });
            })
        });

        describe('.run', function() {
            var data = local(function() {
                var table = document.createElement('table');

                table.innerHTML = SpecFixtures.ADMIN_ROWS;

                return table;
            }, function(table) {
                if (table && table.parentNode) {
                    table.parentNode.removeChild(table);
                }
            });

            beforeEach(function() {
                document.body.appendChild(data());
            });

            var rows = local(function() {
                var nodeList = data().getElementsByTagName('tr');

                var result = [];
                for(var i = 0, l = nodeList.length; i < l; i++) {
                    result.push(nodeList[i]);
                }

                return result;
            });

            it('renders a single row', function() {
                var spy = sinon.stub(Summarize, '_render');

                Summarize.run(rows());
                expect(spy.calledOnce).to.be.true;
                spy.restore();
            });

            it('parses rows for hour and prefix data', function() {
                var spy = sinon.stub(Summarize, '_render');

                Summarize.run(rows());
                expect(spy.firstCall.calledWithExactly({'First Client': 0.75})).to.be.true;
                spy.restore();
            });
        });
    });
})();