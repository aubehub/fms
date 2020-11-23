import React from 'react';
import './SignUp.css';
import { saveUserRegist } from '../../services/api';

class SignUp extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      email:"",
      username:"",
      password:""
    }
  
  this.handleClose = this.handleClose.bind(this);
  this.handleInputChange = this.handleInputChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClose(e){
    e.preventDefault();
    this.props.closeSignup()
  }

  handleInputChange(e, name){
    this.setState({
      [name]:e.target.value,
    })
  }

  handleSubmit(e){
    e.preventDefault();
    saveUserRegist(this.state.email, this.state.username, this.state.password)
    this.props.closeSignup()
  }

  render(){
    return(
      <div className="popup">
        <div className="popup-inner">
          <button onClick={this.handleClose} className="close-icon"><i className="fa fa-times"></i></button>

          <form onSubmit={this.handleSubmit}>
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