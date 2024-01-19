import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {IoIosSearch} from 'react-icons/io'
import Header from '../Header'
import './index.css'
import JobCardItem from '../JobCardItem'

class Jobs extends Component {
  state = {
    profileStatus: 'loading',
    profile: {},
    jobsListStatus: 'loading',
    jobsList: [],
    minSalary: 0,
    employement: [],
    search: '',
  }

  componentDidMount() {
    // console.log('Mounted')
    this.fetchProfile()
    this.fetchJobsList()
  }

  fetchProfile = async () => {
    const jwtToken = Cookies.get('jwt_token')
    // console.log(jwtToken)
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const res = await response.json()
    // console.log(res)
    if (response.ok) {
      this.setState({profileStatus: 'success', profile: res.profile_details})
    } else {
      this.setState({profileStatus: 'failed'})
    }
  }

  fetchJobsList = async () => {
    const {minSalary, employement, search} = this.state
    // console.log()
    const jwtToken = Cookies.get('jwt_token')
    const queryParams = `employment_type=${employement.join(
      ',',
    )}&minimum_package=${minSalary}&search=${search}`

    const url = 'https://apis.ccbp.in/jobs?'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url + queryParams, options)
    const res = await response.json()
    // console.log('jobs', res)
    if (response.ok) {
      this.setState({jobsListStatus: 'success', jobsList: res.jobs})
    } else {
      this.setState({jobsListStatus: 'failed'})
    }
  }

  RenderProfile = () => {
    const {profileStatus, profile} = this.state
    if (profileStatus === 'loading') {
      return (
        <div className="profile-box failure-profile">
          <div className="loader-container" data-testid="loader">
            <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
          </div>
        </div>
      )
    }
    if (profileStatus === 'success') {
      return (
        <div className="profile-box success-profile">
          <img
            className="profile-img"
            src={profile.profile_image_url}
            alt="profile"
          />
          <h1>{profile.name}</h1>
          <p>{profile.short_bio}</p>
        </div>
      )
    }
    return (
      <div className="profile-box failure-profile">
        <button type="button" onClick={this.fetchProfile}>
          Retry
        </button>
      </div>
    )
  }

  updateEmployement = e => {
    const {employement} = this.state
    let lt
    if (employement.includes(e.target.value)) {
      lt = employement.filter(ele => ele !== e.target.value)
      //   console.log(lt)
      this.setState({employement: lt}, this.fetchJobsList)
    } else {
      employement.push(e.target.value)
      this.setState({employement}, this.fetchJobsList)
    }
    // console.log('fetching')
  }

  updateSalaryRange = e => {
    this.setState({minSalary: e.target.value}, this.fetchJobsList)
  }

  onSubmitForm = e => {
    e.preventDefault()
    this.fetchJobsList()
  }

  updateSearch = e => {
    this.setState({search: e.target.value})
  }

  RenderEmployement = () => {
    const {employement} = this.state
    return (
      <div className="job-emp">
        <h1 className="emp-h1">Type of Employment</h1>
        <div className="check-container">
          <input
            className="emp-input"
            type="checkbox"
            id="fullTime"
            value="FULLTIME"
            onClick={this.updateEmployement}
          />
          <label htmlFor="fullTime">Full Time</label>
          <br />
          <input
            className="emp-input"
            type="checkbox"
            id="partTime"
            value="PARTTIME"
            onClick={this.updateEmployement}
          />
          <label htmlFor="partTime">Part Time</label>
          <br />
          <input
            className="emp-input"
            type="checkbox"
            id="freelance"
            value="FREELANCE"
            onClick={this.updateEmployement}
          />
          <label htmlFor="freelance">Freelance</label>
          <br />
          <input
            className="emp-input"
            type="checkbox"
            id="internship"
            value="INTERNSHIP"
            onClick={this.updateEmployement}
          />
          <label htmlFor="internship">Internship</label>
        </div>
      </div>
    )
  }

  RenderSalaryRange = () => (
    <div className="job-salary-range">
      <h1 className="emp-h1">Salary Range</h1>
      <div>
        <input
          type="radio"
          value="1000000"
          id="salary1"
          name="1"
          onClick={this.updateSalaryRange}
        />
        <label htmlFor="salary1">10 LPA and above</label>
        <br />
        <input
          type="radio"
          value="2000000"
          id="salary2"
          name="1"
          onClick={this.updateSalaryRange}
        />
        <label htmlFor="salary2">20 LPA and above</label>
        <br />
        <input
          type="radio"
          value="3000000"
          id="salary3"
          name="1"
          onClick={this.updateSalaryRange}
        />
        <label htmlFor="salary3">30 LPA and above</label>
        <br />
        <input
          type="radio"
          value="4000000"
          id="salary4"
          name="1"
          onClick={this.updateSalaryRange}
        />
        <label htmlFor="salary4">40 LPA and above</label>
        <br />
      </div>
    </div>
  )

  RenderJobs = () => {
    const {jobsListStatus, jobsList} = this.state
    if (jobsListStatus === 'loading') {
      return (
        <div className="jobs-box">
          <div className="loader-container" data-testid="loader">
            <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
          </div>
        </div>
      )
    }
    if (jobsListStatus === 'failed') {
      return (
        <div className="jobs-box">
          <img
            className="jobs-error-img"
            src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
            alt="failure view"
          />
          <h1>Oops! Something Went Wrong</h1>
          <p>We cannot seem to find the page you are looking for</p>
          <button
            className="retry-btn"
            type="button"
            onClick={this.fetchJobsList}
          >
            Retry
          </button>
        </div>
      )
    }
    if (jobsList.length === 0) {
      return (
        <div className="jobs-box">
          <img
            className="jobs-error-img"
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no jobs"
          />
          <h1>No Jobs Found</h1>
          <p>We could not find any jobs. Try other filters.</p>
        </div>
      )
    }
    return (
      <div className="jobs-box">
        {jobsList.map(ele => (
          <JobCardItem key={ele.id} item={ele} />
        ))}
      </div>
    )
  }

  render() {
    return (
      <>
        <Header />
        <div className="jobs-page">
          <div className="job-filters">
            <this.RenderProfile />
            <hr />
            <this.RenderEmployement />
            <hr />
            <this.RenderSalaryRange />
          </div>
          <div className="jobs-available">
            <form className="search-container" onSubmit={this.onSubmitForm}>
              <input
                type="search"
                placeholder="Search"
                className="jobs-search"
                onChange={this.updateSearch}
              />
              <button
                className="btn"
                data-testid="searchButton"
                onClick={this.onSubmitForm}
                type="button"
              >
                <IoIosSearch />{' '}
              </button>
            </form>

            <this.RenderJobs />
          </div>
        </div>
      </>
    )
  }
}
export default Jobs
