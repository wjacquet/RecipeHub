import React, {Component} from 'react'

import firebase from './base'

import {Route, Switch, Redirect} from 'react-router-dom'

import 'font-awesome/css/font-awesome.min.css'

class Main extends Component {

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
          // finished signing in
          // self.setState({user: user, uid: user['m']})
          self.authHandler(user)
        } else {
          // finished signing out
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
      <Switch>

        <Route path='/RecipeHub/Home' render={() => (
          this.signedIn()
            ? <Main uid={this.state.uid} component={Home}/>
            : <Redirect to={`/RecipeHub/SignIn`}/>
        )}/>

        <Route path='/RecipeHub/SignIn' render={() => (
          !this.signedIn()
            ? <SignIn/>
            : <Redirect to={`/RecipeHub/Home`}/>
        )}/>

        <Route path='/RecipeHub/CreateAccount' render={() => (
          !this.signedIn()
            ? <CreateUser/>
            : <Redirect to={`/RecipeHub/Home`}/>
        )}/>

        <Route render={() => {
          return (
            <Redirect to={`/RecipeHub/Home`} />
          )
        }}/>

      </Switch>
    );
  }
}

export default Main;