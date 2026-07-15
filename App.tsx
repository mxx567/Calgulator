import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Alert} from 'react-native';
import CircButton from './src/components/circButton';
import { useState } from 'react';




export default function App() {
  const [exp, setExp] = useState('');

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>{exp}</Text>
      
      <View style={styles.buttons}>
        
        <CircButton text='1' buttonSize={60} textSize = {30}onPress={() => setExp(exp + '1')}/>
        
      </View>
      
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center', 
    marginTop: 270,
  },
  buttons:{
    paddingBlock:420,
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignContent: 'flex-start',
    gap: 5,
    marginTop: -400,
  }
});
