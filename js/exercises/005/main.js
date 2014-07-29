var async = require('async');
var usrCode = require('./usrcode');
var sourceFunc1 = usrCode.func1;

module.exports = {
    restart      : restart,
    reset        : reset,
    name         : 'prevented',
    subtitle     : 'preventDefault()',
    instructions : "find the listener\n that called prevent\n default on your event"

};

function restart(stage, env){

    stage.classList.add('center-con');
    stage.innerHTML = '' +
        '<button class="btn btn-default btn-lg" type="button" id="btn">listeners</button>';

    var buttonNode = stage.querySelector('#btn');

    var code1Str = env.getData('code1') || sourceFunc1.toString();


    env.code.create(code1Str, {}, function(err, code1){

        env.codeWatcher.watchCode(code1, function(func, newVal, oldVal){
            env.saveData('code1', newVal);
        });

        code1(buttonNode); // listen to click and prevent default

        buttonNode.addEventListener('click', function finishIfEventIsNotPrevented(event){
            if(!event.defaultPrevented){
                env.finishLevel(true);
            } else {
                env.clog.error('prevent default on event was called..');
            }
        });

    });

}

function reset(stage, env){
    env.removeData('code1');
}