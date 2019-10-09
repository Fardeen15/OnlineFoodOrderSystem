import React from 'react';
import { connect } from 'react-redux'
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import "antd/dist/antd.css";
import SignIn from './component/signIn/signIn';
import UsersMainPage from './component/usersMainPage/users';
class App extends React.Component {

  render() {
    return (
      <Router>
        <Route exact path="/" render={() => <SignIn />} />
        <Route exact path="/mainpage" render={() => <UsersMainPage />} />
      </Router>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    user: state,
  }
}
const mapDispatchToProps = {}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

