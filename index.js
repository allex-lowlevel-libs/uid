var randomBytes = require('crypto').randomBytes,
  counter = 0,
  __MaxCounter = 1e6,
  __pid = process.pid || '';
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

function counterString (counter) {
  if (counter<10) {
    return '00000'+counter;
  }
  if (counter<100) {
    return '0000'+counter;
  }
  if (counter<1000) {
    return '000'+counter;
  }
  if (counter<10000) {
    return '00'+counter;
  }
  if (counter<100000) {
    return '0'+counter;
  }
  if (counter<1000000) {
    return ''+counter;
  }
  throw (new Error('Counter '+counter+' too large'));
}

function createUidLib(q, getMac) {
  'use strict';
  var d = q.defer();
  getMac(onMac.bind(null, d, __macAddrObj));

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
    return __macAddrObj.mac+__pid+Date.now()+''+randomBytes(4).toString('hex')+counterString(counter);
  };

  function init(){
    if (d) {
      return d.promise;
    }
    return q.reject(Error('UID_LIBRARY_DEAD'));
  }

  return {
    uid:uniqueSessionId,
    init: init
  };

}

module.exports = createUidLib;
