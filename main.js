//DOM ELEMENTS
const expression = document.querySelector('#expression');
const result = document.querySelector('#result');
const num = document.querySelectorAll('div#bottom>.num');
const operator = document.querySelectorAll('div#bottom>.op');
const equal = document.querySelector('.eq')
const clear = document.querySelector('#C');
const back = document.querySelector('#back');
let add =(a,b)=> a+b;
let subtract = (a,b)=>a-b;
let multiply = (a,b)=>a*b;
let divide = (a,b)=>a/b;

//CLEAR 
clear.addEventListener("click", function(){
    expression.value = "";
})
//BACKSPACE
back.addEventListener("click", function(){
    expression.value = expression.value.slice(0,-1);
})
for(var inp of num){
    inp.addEventListener("click", write);
}
for(var inp of operator){
    inp.addEventListener("click", writeop);
}
//function on num click
function write(){
    expression.value = expression.value.concat(this.innerHTML);
}
//function on op click
oparray = ["+","-","÷","x"];
pattern = /\.+/;
function writeop(){
    //string should not be empty
    if (expression.value==""){
        return;
    }
    //last element should not be operator
    if (oparray.includes(expression.value.slice(-1))){
        return;
    }
    //no more than 1 dot
    if (pattern.test(expression.value) && this.innerHTML=='.'){
        return;
    }
    expression.value = expression.value.concat(this.innerHTML);
}
function operate(first,second,operator){};

