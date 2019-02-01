import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'

class MainList extends Component {
  componentDidMount() {
    console.log(this.props.state)
  }

  render() {
    return (
      <View>
        <Text>Hola!</Text>
        <Text>Hola!</Text>
        <Text>Hola!</Text>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {state}
}

export default connect(mapStateToProps)(MainList)
