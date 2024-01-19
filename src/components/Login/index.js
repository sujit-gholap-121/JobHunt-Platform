import {Component, Redirect} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', submitError: false, status: ''}

  updateUsername = e => {
    this.setState({username: e.target.value})
  }

  updatePassword = e => {
    this.setState({password: e.target.value})
  }

  onLogin = async e => {
    const {username, password} = this.state
    e.preventDefault()
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify({username, password}),
    }
    const response = await fetch(url, options)
    const res = await response.json()
    // console.log(res)
    if (response.ok) {
      this.onSuccess(res.jwt_token)
    } else {
      this.onFailure(res.error_msg)
    }
  }

  onFailure = error => {
    this.setState({
      submitError: true,
      status: error,
    })
  }

  onSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 1})
    const {history} = this.props
    history.replace('/')
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    const {status, submitError} = this.state
    console.log(jwtToken)
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    // console.log(username, password)
    return (
      <div className="main-container">
        <div className="login-box">
          <div className="web-logo">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
          </div>

          <form onSubmit={this.onLogin}>
            <div>
              <label className="login-labels" htmlFor="user">
                USERNAME
              </label>
              <br />
              <input
                placeholder="Username"
                className="login-input"
                id="user"
                onChange={this.updateUsername}
              />
            </div>
            <div>
              <label className="login-labels" htmlFor="pass">
                PASSWORD
              </label>
              <br />
              <input
                placeholder="Password"
                className="login-input"
                type="password"
                id="pass"
                onChange={this.updatePassword}
              />
            </div>
            <button className="btn-box" type="submit">
              Login
            </button>
            {submitError && <p className="error-msg">{status}</p>}
          </form>
        </div>
      </div>
    )
  }
}
export default Login
