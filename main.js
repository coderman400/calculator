//DOM ELEMENTS
const expression = document.querySelector('#expression');
const result = document.querySelector('#result');
const button = document.querySelectorAll('div#bottom>*');
const clear = document.querySelector('#C');

let add =(a,b)=> a+b;
let subtract = (a,b)=>a-b;
let multiply = (a,b)=>a*b;
let divide = (a,b)=>a/b;

let first;
let second;
let operator;

console.log(button);
expression.value="";
let str;
for(var inp of button){
    inp.addEventListener("click", write);
}

function write(){
    expression.value = expression.value.concat(this.innerHTML);
}

clear.addEventListener("click", function(){
    expression.value = "";
})
function operate(first,second,operator){};

