import React, { useContext, createContext, useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Projects from "./Projects";
import Register from "./Register";
import Items from "./Items";
import reportWebVitals from "./reportWebVitals";
import Login from "./login";


import { setAuthToken } from "./setAuth";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";

const logout = function(){
  localStorage.clear()
  window.location.href = '/login'
}

const token = localStorage.getItem("token");
if (token) {
    setAuthToken(token);
}


// class Logout extends React.Component{
//   render(){
//     return(
//       <Route>
//         render={  
//     <Redirect 
//                 to={{
//                   pathname: '/login',
//                   state: { from: location }
//                 }}
//               />}
//               </Route>
              
//     )
//   }
// }
class PrivateRoute extends React.Component {

  render() {
    const { children,...rest } = this.props;
    let auth = token;
    return (
      <Route
      {...rest}
      render={
        ({ location }) => (
          auth
            ? (
              children
            ) : (
              <Redirect 
                to={{
                  pathname: '/login',
                  state: { from: location }
                }}
              />
            ))
      }
    />
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <Router>
        <div >
          <ul id='navbar'>
            <li>
              <Link to="/projects">Projects</Link>
            </li>
            
            <li >
            <Link to="/register">Register</Link>
    
            </li>
           
            <li>
            <Link to="/login">Login</Link>
            </li>
            <li>
            <Logout></Logout>
            </li>
          </ul>
         
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            
        
            {/* <Route exact path="/projects" component={Projects}></Route> */}
            <PrivateRoute
              exact
              path="/projects"
            >  {" "}
            <Projects />{" "}</PrivateRoute>
            <Route exact path="/projects/:id" component={Items}>
            </Route>
            <Route exact path="/register" component={Register}></Route>
            <Route exact path="/login">
              {" "}
              <Login />{" "}
              {/* <Route exact path="/logout" >{' '}<Logout></Logout>{}
            </Route> */}
            {/* <Route exact path="/logout" component={Logout}></Route> */}
            
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}
class Logout extends React.Component {
  render() {
    return <Link to="/"  onClick={logout}>Logout</Link>;
  }
}
class Home extends React.Component {
  render() {
    return (
      <div>
        <h1 align="center">Home</h1>
      </div>
    );
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
