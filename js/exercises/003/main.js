module.exports = {
    restart      : restart,
    name         : 'someone is touching my dom!',
    subtitle     : '',
    instructions : 'Click the button to pass (2)'

};

function restart(stage, env){
    env.clog.log('Click the button to pass');

    stage.innerHTML = '' +
        '<button class="btn btn-default btn-lg" type="button">catch me if you can</button>';

    var buttonNode = stage.querySelector('button');

    function code(button){
        button.style.position = 'absolute';
        if(button.style.left) {
            button.style.top = null;
            button.style.left = null;
            button.style.right = '20px';
            button.style.bottom = '20px';
        } else {
            button.style.right = null;
            button.style.bottom = null;
            button.style.top = '20px';
            button.style.left = '20px';
        }
    }

    env.code.create(code.toString(),
        {},
        function(err, publicScript){

            publicScript(buttonNode);

            buttonNode.addEventListener('mouseover', publicScript.bind(null, buttonNode));

            buttonNode.addEventListener("click", function(){
                env.finishLevel(true);
            });

        }
    );
}