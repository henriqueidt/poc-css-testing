import React from "react";
import "./App.css";
import UserForm from "./UserForm/UserForm.js";

export default class App extends React.Component {
  render() {
    return (
      <div className="component-app">
        {/* <h1>Hello, World!</h1> */}
        <UserForm />
      </div>
    );
  }
}
