const size = document.querySelector('#size');
const paintBody = document.querySelector('.paint-body');
const maxSize = document.querySelector('.select-max-size');

let sizeValue = size.value;
let mouseClick = false;

createField();

size.addEventListener('keyup',createField);

function createField() {
    
    sizeValue = size.value;

    maxSizeWarn()

    if(sizeValue < 151){
        paintBody.style.setProperty('--size', 150);

        while (paintBody.firstChild) {
            paintBody.removeChild(paintBody.firstChild);
        };

        let childsArray = arrayOfChilds(sizeValue);
    
        createChilds(childsArray);
    }

};


paintBody.addEventListener('mousemove', paintingCheck);
paintBody.addEventListener('mousedown', function(event) {
    mouseClick = true;
    paintingCheck(event);
});
paintBody.addEventListener('mouseup', function() {
    mouseClick = false;
});

function paintingCheck(event) { 
    let target = event.target;
    

    if(target.className === 'paint-body') return;
    painting(target);
};

function painting(tgt){
    let color = document.querySelector('#color').value;
     
    if(!mouseClick) return;

    tgt.style.background = color;
    
};

function createChilds(arr) {
    
    for (let i=0 ; i < arr.length; i++){   
        let createChild = document.createElement("div");

        if(arr[i] === 'g') {
            createChild.classList.add('paint-body-child-gray');
        } else {
            createChild.classList.add('paint-body-child-white');
        };

        paintBody.append(createChild);
    };
};

function arrayOfChilds(size) {

    paintBody.style.setProperty('--size', size);

    let arr = [];
    let reverseArr = [];
    let resultArr =[];

    for (let i = 0; i < size; i++) {

        if(i % 2) {
            arr.push('g');
        } else {
            arr.push('w');
        };
    };

    reverseArr = [...arr];
    reverseArr.shift();

    if(arr[arr.length - 1] === 'w') {
        reverseArr.push('g');
    } else {
        reverseArr.push('w');
    };

    for(let i = 0; i < size; i++) {
        if(i % 2){
            resultArr = resultArr.concat(reverseArr);
        } else {
            resultArr = resultArr.concat(arr);
        };

    };

    return resultArr
}

function maxSizeWarn() {
    if(sizeValue > 150) {
        maxSize.style.setProperty('display', 'block');
        return
    };

    maxSize.style.setProperty('display', 'none');
} 