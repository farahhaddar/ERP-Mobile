import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onLogin = async (e) => {
    alert("hello");
    e.preventDefault();
    const request = await fetch("http://192.168.1.3:8000/api/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const response = await request.json();
    const result = request.status;
    if (result == 200) {
      alert("Login Successfully");
      const storeData = async () => {
        const token = response.access_token;
        const user = JSON.stringify(response.user);
        try {
          await AsyncStorage.setItem("token", token);
          await AsyncStorage.setItem("user", user);
        } catch (e) {
          console.log(e);
        }
      };
      storeData();
    } else {
      alert("You are not authorized to login !");
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>ERP</Text>
      <TextInput
        value={email}
        keyboardType="email-address"
        onChangeText={(email) => setEmail(email)}
        placeholder="Email Address"
        style={styles.input}
      />
      <TextInput
        value={password}
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
        placeholder="Password"
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={onLogin}>
        <Text style={styles.buttonText}> Login </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "powderblue",
  },
  titleText: {
    paddingBottom: 50,
    fontSize: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: "black",
    width: 200,
    padding: 10,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 25,
    marginTop: 30,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: 200,
    fontSize: 20,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    marginVertical: 15,
  },
});

export default Login;
