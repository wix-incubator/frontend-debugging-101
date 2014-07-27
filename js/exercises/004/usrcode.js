module.exports = {
    func1 : code1,
    func2 : code2
};

function code1(code2, finishCB){
    finishCB = console.log.bind(console, 'this is not the right callback!?!');
    setTimeout(code2, 10, finishCB);
}

function code2(finishCB){
    finishCB();
}