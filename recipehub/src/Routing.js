import React, {Component} from 'react'
import Signin from './signin'
import Createuser from './createuser'
import Main from './Main'
import firebase from './base'

import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

import 'font-awesome/css/font-awesome.min.css'

class Routing extends Component {

  constructor(props) {
    super(props);

    this.state = {
      uid: null,
      user: null,
    }
  }

  componentWillMount() {
    this.getUserFromsessionStorage();
    let self = this;
    firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          // finished Signing in
          // self.setState({user: user, uid: user['m']})
          self.authHandler(user)
        } else {
          // finished Signing out
          self.setState({uid: null, user: null}, () => {
            // window.location.reload();
          });
        }
      }
    )
  }

  getUserFromsessionStorage() {
    const uid = sessionStorage.getItem('uid');
    if (!uid) return;
    this.setState({uid})
  }

  authHandler = (user) => {
    sessionStorage.setItem('uid', user.uid);
    this.setState({uid: user.uid, user: user})
  };

  signedIn = () => {
    return this.state.uid
  };

  render() {
    const data = {
      user: this.state.user,
      uid: this.state.uid,
    };

    return (
      <BrowserRouter>
        <Switch>

          <Route path='/RecipeHub/Home' render={() => (
            this.signedIn()
              ? <Main/>
              : <Redirect to={`/RecipeHub/Signin`}/>
          )}/>

          {/*<Route path='/RecipeHub/Signin' render={() => (*/}
            {/*!this.signedIn()*/}
              {/*? <Signin/>*/}
              {/*: <Redirect to={`/RecipeHub/Home`}/>*/}
          {/*)}/>*/}

          {/*<Route path='/RecipeHub/CreateAccount' render={() => (*/}
            {/*!this.signedIn()*/}
              {/*? <Createuser/>*/}
              {/*: <Redirect to={`/RecipeHub/Home`}/>*/}
          {/*)}/>*/}

          {/*<Route render={() => {*/}
            {/*return (*/}
              {/*<Redirect to={`/RecipeHub/Home`}/>*/}
            {/*)*/}
          {/*}}/>*/}

        </Switch>
      </BrowserRouter>
    );
  }
}

export default Routing;