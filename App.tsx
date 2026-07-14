import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Alert} from 'react-native';
import CircButton from './src/components/circButton';



export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <CircButton text='1' onPress={() => Alert.alert("I WAS PRESSED" , "xd")}/>
      <CircButton text='2' onPress={() => Alert.alert("I WAS PRESSED" , "xd")}/>
      <CircButton text='3' onPress={() => Alert.alert("I WAS PRESSED" , "xd")}/>
      
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
});
