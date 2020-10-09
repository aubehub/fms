import React from 'react';
import './SignUp.css'

class SignUp extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      userName:"",
      password:"",
    }
  
  this.handleClose = this.handleClose.bind(this);
  }

  handleClose(e){
    e.preventDefault();
    this.props.closeSignup()
  }

  render(){
    return(
      <div className="popup">
        <div className="popup-inner">
          <button onClick={this.handleClose} className="close-icon"><i className="fa fa-times"></i></button>

          <form>
            <h3>Sign up</h3>
            <div className="form-group">
              <label>Email</label>
              <input type="email" className="form-control" placeholder="email" />
            </div>

            <div className="form-group">
              <label>Username</label>
              <input type="username" className="form-control" placeholder="username" />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input type="password" className="form-control" placeholder="password" />
            </div>

            <button type="submit" className="btn btn-primary btn-block">Log in</button>
          </form>
        </div>
      </div>
    )
  }
}

export default SignUp;