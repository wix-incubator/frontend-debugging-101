module.exports = {
    func1 : code
};

function code(buttonNode, passClickEventToFinishCB){
    buttonNode.addEventListener("click", function(event){
        passClickEventToFinishCB(even);
    });
}