import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { CircButton } from './src/components/circButton';
import { useState } from 'react';

interface ButtonDesc{
  text: string,
  type:
        | "number"
        | "operator"
        | "clear"
        | "delete"
        | "equals"
}

const buttons:ButtonDesc[][] = [
  [{text: 'AC', type: 'clear'}, {text: 'DEL', type: 'delete'}, {text: '%', type: 'operator'}, {text: '√', type: 'operator'}],
  [{text: '7', type: 'number'},{text: '8', type: 'number'},{text: '9', type: 'number'}, {text: '/', type: 'operator'}],
  [{text: '4', type: 'number'},{text: '5', type: 'number'},{text: '6', type: 'number'}, {text: '*', type: 'operator'}],
  [{text: '1', type: 'number'},{text: '2', type: 'number'},{text: '3', type: 'number'}, {text: '-', type: 'operator'}],
  [{text: '.', type: 'operator'},{text: '0', type: 'number'}, {text: '=', type: 'equals'}, {text: '+', type: 'operator'}]
];

function isOperator(symb : string){
  const operators:string[] = ['/','*','-','+'];
  return operators.includes(symb);

}

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


}


function calculate(exp : string){
  if(isOperator(exp.charAt(exp.length-1))){
    return String(eval(exp.slice(0, exp.length-1)));
  }
  if(exp.length == 0){
    return exp;
  }
  return String(eval(exp));
}



export default function App() {
  const [exp, setExp] = useState('');
  const fontsizerel = getFontSize(exp);
  const styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor: '#2B2B2B',
      alignItems: 'center',
      justifyContent: 'space-evenly', 
    },
    buttonsView:{
      flex:10,
      alignItems: 'center',
      gap:15
    },
    buttonsRow:{

      flexDirection:'row',
      gap:15
    },
    topMenu:{
      flex:1.5,
      width:310,
      marginTop: 35,
      marginRight:20,
      marginLeft:20,
      backgroundColor:'#212121',
      borderRadius: 100,
    },
    text:{
      flex:1.2,
      alignSelf:'flex-end',
      marginRight:20,
      marginLeft:20,
      marginTop:190,
      marginBottom: 20,
      color: 'white',
      fontSize: fontsizerel,
    }
  });
  const handleButtonPress = (button: ButtonDesc, prev : string) => {
    try{
      switch (button.type) {
        case "clear":
            setExp("");
            break;

        case "delete":
            setExp(prev => prev.slice(0, -1));
            break;

        case "equals":
            setExp(calculate(exp));
            break;

        case "number":
        case "operator":
            setExp(prev => checkSyntax(prev, button));
            break;
        }
    }
    catch (e){
      setExp('Error has occured')
    }
};
  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent"/>

      <View style= {styles.topMenu}>

      </View>

      <Text style= {styles.text}>{exp}</Text>
      <View style={styles.buttonsView}>
        {
          buttons.map((buttrow : ButtonDesc[], key: number) => 
            <View style = {styles.buttonsRow} key = {key}>
              {
                buttrow.map((butt: ButtonDesc, key: number) => <CircButton text={butt.text} key={key} textSize={30} buttonSize={70} color = {'#212121'} onPress={() => handleButtonPress(butt, exp)}/>)
              }
            </View> 
          )
        }
      </View>
      
      
    </View>
  );
  
}


