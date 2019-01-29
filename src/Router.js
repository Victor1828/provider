import React from 'react'
import { Actions, ActionConst, Router, Scene, Stack } from 'react-native-router-flux'

import LoginForm from './components/LoginForm'
import MainList from './components/MainList'

const RouterComponent = () => {
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

export default RouterComponent
