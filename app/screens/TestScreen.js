
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';


const sampleData = [
    {
      id: 487,
      name: "SI-HI",
      shape: "ROUND",
      size: "0",
      weight: "0.12",
      pieces: 7
    },
    {
      id: 488,
      name: "VS-HI",
      shape: "SQUARE",
      size: "1",
      weight: "0.15",
      pieces: 5
    }
  ];

function TestScreen(props) {
    return (
        <View style={styles.container} >
            <Text>Hello world</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex : 1,
        marginTop: 60
    },
});


export default TestScreen;