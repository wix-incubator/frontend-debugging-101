module.exports = {
    callNextFunc : callNextFuncImmediately
};

function callNextFuncImmediately(nextFunc){
    var startTime = new Date();
    function fib(index){return (index<=2) ? 1 : fib(index-1)+fib(index-2);}
        fib(30);
        nextFunc();
}