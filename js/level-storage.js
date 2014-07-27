"use strict";

module.exports = {
    getIsPass  : getIsPass,
    setIsPass  : setIsPass,
    saveData   : saveData,
    removeData : removeData,
    getData    : getData
};

function getIsPass(levelId){
    return (localStorage.getItem(levelId + '_isPassed')==='true') || false;
}

function setIsPass(levelId, isPassed){
    localStorage.setItem(levelId + '_isPassed', !!isPassed);
}

function getData(levelId, key) {
    var data = localStorage.getItem(levelId + '_d_' + key);
    return  (data !== undefined) ? data : null;
}

function saveData(levelId, key, value) {
    localStorage.setItem(levelId + '_d_' + key, value);
}

function removeData(levelId, key) {
    localStorage.removeItem(levelId + '_d_' + key);
}