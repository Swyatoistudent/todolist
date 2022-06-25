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
  handleDelete =ite => e => {
    console.log(ite)
    axios.post(`http://127.0.0.1:5000/projects/${this.props.match.params.id}/delete_item`,{item:ite})
       .then(() => {
         this.jsonDataFromFlask();
       })
       .then(() => {
         this.printState();
       })
   };

  handleOnChange = (e) => {
    this.setState({ value: e.target.value });
    
  };

  printState() {
    console.log(this.state)
    let a = this.state.list.map((value) => <li key={value}> {value} 
    <MyButton_del onClick={this.handleDelete(value)} />
    </li>);
   
    return a;
  }

  componentDidMount() {
    this.jsonDataFromFlask();
  }

  render() {

    return (
      <div>
        <div className="Project" >
        <h2 >Items</h2>
        <Input onChange={this.handleOnChange} value={this.state.value} />
        <MyButton onClick={this.handleSubmit} />
        <ul className="MyUl">
        {this.printState()}
        </ul>
        </div>
      </div>
    );
  }
}

class MyButton extends React.Component {
  render() {
    return <button className="MyButton" onClick={this.props.onClick}>Submit</button>;
  }
}
class MyButton_del extends React.Component {
  render() {
    return <button  onClick={this.props.onClick}>X</button>;
  }
}

class Input extends React.Component {
  render() {
    return (
      <input className="MyInput" onChange={this.props.onChange} value={this.props.value}></input>
    );
  }
}

export default Items;
