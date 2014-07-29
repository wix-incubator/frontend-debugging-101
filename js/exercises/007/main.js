var async = require('async');
var usrCode = require('./usrcode');
var createPasscodeInputsSrc = usrCode.createPasscodeInputs;

module.exports = {
    restart      : restart,
    reset        : reset,
    name         : 'scope var override',
    subtitle     : '',
    instructions : 'keypad creation code\n is broken.\n fix it\n and enter \nsecret passcode \n(1234)'

};

function restart(stage, env){
    env.clog.log('set isOn on both buttons to continue');

    stage.innerHTML = '' +
        '<button class="btn btn-default btn-lg" type="button" id="btn" style="position: absolute; left: 10px; top: 10px;">create keypad</button>' +
        '<div style="position: absolute;top: 95px;left: 0;right: 0;display: flex;align-items: center;justify-content: center;">' +
        '   <div id="input-result" style="height:48px;border: 5px solid #fc0;border-radius: 30px;width: 100px;box-shadow: 5px 5px 10px #050505;color: #fc0;font-weight: bolder;font-size: 20px;padding: 5px;"></div>' +
        '   <button class="btn btn-default" type="button" id="enterPassBtn" style="margin-left:10px">enter</button>' +
        '</div>' +
        '<div id="passcode" style="width: 150px;position: absolute;bottom: 10px;left: calc(50% - 75px);" style="position: absolute; right: 111px; bottom: 10px;"></div>';

    var buttonNode = stage.querySelector('#btn');
    var passcodeWrapper = stage.querySelector('#passcode');
    var inputResult = stage.querySelector('#input-result');
    var enterPassBtn = stage.querySelector('#enterPassBtn');

    var createPasscodeInputsStr = env.getData('createPasscodeInputsSrc') || createPasscodeInputsSrc.toString();


    env.code.create(createPasscodeInputsStr, {}, function(err, createPasscodeInputs){

        env.codeWatcher.watchCode(createPasscodeInputs, function(func, newVal, oldVal){
            env.saveData('createPasscodeInputsSrc', newVal);
        });

        function inputKey(keyValue) {
            inputResult.innerHTML += keyValue;
        }

        buttonNode.addEventListener('click', function buttonClicked(event){
            createPasscodeInputs(passcodeWrapper, inputKey);
        });

        enterPassBtn.addEventListener('click', function(){
            if(inputResult.innerHTML === '1234'){
                env.finishLevel(true);
            } else {
                env.clog.error('wrong password... try again...');
            }
            inputResult.innerHTML = '';
        })

    });

}

function reset(stage, env){
    env.removeData('createPasscodeInputsSrc');
}