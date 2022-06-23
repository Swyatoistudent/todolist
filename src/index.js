import React, { useContext, createContext, useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Projects from "./Projects";
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

const token = localStorage.getItem("token");
if (token) {
    setAuthToken(token);
}

const authContext = React.createContext("authContext");
export default authContext

class PrivateRoute extends React.Component {

  render() {
    const { children, ...rest } = this.props;

    let authUser = null;
    return (
      <Route
        {...rest}
        render={
          ({ location }) => (
            authUser
              ? (
                children
              ) : (
                <Redirect
                  to={{
                    pathname: "/login",
                    state: { from: location },
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
          <div className="navMenu">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/projects">Projects</Link>
            </li>
            <Link to="/login">Login</Link>
          </ul>
          </div>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            {/* <Route exact path="/projects" component={Projects}></Route> */}
            <PrivateRoute
              exact
              path="/projects"
              component={Projects}
            ></PrivateRoute>
            <Route exact path="/projects/:id" component={Items}></Route>
            <Route exact path="/login">
              {" "}
              <Login />{" "}
            </Route>
          </Switch>
        </div>
      </Router>
    );
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
