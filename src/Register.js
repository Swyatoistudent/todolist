import logo from "./logo.svg";
import axios from 'axios';
import "./App.css";
import React, { Component } from "react";
import { setAuthToken } from "./setAuth";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "", list: [] };
  }


  handleSubmit = (e) => {
    //reqres registered sample user
    const loginPayload = {
      username: this.state.username,
      password: this.state.password,
    }
  
    axios.post("http://127.0.0.1:5000/register", loginPayload)
      .then(response => {
        //get token from response
        
        //set JWT token to local

  
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
    return (
      <div align="center">
         <h1 align="center">Logup</h1>
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
    );
  }
}

class MyButton extends React.Component {
  render() {
    return <button  className='MyButton' onClick={this.props.onClick}>logup</button>;
  }
}

class Input extends React.Component {
  render() {
    return (
      <input className='LoginInput'onChange={this.props.onChange} value={this.props.value}></input>
    );
  }
}
export default Register;
