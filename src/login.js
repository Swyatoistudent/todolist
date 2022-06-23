import logo from "./logo.svg";
import axios from 'axios';
import "./App.css";
import React, { Component } from "react";
import { setAuthToken } from "./setAuth";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "", list: [] };
  }

  // handleSubmit = (e) => {
  //   fetch("http://127.0.0.1:5000/login", {
  //     method: "POST",
  //     mode: "cors",
  //     cache: "no-cache",
  //     credentials: "same-origin",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },

  //     body: JSON.stringify({
  //       username: this.state.username,
  //       password: this.state.password,
  //     }),
  //   }).then((response) => {

  //     response.json().then(function (result) {
  //       localStorage.setItem("access_token", result['access_token']);
  //       setAuthToken(result['access_token']);
  //     });
  //   });
  // };
  handleSubmit = (e) => {
    //reqres registered sample user
    const loginPayload = {
      username: this.state.username,
      password: this.state.password,
    }
  
    axios.post("http://127.0.0.1:5000/login", loginPayload)
      .then(response => {
        //get token from response
        const token  =  response.data.access_token;
        //set JWT token to local
        console.log(token)
        localStorage.setItem("token", token);
  
        //set token to axios common header
        setAuthToken(token);
        window.location.href = '/projects'
      
       
      }) 
      .catch(err => console.log(err));
  };

  handleOnChange = (value) => {
    return (e) => {
      this.setState({ [value]: e.target.value });
    };
  };

  render() {
    console.log(this.state);
    return (
      <div align="center">
        
        <div className="">
        <label for="username">Username:</label>
        <Input
          onChange={this.handleOnChange("username")}
          value={this.state.username}
        />
        <label for="password">Password:</label>
        <Input
          onChange={this.handleOnChange("password")}
          value={this.state.password}
        />
        <MyButton onClick={this.handleSubmit} />
        </div>
      </div>
    );
  }
}

class MyButton extends React.Component {
  render() {
    return <button  className='MyButton' onClick={this.props.onClick}>login</button>;
  }
}

class Input extends React.Component {
  render() {
    return (
      <input className='LoginInput'onChange={this.props.onChange} value={this.props.value}></input>
    );
  }
}
export default Login;
