var chai = require('chai'),
  chaiAsPromised = require('chai-as-promised'),
  expect = chai.expect,
  Checkftions = require('allex_checkslowlevellib'),
  Maclib = require('allex_macaddresslowlevellib')(Checkftions.isFunction, Checkftions.isArray),
  Dlinkedlistbase = require('allex_doublelinkedlistbaselowlevellib'),
  Inherit = require('allex_inheritlowlevellib'),
  Fifo = require('allex_fifolowlevellib')(Dlinkedlistbase, Inherit.inherit),
  Timeout = require('allex_timeoutlowlevellib')(Checkftions.isFunction, Fifo),
  Functionmanip = require('allex_functionmanipulationlowlevellib')(Inherit.inherit),
  Eventemitter = require('allex_eventemitterlowlevellib')(Dlinkedlistbase, Inherit.inherit, Checkftions.isFunction, Checkftions.isArrayOfFunctions),
  q = require('allex_qlowlevellib')(Timeout.runNext, Checkftions.isArray, Checkftions.isFunction, Inherit.inherit, Functionmanip.dummyFunc, Eventemitter),
  UidLib = require('..')(q, Maclib.getMac),
  _aLot = 2e6;

chai.use(chaiAsPromised);

describe('Basic tests', function () {
  it('Init', function () {
    expect(UidLib.init()).to.eventually.equal(true);
  });
  it('Get one uid', function () {
    expect(UidLib.uid()).to.have.lengthOf(44);
  });
  it('Get a lot of uids', function () {
    this.timeout(100000);
    var i;
    for (i=0; i<_aLot; i++) {
      expect(UidLib.uid()).to.have.lengthOf(44);
    }
  });
});
