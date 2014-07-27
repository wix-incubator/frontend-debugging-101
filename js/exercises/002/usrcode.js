module.exports = {
    func1 : code
};

function code(valInput1, valInput2){
    return function getResult(valInput1, valInput2){
        return parseInt(valInput1.value) + parseInt(valInput2.value);
    }
}