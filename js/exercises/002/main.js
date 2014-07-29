var sourceFunc = require('./usrcode').func1;

module.exports = {
    restart      : restart,
    reset        : reset,
    name         : 'click & wait',
    subtitle     : 'check for this',
    instructions : 'another error?\n check for this',
    working      : false
};

function restart(stage, env){

    stage.classList.add('center-con');

    stage.innerHTML = '' +
        '<button class="btn btn-default btn-lg" type="button">click..</button>';

    var buttonNode = stage.querySelector('button');

    var codeStr = env.getData('code') || sourceFunc.toString();

    env.code.create(codeStr,
        {},
        function(err, scriptCode){

            env.codeWatcher.watchCode(scriptCode, function(func, newVal, oldVal){
                env.saveData('code', newVal);
            });

            var CallLaterClass = scriptCode();

            var clickTime = null;

            var callLaterIns = new CallLaterClass(function finishCallback(){
                if(clickTime && (new Date()-clickTime > 80)){
                    env.finishLevel(true);
                } else {
                    env.clog.error('something is wrong :-/');
                }
            });

            buttonNode.addEventListener('click', function(){
                clickTime = new Date();
                callLaterIns.callMeLaterToFinish(100);
                setTimeout(function(){ // clear click time for safety..
                    clickTime = null;
                }, 200);
            });

        }
    );
}

function reset(stage, env){
    env.removeData('code');
}