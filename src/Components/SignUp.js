import React, { Component } from "react";
import axios from "axios";

import "../styles/forms.css";
class SignUp extends Component {
  state = {
    username: "",
    password1: "",
    password2: ""
  };
  // update state with new user information
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  // prevent page from reloading, create new user object
  handleSubmit = e => {
    e.preventDefault();
    let user = {
      username: this.state.username,
      password1: this.state.password1,
      password2: this.state.password2
    };
    axios
      // post user information and get back token, save token to local storage
      .post("https://lisacee-mud.herokuapp.com/api/registration/", user)
      .then(res => {
        localStorage.setItem("Token", res.data.key);
        this.props.history.push("/api/adv/init");
      })
      // or popup with error
      .catch(error => {
        alert(error.response.data.error);
      });
    //reset fields
    this.setState({ username: "", password1: "", password2: "" });
  };
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h3>Create an Account</h3>
          <label for="username">Username</label>
          <input
            type="username"
            name="username"
            id="username"
            onChange={this.handleChange}
            value={this.state.username}
          />
          <label for="password">Password</label>
          <input
            type="password"
            name="password1"
            id="password1"
            onChange={this.handleChange}
            value={this.state.password1}
          />
          <label for="confirm password">Confirm Password</label>
          <input
            type="password"
            name="password2"
            id="password2"
            onChange={this.handleChange}
            value={this.state.password2}
          />

          <button type="submit">Sign Up</button>
        </form>
      </div>
    );
  }
}

export default SignUp;
