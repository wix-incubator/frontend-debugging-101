module.exports = {
    restart      : restart,
    name         : 'console error',
    subtitle     : 'let the console show you where',
    instructions : 'Click the button to pass'
};

function restart(stage, env){
    env.clog.log('Click the button to pass');

    stage.classList.add('center-con');
    stage.innerHTML = '<button class="btn btn-default btn-lg" type="button">click to pass!</button>';

    var button = stage.firstChild;

    function code(buttonNode, passClickEventToFinishCB){
        buttonNode.addEventListener("click", function(event){
            passClickEventToFinishCB(even);
         });
    }

    env.code.create(code.toString(),
        {},
        function(err, scriptCode){

            scriptCode(button, function passClickEventToFinishCB(event){
                var passed = (event instanceof MouseEvent && event.target === button);
                env.finishLevel(passed);
            });

        }
    );
}