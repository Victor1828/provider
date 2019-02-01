import React, { Component } from 'react'
import { Actions, ActionConst, Router, Scene, Stack } from 'react-native-router-flux'
import { connect } from 'react-redux'

import LoginForm from './components/LoginForm'
import MainList from './components/MainList'
import { getItem } from './actions/index'

class RouterComponent extends Component {
  componentWillMount() {
    this.props.getItem()
  }

  render() {
    return(
      <Router>
        <Stack key="root" hideNavBar>
          <Stack key="auth">
            <Scene key="login" component={LoginForm} title="Login" initial />
          </Stack>
          <Stack key="main" type={ActionConst.RESET}>
            <Scene key="mainList" component={MainList} title="Main List" initial />
          </Stack>
        </Stack>
      </Router>
    )
  }
}

export default connect(null, { getItem })(RouterComponent)
