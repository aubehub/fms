import React, { useCallback } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import SearchBar from '../SearchBar/SearchBar';
import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  BrowserRouter,
} from "react-router-dom";
import 'antd/dist/antd.css';

import MyShelf from '../MyShelf/MyShelf';
import Home from '../Home/Home';
import QueryResultsPage from '../QueryResultsPage/QueryResultsPage';
import MoviePage from '../MoviePage/MoviePage';
import SignUp from '../SignUp/SignUp';
import LogIn from '../LogIn/LogIn';
import { attemptLogin } from '../../services/api'

const MyLink = (props) => {
  const match = useRouteMatch({
    path: props.route,
    exact: true,
  });
  return <Link className={ match ? "active" : ""} to={props.route}>{props.name}</Link>;
}

const SearchBarNav = () => {
  const isInHome = useRouteMatch({
    path: "/",
    exact: true,
  });
  return !isInHome && <SearchBar />;
}

class App extends React.Component {
  constructor(props){
    super(props);

      this.state = {
        showSignup: false,
        showLogin: false,
        username: window.localStorage.getItem("username") 
      };
  }

  toggleSignup = () => {  
    this.setState({  
         showSignup: !this.state.showSignup 
    });  
  }

  toggleLogin = () =>{  
    this.setState({  
         showLogin: !this.state.showLogin 
    });  
  }

  // Se llama cuando se loguea o desloguea un usuario
  changeUser = (input) => {
    const username = window.localStorage.getItem("username");
    this.setState({ username: username })
  }
  
  resetLogIn = () => {
    this.setState({
      username: ""
    })
  }

  render(){
    const isLoggedIn = !!this.state.username;
    let buttonLog, buttonSign, buttonOut;
    if (!isLoggedIn) {
      buttonLog = <Button variant="outline-warning" className="log-in-btn" onClick={this.toggleLogin.bind(this)}>LOG IN </Button>
      buttonSign = <Button variant="warning" className="sign-up-btn" onClick={this.toggleSignup.bind(this)}>SIGN UP</Button>
    } else {
      buttonOut = <Button className="logout-btn" onClick={this.resetLogIn}><img className="logout-icon" alt="logout-icon" src="/cerrar-sesion.png"></img></Button>
    }

    return (
      <BrowserRouter basename="/">
        <div className="App">
          <div className="nvbar">
            <div className="icon-fms">
              <img className="roll-div" src="/roll.jpg" alt="" />
            </div>
            <h5 className="fms-div">fms</h5>

            <nav className="nav-menu">
              <ul className="myLinks">
                <li>
                  <MyLink name="Home" route="/" />
                </li>
                <li>
                  <MyLink name="MyShelf" route="/myshelf" />
                </li>
              </ul>
            </nav>
            <SearchBarNav />

            <div className="btns">
              <div className="signup-div">
                {buttonSign}
                {this.state.showSignup ?  
                <SignUp changeRegistrationName={this.changeUser} closeSignup={this.toggleSignup}/>
                : null
                }
              </div>
              <div className="login-div">              
                {buttonLog}
                {this.state.showLogin ?  
                <LogIn changeRegistrationName={this.changeUser}
                closeLogin={this.toggleLogin} />
                : null
                }
              </div>
              {!!this.state.username &&
                (
                <div className="logout-div">
                <h6 className="welcome">Welcome {this.state.username} </h6>
                {buttonOut}
                </div>
                )}

            </div>
          </div>
            <Switch>
              <Route path="/myshelf" component={MyShelf} />
              <Route path="/search/:query" component={QueryResultsPage} />
              <Route path="/movie/:movieId" component={MoviePage} />
              <Route path="/" component={Home} />
            </Switch>   
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
