import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import devURL from './assets/proxy.js'
const eveAPI = 'https://esi.evetech.net'

class UnconnectedAuthSSO extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  getAuth = async (query) => {
    let res = await fetch(devURL + '/sso-auth' + query, {
      credentials: 'include',
    })
    let bod = await res.text()
    bod = JSON.parse(bod)
    if (bod.success) {
      let cRes = await fetch(eveAPI + `/latest/characters/${bod.charId}/`)
      let cBod = await cRes.text()
      cBod = JSON.parse(cBod)
      this.setState({ charPub: cBod })
    } else {
      this.setState({ error: res.error })
    }
  }
  componentDidMount = () => {
    let qStr = this.props.location.search
    this.getAuth(qStr)
  }
  redirectRouter = () => {
    if (this.state.charPub.alliance_id === 99006690) {
      this.setState({ allianceAuth: true })
      this.props.dispatch({ type: 'login' })
      return
    } else {
      this.setState({ allianceAuth: false })
    }
  }
  render = () => {
    if (this.state.error) {
      return (
        <div>
          <div>
            There has been an error, please poke Comp with the following info:
          </div>
          <div>{this.state.error}</div>
        </div>
      )
    }
    if (this.state.charPub === undefined) {
      return <div>Loading....</div>
    }
    if (this.state.allianceAuth === true) {
      return <Redirect to='/' />
    }
    if (this.state.allianceAuth === false) {
      return <Redirect to='/insufficient-permissions' />
    }
    setTimeout(this.redirectRouter, 2000)
    return <div>Hello {this.state.charPub.name}</div>
  }
}

const AuthSSO = connect()(UnconnectedAuthSSO)

export default AuthSSO
