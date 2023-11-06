//DOM ELEMENTS
const expression = document.querySelector('#expression');
const result = document.querySelector('#result');
const num = document.querySelectorAll('div#bottom>.num');
const operator = document.querySelectorAll('.op');
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

//loops to add click listeners for buttons
for(var inp of num){
    inp.addEventListener("click", write);
}
for(var inp of operator){
    inp.addEventListener("click", writeop);
}

//function on num click
function write(){
    if(expression.value.slice(-1)==')'){
        return;
    }
    expression.value = expression.value.concat(this.innerHTML);
}
//function on op click
oparray = ["+","-","÷","x"];
dotpattern= /\.+/;
flag=0;
function writeop(){
    last= expression.value.slice(-1);
    current = this.innerHTML
    //string should not be empty
    if (expression.value==""){
        return;
    }
    //last element should not be operator or (
    if ((oparray.includes(last) && current!='(' && current!=')' )|| last=="("){
        return;
    }
    if(!oparray.includes(last) && current=='('){
        current='x(';
        flag+=1;
    }
    //no more than 1 dot
    if ((dotpattern.test(expression.value) && current=='.' )||(current=='.' && last==')')){
        return;
    }
    if (current == '('){
        flag+=1;
    }
    if(current == ')'){
        if(flag==0 || oparray.includes(last)){
            return;
        }
        flag-=1;
    }
    expression.value = expression.value.concat(current);
}

//stack
stack = [];

//function on equal click
equal.addEventListener("click",operate);
function operate(){
    
}


