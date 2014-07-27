var sourceFunc = require('./usrcode').func1;

module.exports = {
    restart      : restart,
    reset        : reset,
    name         : 'check for this',
    subtitle     : 'scoping',
    instructions : 'Click the button to pass (2)',
    working      : false
};

function restart(stage, env){
    env.clog.log('Click the button to pass');

    var val1 = Math.round(Math.random() * 10);
    var val2 = Math.round(Math.random() * 10);

    stage.innerHTML = '' +
        '<input type="text" value="' + val1 + '" disabled="true" id="input1">' +
        '<span> + </span>' +
        '<input type="text" value="' + val2 + '" disabled="true" id="input2">' +
        '<span> = </span>' +
        '<input type="text" value="?" id="resultInput">' +
        '<br/>' +
        '<button class="btn btn-default btn-lg" type="button">calculate result!</button>';

    var buttonNode = stage.querySelector('button');
    var resultInput = stage.querySelector('#resultInput');
    var input1 = stage.querySelector('#input1');
    var input2 = stage.querySelector('#input2');

    var codeStr = env.getData('code') || sourceFunc.toString();

    env.code.create(codeStr,
        {},
        function(err, scriptCode){

            env.codeWatcher.watchCode(scriptCode, function(func, newVal, oldVal){
                env.saveData('code', newVal);
            });

            var getResultFunc = scriptCode(input1, input2);

            buttonNode.addEventListener("click", function(event){
                var result = getResultFunc(null, null);
                var passed = (result === parseInt(input1.value) + parseInt(input2.value));
                env.finishLevel(passed);
            });

        }
    );
}

function reset(stage, env){
    env.removeData('code');
}