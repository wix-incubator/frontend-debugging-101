var async = require('async');
var usrCode = require('./usrcode');
var callNextFuncSrc = usrCode.callNextFunc;

module.exports = {
    restart      : restart,
    reset        : reset,
    name         : 'do nothing machine async',
    subtitle     : 'slow code..',
    instructions : 'try finding\n the slow code (2)'

};

function restart(stage, env){

    stage.classList.add('center-con');
    stage.innerHTML = '' +
        '<button class="btn btn-default btn-lg" type="button" id="btn">chain reaction</button>';

    var buttonNode = stage.querySelector('#btn');

    var callNextFuncStr = env.getData('callNextFuncSrc') || callNextFuncSrc.toString();


    env.code.create(callNextFuncStr, {}, function(err, callNextFunc){

        env.codeWatcher.watchCode(callNextFunc, function(func, newVal, oldVal){
            env.saveData('callNextFuncSrc', newVal);
        });

        var clickTime = null;

        function callFinish(){
            if(new Date()-clickTime < 10){
                env.finishLevel(true);
            } else {
                env.clog.error('it took too much time. better luck next time.');
            }
            clickTime = null;
        }

        var prevFunc = callFinish;
        for(var i = 0; i < 500; i++){
            if(i !== 250) {
                prevFunc = function(callNext, index){
                    setTimeout(callNext, 0);
                }.bind(null, prevFunc, i)
            } else {
                prevFunc = callNextFunc.bind(null, prevFunc, i);
            }
        }

        buttonNode.addEventListener('click', function buttonClicked(event){
            clickTime = new Date();
            prevFunc();
        });

    });

}

function reset(stage, env){
    env.removeData('callNextFuncSrc');
}