var async = require('async');

module.exports = {
    restart      : restart,
    reset        : reset,
    name         : 'how did I get here?',
    subtitle     : '',
    instructions : ''

};

function restart(stage, env){
    env.clog.log('Click the button to pass');

    stage.classList.add('center-con');
    stage.innerHTML = '' +
        '<button class="btn btn-default btn-lg" type="button">async</button>';

    var buttonNode = stage.querySelector('button');

    function code1(code2, finishCB){
        finishCB = console.log.bind(console, 'this is not the right callback!?!');
        setTimeout(code2, 10, finishCB);
    }

    function code2(finishCB){
        finishCB();
    }

    var code1Str = env.getData('code1') || code1.toString();
    var code2Str = env.getData('code2') || code2.toString();

    async.parallel({
        one: function(callback){
            env.code.create(code1Str, { name:'ONE' }, callback);
        },
        two: function(callback){
            env.code.create(code2Str, { name:'TWO' }, callback);
        }
    },
    function(err, results) {

        env.codeWatcher.watchCode(results.one, function(func, newVal, oldVal){
            env.saveData('code1', newVal);
        });
        env.codeWatcher.watchCode(results.two, function(func, newVal, oldVal){
            env.saveData('code2', newVal);
        });

        buttonNode.addEventListener("click", function(){
            results.one(results.two, function(){
                env.finishLevel(true);
            });
        });
    });
}

function reset(stage, env){
    env.removeData('code1');
    env.removeData('code2');
}