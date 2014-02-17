/* Query Result */
(function () {
    'use strict';

    function mockSnapshot(items) {
        var snapshot = {};

        Object.defineProperties(snapshot, {
            snapshotLength: {value: items.length},
            snapshotItem: {
                value: function(i) { return items[i]; }
            }
        });

        return snapshot;
    }

    describe('QueryResult', function () {
        describe('.constructor', function () {
            var query = local(function() {
                return new QueryResult(snapshot());
            });

            var snapshot = local(function() {
                return mockSnapshot([]);
            });

            it('stores the constructor argument as result', function () {
                expect(query().result).to.equal(snapshot());
            });
        });
        describe('#length', function() {
            context('when query data is empty', function() {
                var query = local(function() {
                    return new QueryResult(mockSnapshot([]));
                });

                it('has a zero length', function() {
                    expect(query()).to.have.property('length', 0);
                });
            });

            context('when query has results', function() {
                var query = local(function() {
                    return new QueryResult(mockSnapshot(['aaa','bbb']));
                });

                it('has matching length', function() {
                    expect(query()).to.have.property('length', 2);
                });
            });
        });

        describe('#all', function() {
            context('when query data is empty', function() {
                var query = local(function() {
                    return new QueryResult(mockSnapshot([]));
                });

                var result = local(function() {
                    return query().all();
                });

                it('returns an empty array', function() {
                    expect(result()).to.eql([]);
                });
            });

            context('when query has results', function() {
                var query = local(function() {
                    return new QueryResult(mockSnapshot([
                        5,
                        10,
                        50
                    ]));
                });

                var result = local(function() {
                    return query().all();
                });

                it('applies callback to data items', function() {
                    expect(result()).to.eql([5, 10, 50]);
                });
            });
        });

        describe('#map', function() {
            context('when query data is empty', function() {
                var query = local(function() {
                    return new QueryResult(mockSnapshot([]));
                });

                var result = local(function() {
                    return query().map(function() {
                        return 'a';
                    });
                });

                it('returns an empty array', function() {
                    expect(result()).to.eql([]);
                });
            });

            context('when query has results', function() {
                var query = local(function() {
                    return new QueryResult(mockSnapshot([
                        5,
                        10,
                        50
                    ]));
                });

                var result = local(function() {
                    return query().map(function(i) {
                        return i*2;
                    });
                });

                it('applies callback to data items', function() {
                    expect(result()).to.eql([10, 20, 100]);
                });
            });
        });
        describe('#forEach', function() {
            var callback = local(function() {
                return sinon.spy();
            });
            context('when query data is empty', function() {
                var query = local(function() {
                    return new QueryResult(mockSnapshot([]));
                });

                it('does not run callback', function() {
                    query().forEach(callback());

                    expect(callback().called).to.be.false;
                });
            });

            context('when query has results', function() {

                var query = local(function() {
                    return new QueryResult(mockSnapshot([
                        'aaa',
                        'bbb',
                        'ccc'
                    ]));
                });

                it ('runs callback for each query item', function() {
                    query().forEach(callback());

                    expect(callback().callCount).to.equal(3);
                });

                it('passes items to callback', function() {
                    query().forEach(callback());

                    expect(callback().args).to.eql([['aaa'],['bbb'],['ccc']]);
                });
            });
        });
    });
})();