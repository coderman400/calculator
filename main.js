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
let resultnum;
//CLEAR 
clear.addEventListener("click", function(){
    expression.value = "";
    result.value = "";
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
oppattern = /\+|-|÷|x/;
dotpattern= /\.+/;
flag=0;

function writeop(){
    last= expression.value.slice(-1);
    current = this.innerHTML
    //string should not be empty
    if (expression.value==""){
        if(current =='('){
            expression.value = expression.value.concat(current);
            flag+=1;
        }
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
    if ((current=='.' && last==')')){
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
    //allow multiple numbers to be decimals
    if (current =='.' && expression.value.lastIndexOf('.')!=-1){
        if(!oppattern.test(expression.value.slice(expression.value.lastIndexOf('.'),-1))){
            return;
        }
    }
    expression.value = expression.value.concat(current);
}

//check if number
function isNumeric(num){
    return !isNaN(num)
  }
function precedence(operator){
    if(['÷','x'].includes(operator)){
        return 1;
    }else{
        return 0;
    }
}
function calculate(a,b,operator){
    console.log("a,op,b -> ",a,operator,b);
    switch(operator){
        case '+': 
            resultnum = a+b;
            break;
        case '-':
            resultnum = a-b;
            break;
        case 'x':
            resultnum = a*b;
            break;
        case '÷':
            resultnum = a/b;
            break;
    }
    return resultnum;
}
//function on equal click
equal.addEventListener("click",operate);
function operate(){
    ostack=[]
    nstack=[]
    exp = expression.value;
    if (flag!=0){
        result.value =("BRACKETS INVALID");
        return;
    }
    length = exp.length;
    number="";
    for(let i=0; i<length; i++){
        if(exp[i]===undefined){
            continue;
        }
        //if number, push to nstack
        while(isNumeric(exp[i]) || exp[i]=='.'){
            number = number.concat(exp[i]);
            i+=1;
        }
        nstack.push(+number);
        number=""
        //if operand, check if empty (push if yes)
        if(!isNumeric(exp[i])){
            if(exp[i] === undefined){
                continue;
            }
            if(ostack.length==0){
                ostack.push(exp[i]);
                continue;
            }else{
                //if ( push, if ) pop until (
                if(exp[i]=='('){
                    ostack.push(exp[i]);
                    continue;
                }else if(exp[i]==')'){
                    while(ostack[ostack.length-1]!='('){
                        b = nstack.pop();
                        a = nstack.pop();
                        opr = ostack.pop();
                        nstack.push(calculate(a,b,opr));
                    }
                    ostack.pop();
                    continue;
                }
                //else check precedence with top
                //if currents precedence >= top then push
                if(precedence(exp[i])>precedence(ostack[ostack.length-1])){
                    ostack.push(exp[i]);
                }else{
                //else pop until above is satisfied
                    counter=1;
                    while(precedence(exp[i])<=precedence(ostack[ostack.length-1]) && ostack.length!=0){
                        counter++;
                        b = nstack.pop();
                        a = nstack.pop();
                        opr = ostack.pop();
                        nstack.push(calculate(a,b,opr));
                        console.log("JUST PUSHED ",nstack[nstack.length-1]);
                    }
                    ostack.push(exp[i]);
                }
            }
        }
        console.log("ostack = ",ostack);
        console.log("nstack = ",nstack);
    }
    console.log("before loop ostack is ", ostack);
    while(ostack.length!=0){
        b = nstack.pop();
        a = nstack.pop();
        opr = ostack.pop();
        nstack.push(calculate(a,b,opr));
        console.log("JUST PUSHED ",nstack[nstack.length-1]);
    }
    result.value = resultnum;
}


