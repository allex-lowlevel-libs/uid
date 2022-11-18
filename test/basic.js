var UidLib = require('..')(q, lib),
  _aLot = 2e6;

//chai.use(chaiAsPromised);

describe('Basic tests', function () {
  it('Init', function () {
    expect(UidLib.init()).to.eventually.equal(true);
  });
  it('Get one uid', function () {
    expect(UidLib.uid()).to.have.lengthOf(45);
  });
  it('Get a lot of uids', function () {
    this.timeout(100000);
    var i;
    for (i=0; i<_aLot; i++) {
      expect(UidLib.uid()).to.have.lengthOf(45);
    }
  });
});
