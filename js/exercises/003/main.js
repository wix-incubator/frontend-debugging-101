var sourceFunc = require('./usrcode').func1;

module.exports = {
    restart      : restart,
    reset        : reset,
    name         : 'someone is touching my dom!',
    subtitle     : '',
    instructions : 'all you need\n to do is\n click the button :)'

};

function restart(stage, env){

    stage.innerHTML = '' +
        '<button class="btn btn-default btn-lg" type="button">catch me if you can</button>';

    var buttonNode = stage.querySelector('button');

    var codeStr = env.getData('code') || sourceFunc.toString();

    env.code.create(codeStr,
        {},
        function(err, scriptCode){

            env.codeWatcher.watchCode(scriptCode, function(func, newVal, oldVal){
                env.saveData('code', newVal);
            });

            scriptCode(buttonNode);

            buttonNode.addEventListener('mouseover', scriptCode.bind(null, buttonNode));

            buttonNode.addEventListener("click", function(){
                env.finishLevel(true);
            });

        }
    );
}

function reset(stage, env){
    env.removeData('code');
}