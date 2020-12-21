import React from 'react';
import './SignUp.css';
import { attemptRegist } from '../../services/api';

class SignUp extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      email:"",
      username:"",
      password:""
    }
  }

  handleClose = (e) => {
    e.preventDefault();
    this.props.closeSignup()
  }

  registration = async (e) => {
    e.preventDefault();
    const res = await attemptRegist(this.state.email,this.state.username, this.state.password);
    if (res.token) {
      window.localStorage.setItem("token", res.token);
      window.localStorage.setItem("userId", res.id);
      window.localStorage.setItem("username", res.username);
      this.props.closeSignup();
      this.props.changeRegistrationName();
    } else {
      alert("password o usuario incorrecto");
    }
  }

  handleInputChange = (e, name) => {
    this.setState({
      [name]:e.target.value,
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    attemptRegist(this.state.email, this.state.username, this.state.password)
    this.props.closeSignup()
  }

  render(){
    return(
      <div className="popup">
        <div className="popup-inner">
          <button onClick={this.handleClose} className="close-icon"><i className="fa fa-times"></i></button>

          <form onSubmit={this.registration}>
            <h3>Sign up</h3>
            <div className="form-group">
              <label>Email</label>
              <input type="email" className="form-control" value={this.state.email} onChange={(e) => this.handleInputChange(e, "email")} placeholder="email" />
            </div>

            <div className="form-group">
              <label>Username</label>
              <input type="username" className="form-control" value={this.state.userName} onChange={(e) => this.handleInputChange(e, "username")} placeholder="username" />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input type="password" className="form-control" value={this.state.password} onChange={(e) => this.handleInputChange(e, "password")} placeholder="password" />
            </div>

            <button type="submit" className="btn btn-primary btn-block">Sign up</button>
          </form>
        </div>
      </div>
    )
  }
}

export default SignUp;