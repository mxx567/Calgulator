import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Alert} from 'react-native';
import CircButton from './src/components/circButton';
import { useState } from 'react';


const buttons:string[][] = [
    ['7', '8', '9', '/'],
    ['4', '5', '6', '*'],
    ['1', '2', '3', '-'],
    ['.', '0', '=', '+']
];


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
              buttrow.map((butt: string, key: number) => <CircButton text={butt} key={key} onPress={() => {butt != '=' ? setExp(exp + butt) : setExp(eval(exp))}}/>)
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
    flexDirection:'row'
  }
});
