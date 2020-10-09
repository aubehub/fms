import React from 'react';
import '../SignUp/SignUp.css'

class LogIn extends React.Component{
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
    this.props.closeLogin()
  }

  render(){
    return(
      <div className="popup">
        <div className="popup-inner">
          <button onClick={this.handleClose} className="close-icon"><i className="fa fa-times"></i></button>

          <form>
            <h3>Log in</h3>
            <div className="form-group">
              <label>Email</label>
              <input type="email" className="form-control" placeholder="email" />
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

export default LogIn;