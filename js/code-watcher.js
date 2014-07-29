"use strict";

var clog = require('./console-logger');
var watchedCode = [];

module.exports = {
    watchCode     : watchCode,
    stopWatchCode : stopWatchCode,
    stopAll       : stopAll
};

function watchCode(func, callback){
    watchedCode.push({
        func     : func,
        val      : func.toString(),
        callback : callback
    });
}

function stopWatchCode(func){
    for(var i = 0; i < watchedCode.length; ++i){
        if(func === watchedCode.func){
            watchedCode.splice(i, 1);
            return true;
        }
    }
    return false;
}

function stopAll(){
    watchedCode = [];
}

function checkCodeChanges(){
    watchedCode.forEach(function(watchData){
        var currentVal = watchData.func.toString();
        var prevVal = watchData.val;
        if(currentVal !== prevVal){
            watchData.callback(watchData.func, currentVal, prevVal);
            watchData.val = currentVal;
            clog.info('code changed successfully!');
        }
    });
}


setInterval(checkCodeChanges, 100);