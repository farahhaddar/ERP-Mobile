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
import { Icon } from "react-native-elements";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onLogin = async (e) => {
    e.preventDefault();
    const request = await fetch("http://192.168.1.105:8000/api/login", {
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
      const storeData = async () => {
        const token = response.access_token;
        const user = JSON.stringify(response.user);
        try {
          await AsyncStorage.setItem("token", token);
          await AsyncStorage.setItem("user", user);
          props.setToken(true);
        } catch (e) {
          console.log(e);
        }
      };
      storeData();
      const store = await AsyncStorage.getItem("token");
      console.log(store);
    } else {
      alert("You are not authorized to login !");
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>ERP</Text>
      <View style={styles.inputContainer}>
        <TextInput
          value={email}
          keyboardType="email-address"
          onChangeText={(email) => setEmail(email)}
          placeholder="Email Address"
          style={styles.input}
        />
        <Icon
          name="email"
          color="rgb(255,25,146)"
          containerStyle={{
            paddingTop: 30,
          }}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          value={password}
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
          placeholder="Password"
          style={styles.input}
        />
        <Icon
          name="lock"
          color="rgb(255,25,146)"
          containerStyle={{
            paddingTop: 30,
          }}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={onLogin}>
        <Text style={styles.buttonText}> Login </Text>
        <Icon
          name="login"
          color="rgb(255,25,146)"
          // containerStyle={{
          //   backgroundColor: "white",
          // }}
        />
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
    width: 300,
    padding: 10,
    borderWidth: 1,
    borderColor: "white",
    marginTop: 50,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: 240,
    fontSize: 20,
    paddingVertical: 10,
    marginBottom: 0,
    marginVertical: 25,
  },
  inputContainer: {
    width: 270,
    borderBottomWidth: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 0,
  },
});

export default Login;
