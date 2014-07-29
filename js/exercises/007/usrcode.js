module.exports = {
    createPasscodeInputs : createPasscodeInputs
};

function createPasscodeInputs(containerNode, inputKey){
    console.log('  creating keys  -->  click to go to code  -->');

    containerNode.innerHTML = '';

    var inputKeys = [1,2,3,4,5,6,7,8,9,0];

    for(var i = 0; i < inputKeys.length; ++i){
        var keyValue = inputKeys[i];
        var keyNode = document.createElement('span');
        keyNode.classList.add('key-btn');
        keyNode.innerHTML = keyValue;
        containerNode.appendChild(keyNode);
        keyNode.addEventListener('click', function(){
            inputKey(keyValue);
        });
    }

}