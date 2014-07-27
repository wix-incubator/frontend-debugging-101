var async = require('async');

module.exports = {
    restart      : restart,
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

    async.parallel({
        one: function(callback){
            env.code.create(code1.toString(), { name:'ONE' }, callback);
        },
        two: function(callback){
            env.code.create(code2.toString(), { name:'TWO' }, callback);
        }
    },
    function(err, results) {
        buttonNode.addEventListener("click", function(){
            results.one(results.two, function(){
                env.finishLevel(true);
            });
        });
    });
}