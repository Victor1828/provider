import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View } from 'react-native'

import { emailChanged, passwordChanged, loginUser } from '../actions'
import { Card, CardSection, Input, Button, Spinner } from './common';

class LoginForm extends Component {
  onButtonSubmit() {
    const { email, password } = this.props;
    this.props.loginUser({ email, password })
  }

  emailChanged(value) {
    const email = value.trim()
    this.props.emailChanged(email)
  }

  passwordChanged(value) {
    this.props.passwordChanged(value.trim())
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />
    }

    return (
      <Button onPress={this.onButtonSubmit.bind(this)}>
        Login
      </Button>
    )
  }

  renderError() {
    if (this.props.error) {
      return (
        <Text style={styles.errorTextStyle}>
          {this.props.error}
        </Text>
      )
    }
  }

  render() {
    return (
      <View style={styles.viewStyle}>
        <Card>
          <CardSection>
            <Input
              label="Email"
              placeholder="email@gmail.com"
              onChangeText={this.emailChanged.bind(this)}
              value={this.props.email}
            />
          </CardSection>

          <CardSection>
            <Input
              secureTextEntry
              label="Password"
              placeholder="password"
              onChangeText={this.passwordChanged.bind(this)}
              value={this.props.password}
            />
          </CardSection>

          {this.renderError()}

          <CardSection>
            {this.renderButton()}
          </CardSection>
        </Card>
      </View>
    )
  }
}

const styles = {
  viewStyle: {
    marginTop: 50,
    padding: 10,
  },
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
}

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading } = auth

  return { email, password, error, loading }
};

export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser })(LoginForm)
