import logo from "./logo.svg";
import "./App.css";
import React, { Component } from "react";
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "", list: [] };
  }

  printState() {
    // let a = this.state.list.map((value) => (
  
    //  <ul className="MyUl">
    //   <li key={value.name} className="MyLi">
    //    
    //     <Link to={`/projects/${value.id}`}style={{ color:'red' }}>{value.name}  </Link>
    //     <MyButton_del onClick={this.handleDelete(value.id)} />
    //     </div>
    //   </li>
    //   </ul>
    // ));
    // return a;
  
      console.log(this.state)
      let a = this.state.list.map((value) => (
      <li key={value.name} className="MyLi"><Link to={`/projects/${value.id}`}style={{ color:'red' }}>{value.name}  </Link>
      <MyButton_del onClick={this.handleDelete(value.id)} />
      </li>)
      )
      return a;
    
  }

  jsonDataFromFlask() {
    axios.get('http://127.0.0.1:5000/')
      .then((resp) => resp.data)
      .then((data) => {
        if(data.data){
        this.setState({ list: data.data })
      }
      else {
        window.location.href = '/login'
      }
      });
      // axios.get('http://127.0.0.1:5000/').then(resp => {
      // console.log(resp.data.data[0])
// });
  }

  handleSubmit = (e) => {
   axios.post("http://127.0.0.1:5000/project_add", { name: this.state.value })
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
  handleDelete =project_id => e => {
    console.log(project_id)
    axios.post(`http://127.0.0.1:5000/projects/delete_project`,{id:project_id})
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

  // this.jsonDataFromFlask()

  // this.printState()

  handleOnChange = (e) => {
    this.setState({ value: e.target.value });

  };

  componentDidMount() {
    //    fetch('http://192.168.1.104:5000/json')
    //    .then(response => response.json())
    //    .then(data => this.setState({list: data.items.map((i) =>
    //      i.text
    //       )
    // }))

    this.jsonDataFromFlask();
  }

  render() {
    return (
      <div>
        <div className="Project" >
        <h2 >Projects</h2>
        <Input onChange={this.handleOnChange} value={this.state.value} />
        <MyButton onClick={this.handleSubmit} />
        </div>
        <ul className="MyUl">
        {this.printState()}
        </ul>
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


export default Projects;
