var randomBytes = require('crypto').randomBytes,
  counter = 0,
  __MaxCounter = 1e6,
  __macAddrObj = {
    mac:null
  };

function onMac(defer, mao, err, mac) {
  if(err){
    console.log('mac addr err',err);
    defer.reject(err);
  } else {
    mao.mac = mac.replace(/:/g,'');
    defer.resolve(true);
  }
  defer = null;
  mao = null;
}

function counterString (cntr) {
  if (cntr<10) {
    return '00000'+cntr;
  }
  if (cntr<100) {
    return '0000'+cntr;
  }
  if (cntr<1000) {
    return '000'+cntr;
  }
  if (cntr<10000) {
    return '00'+cntr;
  }
  if (cntr<100000) {
    return '0'+cntr;
  }
  if (cntr<1000000) {
    return ''+cntr;
  }
  throw (new Error('Counter '+cntr+' too large'));
}

function createUidLib(q, lib) {
  'use strict';

  var d;

  function uniqueSessionId(){
    if(!__macAddrObj.mac){
      console.trace();
      console.log('NO_MAC_ADDRESS');
      throw "NO_MAC_ADDRESS";
    }
    counter++;
    if(counter>=__MaxCounter){
      counter = 1;
    }
    return __macAddrObj.mac+lib.pid()+lib.now()+''+randomBytes(4).toString('hex')+counterString(counter);
  };

  function init(){
    if (!d) {
      d = q.defer();
      lib.getMac(onMac.bind(null, d, __macAddrObj));
    }
    return d.promise;
  }

  return {
    uid:uniqueSessionId,
    init: init
  };
}

module.exports = createUidLib;
