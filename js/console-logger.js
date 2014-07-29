"use strict";

module.exports = {
    log          : log,
    instructions : instructions,
    info         : info,
    error        : error
};

function info(msg, options){
    console.info(msg);
}

function log(msg, options){
    console.log(msg);
}

function error(msg, options){
    console.warn(msg);
}

function instructions(msg){
    var options = {
        border: 1,
        padding: 1,
        charsInLine: 25,
        frameChar: '*',
        frameStyle: 'color:#FFFFFF; background-color:#000000; font-family:monospace; font-size:20px; line-height:18px;',
        padChar: ' ',
        padStyle: 'color:#FFFFFF; background-color:#000000; font-family:monospace; font-size:20px; line-height:18px;',
        contentStyle: 'color:#FFFFFF; background-color:#000000; font-family:monospace; font-size:20px; line-height:18px;'
    };
    var i;

    printFrameLine(options);
    for(i = 0; i < options.padding.length; ++i) { printLine('', options) }

    while(msg.length){
        msg = printLine(msg, options);
    }

    for(i = 0; i < options.padding.length; ++i) { printLine('', options) }
    printFrameLine(options);
}

function printFrameLine(options){
    var line = '%c' + createStrFromChar(options.frameChar, options.charsInLine);
    console.log(line, options.frameStyle);
}

function printLine(content, options) {
    var charsLeftForContent = options.charsInLine - ((options.border + options.padding)*2);

    content = content.trim();
    var nextBreakLineIndex = content.indexOf('\n');
    var lineContent = (nextBreakLineIndex != -1) ? content.substr(0, nextBreakLineIndex) : content.slice(0, charsLeftForContent);
    var leftOverContent = (nextBreakLineIndex != -1) ? content.substr(nextBreakLineIndex) : content.substr(charsLeftForContent);

    var borderStr = createStrFromChar(options.frameChar, options.border);
    var paddingStr = createStrFromChar(options.padChar, options.padding);
    var contentStr = lineContent.trim();
    if(charsLeftForContent > contentStr.length){
        var missingSpace = createStrFromChar(' ', charsLeftForContent-contentStr.length);
        contentStr = missingSpace.substr(0, missingSpace.length/2) + contentStr + missingSpace.substr(missingSpace.length/2);
    }

    var line = '%c' + borderStr + '%c' + paddingStr + '%c' + contentStr + '%c' + paddingStr + '%c' + borderStr;

    console.log(line, options.frameStyle, options.padStyle, options.contentStyle, options.padStyle, options.frameStyle);

    return leftOverContent;
}

function createStrFromChar(char, amount) {
    var str = '';
    for(var i = 0; i < amount; ++i) {
        str += char;
    }
    return str;
}