var async = require('async');
var usrCode = require('./usrcode');
var sourceFunc1 = usrCode.func1;
var sourceFunc2 = usrCode.func2;

module.exports = {
    restart      : restart,
    reset        : reset,
    name         : 'how did I get here?',
    subtitle     : 'asynchronous stack..',
    instructions : 'you have the wrong\n callback.\n find the code \nthat passed it.'

};

function restart(stage, env){

    stage.classList.add('center-con');
    stage.innerHTML = '' +
        '<button class="btn btn-default btn-lg" type="button">async</button>';

    var buttonNode = stage.querySelector('button');

    var code1Str = env.getData('code1') || sourceFunc1.toString();
    var code2Str = env.getData('code2') || sourceFunc2.toString();

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