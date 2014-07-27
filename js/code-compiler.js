"use strict";

var codeIndex = 0;
var codeIndexByName = {};
var callbacks = {};
var _options;

module.exports = {
    init   : init,
    create : create
};

function init(options){
    _options = options;
    _options.registerPath = _options.registerPath || '__ccgs__';
    _options.scriptsNode = _options.scriptsNode || document.head;
    window[_options.registerPath] = onScriptLoad;
}

function create(code, options, callback){
    var contentFileName = getFileName(options.name);
    var id = 'f' + codeIndex++;
    callbacks[id] = callback;

    var url = createScriptUrlFromBlob(id, code, contentFileName);

    var scriptTag = document.createElement('script');
    scriptTag.setAttribute('src', url);
    _options.scriptsNode.appendChild(scriptTag);
}

function getFileName(name){
    var contentFileName = name || 'code-for-edit';
    contentFileName += '_' + Math.random();
    return contentFileName;
}

function createScriptUrlFromBlob(id, code, contentFileName){
    var content = _options.registerPath + '("' + id + '", \n\n/** CODE START **/\n\n' + code + '\n\n/** CODE END **/\n\n)' + '//# sourceURL=' +  contentFileName;
    return URL.createObjectURL(new Blob([content], {type: 'text/javascript'}));
}

function createScriptUrlFromServer(id, code, contentFileName){
    var content = _options.registerPath + '("' + id + '", \n' + code + '\n)' + '//# sourceURL=' +  contentFileName;
    return '/code/' + encodeURI(content.replace('#', '$HASH$'));
}

function onScriptLoad(scriptId, exports){
    if(callbacks[scriptId]) {
        callbacks[scriptId](null, exports);
        delete callbacks[scriptId];
    }
}