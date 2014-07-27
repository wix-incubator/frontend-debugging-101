"use strict";

var clog = require('./console-logger');
var code = require('./code-compiler');
var storage = require('./level-storage');
var LEVELS = [
    require("./exercises/001/main.js"),
    require("./exercises/002/main.js"),
    require("./exercises/003/main.js"),
    require("./exercises/004/main.js"),
    require("./exercises/005/main.js")
];
var _options;

module.exports = {
    init : init
};

function init(options) {
    _options = options;
    code.init(options.codeOptions);
    setLevels(_options.gameNode.querySelector('levels'));
    playLevel(0);
}

function playLevel(levelIndex){
    clearLevel();
    var level = getLevel(levelIndex);
    if(level){
        var levelTitleNode = _options.gameNode.querySelector('level-title');
        levelTitleNode.setAttribute('index', levelIndex + 1);
        levelTitleNode.innerText = level.name;
        getLevelButton(levelIndex).setAttribute('current', true);
        level.restart(_options.levelNode, {
            finishLevel: finishLevel.bind(null, levelIndex),
            code: code,
            clog: clog,
            saveData: storage.saveData.bind(null, levelIndex),
            getData: storage.getData.bind(null, levelIndex)
        });
    } else {
        console.log('LEVEL %s NOT FOUND', levelIndex);
    }
}

function clearLevel(){
    console.clear();
    _options.levelNode.innerHTML = '';
    _options.levelNode.setAttribute('style', '');
    _options.levelNode.setAttribute('class', '');
    var lvlBtns = _options.gameNode.querySelector('levels').firstChild.childNodes;
    for(var i = 0; i < lvlBtns.length; ++i){
        lvlBtns[i].removeAttribute('current');
    }
}

function finishLevel(levelIndex, mode){
//    alert('level ' + levelIndex + ' passed!');
    storage.setIsPass(levelIndex, true);
    var levelButton = getLevelButton(levelIndex);
    levelButton.setAttribute('done', mode);
    if(getLevelAmount() > levelIndex+1){
        playLevel(levelIndex+1);
    }
}

function getLevelButton(index){
    return _options.gameNode.querySelector('levels').firstChild.childNodes[index];
}

function setLevels(levelsNode){
    levelsNode.innerHTML = '';
    var levelsHtml = '';
    LEVELS.forEach(function(level, index){
        var isDone = storage.getIsPass(index);
        levelsHtml += '<li title="' + level.name + '" done="' + isDone + '" rol="level-btn">' + (index+1) + '</li>'
    });
    levelsNode.innerHTML = '<ul class="level-list">' + levelsHtml + '</ul>';
    levelsNode.addEventListener('click', function(event){
        if(event.target.getAttribute('rol')!== 'level-btn') return;
        playLevel(parseInt(event.target.innerText, 10)-1);
    })
}
function getLevel(levelIndex) { return LEVELS[levelIndex] || null; }
function getLevelAmount(){ return LEVELS.length; }

