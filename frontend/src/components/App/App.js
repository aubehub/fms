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
        /*registeredUserName: localStorage.getItem("user") || "" */
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
/*
  changeRegistrationName = (input) => {
    localStorage.setItem("user", input);
    this.setState({registeredUserName: input})
  }
*/
  render(){
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
                <Button onClick={this.toggleSignup} variant="warning" className="sign-up-btn">SIGN UP</Button>
                {this.state.showSignup ?  
                <SignUp closeSignup={this.toggleSignup}/>
                : null
                }
              </div>
              <div className="login-div">              
                <Button onClick={this.toggleLogin} variant="outline-warning" className="log-in-btn">LOG IN</Button>
                {this.state.showLogin ?  
                <LogIn closeLogin={this.toggleLogin} />
                : null
                }
              </div>
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
