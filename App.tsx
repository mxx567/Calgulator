import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
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
    [{text: 'AC', type: 'clear'}, {text: 'DEL', type: 'delete'}, {text: '%', type: 'operator'}],
    [{text: '7', type: 'number'},{text: '8', type: 'number'},{text: '9', type: 'number'}, {text: '/', type: 'operator'}],
    [{text: '4', type: 'number'},{text: '5', type: 'number'},{text: '6', type: 'number'}, {text: '*', type: 'operator'}],
    [{text: '1', type: 'number'},{text: '2', type: 'number'},{text: '3', type: 'number'}, {text: '-', type: 'operator'}],
    [{text: '.', type: 'operator'},{text: '0', type: 'number'}, {text: '=', type: 'equals'}, {text: '+', type: 'operator'}]
];




const checkSyntax = (exp : string, symb : ButtonDesc) =>{
  const operators:string[] = ['/','*','-','+'];
  var symbIsNotNum = (symb.type == 'operator')? true : false;
  if(exp.length == 0 && symbIsNotNum){
    return exp;
  }
  if(operators.includes(exp.charAt(exp.length-1)) && symbIsNotNum){
    exp = exp.slice(0,exp.length-1) + symb.text;
    return (exp);
  }
  const parts = exp.split(/[+\-*/]/);
  const currentNumber = parts[parts.length - 1];
  if(symb.text === '.'){
    if (currentNumber.includes('.')) {
      return exp;
    }

    if (currentNumber === '' || operators.includes(exp.charAt(exp.length - 1))) {
      return exp + '0.';
    }
  }
  if(symb.text === '%'){
    return exp.slice(0, exp.lastIndexOf(currentNumber)) + String(Number(currentNumber) / 100);
  }
  return(exp + symb.text);
}







export default function App() {
  const [exp, setExp] = useState('');

  const handleButtonPress = (button: ButtonDesc, prev : string) => {
    switch (button.type) {
        case "clear":
            setExp("");
            break;

        case "delete":
            setExp(prev => prev.slice(0, -1));
            break;

        case "equals":
            setExp(String(eval(prev)));
            break;

        case "number":
        case "operator":
            setExp(prev => checkSyntax(prev, button));
            break;
    }
};
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>{exp}</Text>
      {
        buttons.map((buttrow : ButtonDesc[], key: number) => 
          <View style = {styles.buttonsRow} key = {key}>
            {
              buttrow.map((butt: ButtonDesc, key: number) => <CircButton text={butt.text} key={key} textSize={30} buttonSize={70} onPress={() => handleButtonPress(butt, exp)}/>)
            }
          </View> 
        )
      }
      
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly', 
    marginTop: 270,
  },
  buttonsRow:{
    flexDirection:'row',
    gap:15
  }
});
