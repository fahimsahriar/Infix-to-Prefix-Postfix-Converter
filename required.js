let num,num2;
let con_id = 1;
let stack = [];
let result = [];
let braket = 0;
let input_method = 0;
let x = document.getElementById('upl');
var y = document.getElementById('frm1');
let z = document.getElementById('up_b');
x.style.display = 'none';
z.style.display = 'none';
//input method
document.getElementById('input_method').addEventListener('click', function() {
    go_reset();
    if(input_method==0){
        document.getElementById('input_m_text').innerHTML = 'Enter Expression';
        y.style.display = 'none';
        x.style.display = 'block';
        z.style.display = 'block';
        console.log("url");
        input_method++;
    }else{
        z.style.display = 'none';
        x.style.display = 'none';
        y.style.display = 'block';
        document.getElementById('input_m_text').innerHTML = 'Read .txt File';
        console.log("direct");
        input_method = 0;
    }
});

function my_main_function(){
    num = document.getElementById("in_fo").value;
        myFunction(num);
}

z.addEventListener('click', ()=>{
    go_reset();
    let files = x.files;
    if(files.length == 0){ 
        console.log('returning')
        return;

    }

    const file = files[0];

    let reader = new FileReader();

    reader.onload = (e) => {
        const fi = e.target.result;
        console.log(fi);
        myFunction(fi);
        //const lines = file.split(/\r/n|\n/);
    }
    //reader.onerror = (e) => alert(e.target.error.name);

    reader.readAsText(file);
});

//changing converter
document.getElementById('Change').addEventListener('click', function() {
	go_reset();
    if (con_id == 0) {
    	document.getElementById('converter').innerHTML = 'Infix to Prefix';
    	document.getElementById('in_fo').setAttribute("placeholder", "Enter Infix expression");  	
    	con_id++;
    }
    else{
    	document.getElementById('converter').innerHTML = 'Infix to Postfix';
    	document.getElementById('in_fo').setAttribute("placeholder", "Enter infix expression");
    	con_id = 0;
    }
});


//main_function_to_calculate_data
function myFunction(num){
    if(con_id == 0){
        for(var i =0;i<num.length;i++){
            if((num[i].charCodeAt()>96&&num[i].charCodeAt()<123)||(num[i].charCodeAt()>64&&num[i].charCodeAt()<91)){
                result+=num[i];
            }else{
                //conditons for parenthesis
                if(num[i]==')'){
                    for(var j=i;num[j]!='(';j--){
                        var temp = stack.pop();
                        if(temp=='('){
                            break;
                        }else{
                            result+=temp;
                        }    
                    }
                }else if(num[i]=='('){
                    stack.push('(');
                }
                else{   
                    while(stack.length != 0 && prec(num[i]) <= prec(stack[stack.length-1])) {
                        if(num[i]=='/'){
                            console.log(num[i]);
                        }
                        result += stack[stack.length - 1];
                        stack.pop();
                    }
                    stack.push(num[i]);
                }
            }
        }
        // Pop all the remaining elements from the stack
        while(stack.length != 0) {
            result += stack[stack.length - 1];
            stack.pop();
        }
        //publishing result
        document.getElementById('1st_result').innerHTML = result;
        document.getElementById('pub').innerHTML = 'Postfix Result: ';
    }else{
        //num = document.getElementById("in_fo").value;
        num = reverseString(num);
        for(var i =0;i<num.length;i++){
            if((num[i].charCodeAt()>96&&num[i].charCodeAt()<123)||(num[i].charCodeAt()>64&&num[i].charCodeAt()<91)){
                result+=num[i];
            }else{
                //conditons for parenthesis
                if(num[i]==')'){
                    for(var j=i;num[j]!='(';j--){
                        var temp = stack.pop();
                        if(temp=='('){
                            break;
                        }else{
                            result+=temp;
                        }    
                    }
                }else if(num[i]=='('){
                    stack.push('(');
                }
                else{   
                    while(stack.length != 0 && prec(num[i]) <= prec(stack[stack.length-1])) {
                        if(num[i]=='/'){
                            console.log(num[i]);
                        }
                        result += stack[stack.length - 1];
                        stack.pop();
                    }
                    stack.push(num[i]);
                }
            }
        }
        // Pop all the remaining elements from the stack
        while(stack.length != 0) {
            result += stack[stack.length - 1];
            stack.pop();
        }
        result = reverseString(result);
        document.getElementById('pub').innerHTML = 'Prefix Result: ';
        document.getElementById('1st_result').innerHTML = result;
    }
}


//reset
document.getElementById('reset').addEventListener('click', go_reset);
function go_reset(){
    document.getElementById('in_fo').value = '';
    document.getElementById('1st_result').innerHTML = '';
    stack = [];
    result = [];
}
// program to reverse a string
function reverseString(str) {

    // empty string
    let newString = "";
    for (let i = str.length - 1; i >= 0; i--) {
        if(str[i]=='('){
            newString += ')';  
        }else if(str[i]==')'){
            newString += '(';
        }else{
            newString += str[i];
        }
    }
    return newString;
}
//Function to return precedence of operators
function prec(c) {
    if(c == '^')
        return 3;
    else if(c == '/' || c=='*')
        return 2;
    else if(c == '+' || c == '-')
        return 1;
    else
        return -1;
}
