var async = require('async');
var usrCode = require('./usrcode');
var sourceFunc1 = usrCode.func1;
var sourceFunc2 = usrCode.func2;

module.exports = {
    restart      : restart,
    reset        : reset,
    name         : 'public field',
    subtitle     : 'something is changing your fields',
    instructions : ''

};

function restart(stage, env){
    env.clog.log('set isOn on both buttons to continue');

    stage.classList.add('center-con');
    stage.innerHTML = '' +
        '<button class="btn btn-default btn-lg" type="button" id="btn1" style="margin:66px;">click 1</button>' +
        '<button class="btn btn-default btn-lg" type="button" id="btn2" style="margin:47px;">click 2</button>';

    var button1Node = stage.querySelector('#btn1');
    var button2Node = stage.querySelector('#btn2');

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

        var localEnv = {btn1:false, btn2:false};

        var finishIfBothButtonsAreOn = function(){
            if(button1Node.status === 'go' && button2Node.status === 'go'){
                env.finishLevel(true);
            } else {
                if(button1Node.status !== 'go'){
                    env.clog.error('click 1 button status is "stop"');
                }
                if(button2Node.status !== 'go'){
                    env.clog.error('click 2 button status is "stop"');
                }
            }
        };



        button1Node.addEventListener("click", results.one.bind(button1Node, finishIfBothButtonsAreOn));
        button2Node.addEventListener("click", results.one.bind(button2Node, finishIfBothButtonsAreOn));

        button1Node.addEventListener("mouseover", results.two.bind(button1Node, button2Node));
        button2Node.addEventListener("mouseover", results.two.bind(button2Node, button1Node));
    });
}

function reset(stage, env){
    env.removeData('code1');
    env.removeData('code2');
}