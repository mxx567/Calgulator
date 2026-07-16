import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { CircButton } from './src/components/circButton';
import { useState } from 'react';

const buttons:string[][] = [
    ['AC', 'DEL','%'],
    ['7', '8', '9', '/'],
    ['4', '5', '6', '*'],
    ['1', '2', '3', '-'],
    ['.', '0', '=', '+']
];


function isIn(arr : any[], elem : any){
  for(let i = 0; i < arr.length; i++){
    if(arr[i] == elem){
      return true;
    }
  }
  return false;
}

const checkSyntax = (exp : string, symb : string) =>{
  const operators:string[] = ['/','*','-','+'];
  var symbIsNotNum = isIn(operators, symb)
  if(exp.length == 0 && symbIsNotNum){
    return exp;
  }

  if(isIn(operators, exp.charAt(exp.length-1)) && symbIsNotNum){
    exp = exp.slice(0,exp.length-1) + symb;
    console.log(exp)
    return (exp);
  }

  if (symb === '.') {
        const parts = exp.split(/[+\-*/]/);
        const currentNumber = parts[parts.length - 1];

        if (currentNumber.includes('.')) {
            return exp;
        }

        if (currentNumber === '' || operators.includes(exp.charAt(exp.length - 1))) {
            return exp + '0.';
        }
    }
  return(exp + symb);
}



export default function App() {
  const [exp, setExp] = useState('');

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>{exp}</Text>
      {
        buttons.map((buttrow : string[], key: number) => 
          <View style = {styles.buttonsRow} key = {key}>
            {
              buttrow.map((butt: string, key: number) => <CircButton text={butt} key={key} textSize={30} buttonSize={70} onPress={() => {butt != '=' ? setExp(checkSyntax(exp, butt)) : setExp(exp? String(eval(exp)) : exp)}}/>)
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
