var sourceFunc = require('./usrcode').func1;

module.exports = {
    restart      : restart,
    reset        : reset,
    name         : 'console error',
    subtitle     : 'let the console show you where',
    instructions : 'Click the button to pass'
};

function restart(stage, env){
    env.clog.log('Click the button to pass');

    stage.classList.add('center-con');
    stage.innerHTML = '<button class="btn btn-default btn-lg" type="button">click to pass!</button>';

    var button = stage.firstChild;

    var codeStr = env.getData('code') || sourceFunc.toString();

    env.code.create(codeStr,
        {},
        function(err, scriptCode){

            env.codeWatcher.watchCode(scriptCode, function(func, newVal, oldVal){
                env.saveData('code', newVal);
            });

            scriptCode(button, function passClickEventToFinishCB(event){
                var passed = (event instanceof MouseEvent && event.target === button);
                env.finishLevel(passed);
            });

        }
    );
}

function reset(stage, env){
    env.removeData('code');
}