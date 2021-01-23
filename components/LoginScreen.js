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

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onLogin = async (e) => {
    e.preventDefault();
    const request = await fetch("http://192.168.0.119:8000/api/login", {
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
      const store = await AsyncStorage.getItem("token");
      alert(store);
      console.log(store);
    } else {
      alert("You are not authorized to login !");
    }
  };
  return (
    <View style={styles.container}>
      <View  style={styles.cont}  >
      <Text style={styles.titleText}>ERP</Text>
      </View>
      <View style={styles.inputContainer}>
      <Icon
          name="email"
          color="rgb(255,25,146)"
          containerStyle={{
            paddingTop: 30,
          }}
        />
        <TextInput
          value={email}
          keyboardType="email-address"
          onChangeText={(email) => setEmail(email)}
          placeholder="Email Address"
          style={styles.input}
        />
       
      </View>
      <View style={styles.inputContainer}>
      <Icon
          name="lock"
          color="rgb(255,25,146)"
          containerStyle={{
            paddingTop: 30,
          }}
        />
        <TextInput
          value={password}
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
          placeholder="Password"
          style={styles.input}
        />
        
      </View>
      <TouchableOpacity style={styles.button} onPress={onLogin}>
      <Icon
          name="login"
          color="white"
        />
        <Text style={styles.buttonText}> Login </Text>
       
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    alignItems: "center",
  
    // justifyContent: "center",
  
    backgroundColor: "black",
  },
  cont:{
      marginTop:100,
      fontWeight:"bold",
      width:100,
      height:100,
      textAlign:"center",
      borderRadius:100,
      backgroundColor: "white",
      marginBottom:30,
  },
  titleText: {
   paddingTop:30,
    color:"rgb(255,25,146)",
    paddingBottom: 50,
    fontSize: 40,
  },
  button: {
    alignItems: "center",
    backgroundColor: "rgb(255,25,146)",
    width: 200,
    padding: 10,
    borderWidth: 1,
    // borderColor: "white",
    marginTop: 50,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    borderRadius:30
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    alignItems: "center",
    fontWeight:"bold",
    justifyContent: "center",
  },
  input: {
    width: 240,
    fontSize: 20,
    paddingVertical: 10,
    marginBottom: 0,
    marginVertical: 25,
    color:"white"
  },
  inputContainer: {
    width: 270,
    borderBottomWidth: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 0,
    borderColor:"white"
  },
});

export default Login;
