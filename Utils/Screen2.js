import React from "react";
import { SafeAreaView, StyleSheet, TextInput } from "react-native";

const Screen2 = () => {


  return (
    <SafeAreaView>
      <TextInput
        laceholder="useless placeholder"
      />
      <TextInput
        placeholder="useless placeholder"
        keyboardType="numeric"
      />
      <TextInput
        placeholder="useless placeholder"
        keyboardType="numeric"
      />
      <TextInput
        placeholder="useless placeholder"
        keyboardType="numeric"
      />
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default Screen2;