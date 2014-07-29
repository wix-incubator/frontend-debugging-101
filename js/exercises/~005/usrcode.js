module.exports = {
    func1 : code1,
    func2 : code2
};

function code1(finishIfBothButtonsAreOn){
    console.log('code1 set status go for', this);
    this.status = 'go';
    finishIfBothButtonsAreOn()
}

function code2(otherBtn){
    console.log('code2 set status stop for', otherBtn);
    otherBtn.status = 'stop';
}