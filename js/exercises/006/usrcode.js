module.exports = {
    callNextFunc : callNextFuncImmediately
};

function callNextFuncImmediately(nextFunc){
    var startTime = new Date();
    while(new Date() - startTime < 1000){ /* do nothing */ }
    nextFunc();
}