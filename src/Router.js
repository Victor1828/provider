import React, { Component } from 'react'
import { Actions, ActionConst, Router, Scene, Stack } from 'react-native-router-flux'
import { connect } from 'react-redux'

import LoginForm from './components/LoginForm'
import MainList from './components/MainList'
import { getItem } from './actions/index'

class RouterComponent extends Component {
  componentDidMount() {
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

const mapStateToProps = state => {
  return {state}
}

export default connect(mapStateToProps, { getItem })(RouterComponent)
