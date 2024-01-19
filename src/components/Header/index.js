import {Link, withRouter} from 'react-router-dom'
import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class Header extends Component {
  state = {isLogged: false}

  componentDidMount() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      this.setState({isLogged: true})
    }
  }

  onLogout = () => {
    // console.log(Cookies.get('jwt_token'))
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  render() {
    const {isLogged} = this.state
    return (
      <ul className="header">
        <li>
          <Link to="/">
            <img
              className="header-img"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
          </Link>
        </li>

        <li>
          <ul className="header-nav">
            <Link to="/" style={{textDecoration: 'none'}}>
              <li>Home</li>
            </Link>
            <Link to="/jobs" style={{textDecoration: 'none'}}>
              <li>Jobs</li>
            </Link>
          </ul>
        </li>

        <li>
          <Link to="/login">
            <button
              type="button"
              className="header-btn"
              onClick={this.onLogout}
            >
              {isLogged ? 'Logout' : 'Login'}
            </button>
          </Link>
        </li>
      </ul>
    )
  }
}

export default withRouter(Header)
