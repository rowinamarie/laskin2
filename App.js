import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, FlatList, TextInput } from 'react-native';
import { useState } from 'react';

export default function App() {

  const [number1, setNumber1] = useState("");
  const [number2, setNumber2] = useState("");


  const [result, setResult] = useState(null)
  const [vastaukset, setVastaukset] = useState ('');
  const [historia, setHistoria] = useState ('');


// pluslasku
  const plusPressed = () => {
    const sum = parseFloat(number1) + parseFloat(number2);
    setResult(sum)
    const newHistoria = number1 + ' + ' + number2 + ' = ' + sum; // uusi paikallinen muuttuja
   
    setHistoria(newHistoria); // Update historia first
    setVastaukset([...vastaukset, { key: newHistoria }]); // Then use it to update vastaukset
    setResult(sum);
  };



// miinuslasku
  const miinusPressed = () => {

    const difference = parseFloat(number1) - parseFloat(number2);
    const newHistoria = number1 + ' + ' + number2 + ' = ' + difference;
 
   
    setHistoria(newHistoria); // Update historia first
    setVastaukset([...vastaukset, { key: newHistoria }]); // Then use it to update vastaukset
    setResult(difference);
  };


  return (
    <View style={styles.container}>
      <Text>Result: {result !== null ? result : ""}</Text>


      <TextInput style={styles.input} // tyyli haetaan muuttujasta styles 
        keyboardType='number-pad' // antaa numero padin
        placeholder='Anna ensimmäinen arvo'
        onChangeText={number1 => setNumber1(number1)} // tilamuuttuja
        value={number1}>
      </TextInput>

      <TextInput style={styles.input}
        placeholder='Anna toinen arvo'
        onChangeText={number2 => setNumber2(number2)}
        value={number2}
        keyboardType='numeric'>
      </TextInput>


      <View style={styles.operators}>
        <View style={styles.button}>
          <Button onPress={plusPressed} title="+" />
        </View>
        <View style={styles.button}></View>
        <Button onPress={miinusPressed} title="-" />

        <StatusBar style="auto" />
      </View>

      <Text>History</Text>
      <FlatList
        data={vastaukset}
        renderItem={({ item }) => <Text>{item.key}</Text>}
        ListEmptyComponent={<Text>No data</Text>}
        ItemSeparatorComponent = {
        <View 
        style={{height: 1, backgroundColor: 'grey', width: 100}}>
        </View>}
      />

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80
  },
  input: {
    borderColor: 'grey',
    borderWidth: 1,
    padding: 5,
    margin: 5,
    width: '50%'
  },
  operators: {
    
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },

  button: {
    borderColor: 'grey',
    width: '20%'
  }


});
