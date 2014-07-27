module.exports = {
    func1 : code
};

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