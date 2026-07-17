function isOperator(symb : string){
  const operators:string[] = ['/','*','-','+'];
  return operators.includes(symb);
};

const getFontSize = (text: string) => {
    const maxSize = 40;
    const minSize = 10;
    const maxChars = 12;

    return Math.max(
        minSize,
        maxSize * Math.min(1, maxChars / text.length)
    );
};

const checkSyntax = (exp : string, symb : ButtonDesc) =>{
  var symbIsNotNum = (symb.type == 'operator')? true : false;
  if(exp.length == 0 && symbIsNotNum){
    return exp;
  }
  if(isOperator(exp.charAt(exp.length-1)) && symbIsNotNum){
    exp = exp.slice(0,exp.length-1) + symb.text;
    return (exp);
  }
  const parts = exp.split(/[+\-*/]/);
  const currentNumber = parts[parts.length - 1];
  if(symb.text === '.'){
    if (currentNumber.includes('.')) {
      return exp;
    }

    if (currentNumber === '' || isOperator(exp.charAt(exp.length-1))) {
      return exp + '0.';
    }
  }
  if(symb.text === '%'){
    if(exp.includes('e')){
      return(exp);
    }
    return exp.slice(0, exp.lastIndexOf(currentNumber)) + String(Number(currentNumber) / 100);
  }
  if(symb.text === "√"){
    return exp.slice(0, exp.lastIndexOf(currentNumber)) + String(Number(currentNumber) ** 0.5);
  }
  return(exp + symb.text);
};

function calculate(exp : string){
  if(isOperator(exp.charAt(exp.length-1))){
    return String(eval(exp.slice(0, exp.length-1)));
  }
  if(exp.length == 0){
    return exp;
  }
  return String(eval(exp));
}



export {isOperator,getFontSize,checkSyntax,calculate};