import logo from "./logo.svg";
import "./App.css";
import React, { Component } from "react";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios";

class Items extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "", list: [] };
  }

  jsonDataFromFlask() {
    axios.get(`http://127.0.0.1:5000/projects/${this.props.match.params.id}`)
      .then((response) => response.data)
      .then((data) => this.setState({ list: data.items.map((i) => i.item) }));
      //       axios.get(`http://127.0.0.1:5000/projects/${this.props.match.params.id}`).then(resp => {
      // console.log(resp.data)
// });
  }

  handleSubmit = (e) => {
    axios.post(`http://127.0.0.1:5000/projects/${this.props.match.params.id}/item_add`, { item: this.state.value ,project_id: this.props.match.params.id})
      .then(() => {
        this.jsonDataFromFlask();
      })
      .then(() => {
        this.printState();
      })
      .then(() => {
        this.setState({ value: "" });
      });
  };

  handleOnChange = (e) => {
    this.setState({ value: e.target.value });
    
  };

  printState() {
    console.log(this.state)
    let a = this.state.list.map((value) => <li key={value}> {value} </li>);
   
    return a;
  }

  componentDidMount() {
    this.jsonDataFromFlask();
  }

  render() {
    console.log(this.props.match.params.id);
    return (
      <div>
        <h2 align="center">Items</h2>
        <Input onChange={this.handleOnChange} value={this.state.value} />
        <MyButton onClick={this.handleSubmit} />
        {this.printState()}
      </div>
    );
  }
}

class MyButton extends React.Component {
  render() {
    return <button onClick={this.props.onClick}>Submit</button>;
  }
}

class Input extends React.Component {
  render() {
    return (
      <input onChange={this.props.onChange} value={this.props.value}></input>
    );
  }
}

export default Items;
