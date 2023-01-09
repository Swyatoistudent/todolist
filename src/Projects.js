
import "./App.css";
import React, { Component } from "react";
import axios from 'axios';
import { BrowserRouter as  Link } from "react-router-dom";

class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "", list: [],table:[0,1,2,3] };
  }

  printState() {

      let l = [{number:0,time:"--"},{number:1,time:"--"},{number:2,time:"--"},{number:3,time:"--"}]
      console.log(l)
      for(let i=0;i<this.state.table.length;i++){
        console.log(i)
        if (this.state.list.find(k=>k.number==i)!==undefined){
          l[i]={number:i,time:this.state.list.find(k=>k.number==i).time}
        } 
      }
      console.log(l)
      let a = this.state.table.map((value) => (
      <li key={value} className="MyLi">{"номер стола "+(value+1)},{"зарезервовано з:"+l.find(i=>i.number==value).time}
      <Table disabled={l.find(i=>i.number==value).time!="--"} onClick={this.handleTable(value)} />
      <MyButton_del onClick={this.handleDelete(value)} />
      </li>)
      )
      l=[]
      return (a);
    
  }

  jsonDataFromFlask() {
    axios.get('http://127.0.0.1:5000/')
      .then((resp) => resp.data)
      .then((data) => {
        if(data.data){
          console.log(data)
        this.setState({ list: data.data })
        console.log(this.state.list)
      }
      else {
        window.location.href = '/login'
      }
      });
      // axios.get('http://127.0.0.1:5000/').then(resp => {
      // console.log(resp.data.data[0])
// });
  }

  handleTable =id=> (e) => {
    axios.post("http://127.0.0.1:5000/project_add", { name: this.state.value,id:id })
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
        <h2 >Введіть бажаний час для резервації</h2>
        <Input onChange={this.handleOnChange} value={this.state.value} />
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
class Table extends React.Component {
  render() {
    return <button disabled={this.props.disabled} style={{backgroundColor: 'transparent', width:"90px"}}><img style={{width:"80px"}} src="table2.png" alt="my imag" onClick={this.props.onClick} /></button>
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
