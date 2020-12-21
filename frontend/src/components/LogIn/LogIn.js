import React from 'react';
import '../SignUp/SignUp.css'
import { attemptLogin } from '../../services/api';

class LogIn extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      email:"",
      password:"",
    }

  }

  handleClose = (e) => {
    e.preventDefault();
    this.props.closeLogin()
  }

  login = async (e) => {
    e.preventDefault();
    const res = await attemptLogin(this.state.email, this.state.password);
    if (res.token) {
      window.localStorage.setItem("token", res.token);
      window.localStorage.setItem("userId", res.id);
      window.localStorage.setItem("username", res.username);
      this.props.closeLogin();
      this.props.changeRegistrationName();
    } else {
      alert("password o usuario incorrecto");
    }
  }

  updateEmail = (e) => {
    this.setState({
      email: e.target.value
    })
  }

  updatePass = (e) => {
    this.setState({
      password: e.target.value
    })
  }


  render(){
    return(
      <div className="popup">
        <div className="popup-inner">
          <button onClick={this.handleClose} className="close-icon"><i className="fa fa-times"></i></button>

          <form onSubmit={this.login}>
            <h3>Log in</h3>
            <div className="form-group">
              <label>Email</label>
              <input type="email" className="form-control" placeholder="email" onChange={this.updateEmail}/>
            </div>

            <div className="form-group">
              <label>Password</label>
              <input type="password" className="form-control" placeholder="password" onChange={this.updatePass} />
            </div>

            <button type="submit" className="btn btn-primary btn-block">Log in</button>
          </form>
        </div>
      </div>
    )
  }
}

export default LogIn;