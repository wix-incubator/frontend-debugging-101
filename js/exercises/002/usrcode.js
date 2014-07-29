module.exports = {
    func1 : code
};


function code(){

    var CallMeLaterClass = function(finishCallback){
        this.finishCallback = finishCallback;
    };

    CallMeLaterClass.prototype = {

        constructor: CallMeLaterClass,

        callMeLaterToFinish: function(delayTime){

            setTimeout(function(){

                this.finishCallback();

            }, delayTime);

        }

    };

    return CallMeLaterClass;

}