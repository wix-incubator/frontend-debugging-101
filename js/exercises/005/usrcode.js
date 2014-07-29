module.exports = {
    func1 : code1
};

function code1(btnNode){
    btnNode.addEventListener('click', function(event){
        event.preventDefault();
    });
}