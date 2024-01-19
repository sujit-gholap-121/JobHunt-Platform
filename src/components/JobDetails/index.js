import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'
import {FaStar} from 'react-icons/fa'
import {MdLocationOn, MdWork} from 'react-icons/md'
import Header from '../Header'
import SimilarJobsCardItem from '../SimilarJobsCardItem'

const RenderSkills = prop => {
  const {ele} = prop
  // console.log(ele)
  return (
    <li>
      <img className="li-img" src={ele.image_url} alt={ele.name} />
      <p>{ele.name}</p>
    </li>
  )
}

class JobDetails extends Component {
  state = {status: 'loading', jobDetails: {}, similarJobs: {}}

  componentDidMount() {
    this.fetchJobDetails()
  }

  fetchJobDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/jobs/${id}`
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
      this.setState({
        status: 'success',
        jobDetails: res.job_details,
        similarJobs: res.similar_jobs,
      })
    } else {
      this.setState({status: 'failure'})
    }
  }

  RenderDetails = () => {
    const {status, jobDetails, similarJobs} = this.state
    // console.log(true, similarJobs)
    if (status === 'loading') {
      //   console.log(true)
      return (
        <div className="loader-container" data-testid="loader">
          <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
        </div>
      )
    }
    if (status === 'success') {
      return (
        <div className="detailsCard">
          <div className="detail-inner-card">
            <div className="card-top">
              <img
                className="job-img"
                src={jobDetails.company_logo_url}
                alt="job details company logo"
              />
              <div className="top-details">
                <h1 id="title">{jobDetails.title}</h1>
                <div className="f1">
                  <FaStar /> <p id="p">{jobDetails.rating}</p>
                </div>
              </div>
            </div>
            <div className="middle">
              <div className="middle-start">
                <MdLocationOn />
                <p>{jobDetails.location}</p>
                <MdWork />
                <p>{jobDetails.employment_type}</p>
              </div>
              <p className="para">{jobDetails.package_per_annum}</p>
            </div>
            <hr />
            <div className="bottom">
              <div className="bottom-top">
                <h1>Description</h1>
                <a href={`${jobDetails.company_website_url}`}>
                  <p className="url-design">Visit</p>
                </a>
              </div>
              <p id="para2">{jobDetails.job_description}</p>
            </div>
            <div className="skills">
              <h1 className="head1">Skills</h1>
              <ul className="skills-list">
                {jobDetails.skills.map(ele => (
                  <RenderSkills key={ele.name} ele={ele} />
                ))}
              </ul>
            </div>
            <div className="lifeDetails">
              <h1 className="head1">Life at Company</h1>
              <div className="life">
                <p className="para1">
                  {jobDetails.life_at_company.description}
                </p>
                <img
                  className="life-img"
                  src={jobDetails.life_at_company.image_url}
                  alt="life at company"
                />
              </div>
            </div>
          </div>
          <h1 className="head1">Similar Jobs</h1>
          <ul className="simi-outer">
            {similarJobs.map(ele => (
              <SimilarJobsCardItem key={ele.id} item={ele} />
            ))}
          </ul>
        </div>
      )
    }
    return (
      <div className="failure">
        <img
          className="job-fail-img"
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
        />
        <h1>Oops! Something Went Wrong</h1>
        <p>We cannot seem to find the page you are looking for.</p>
        <button
          className="retry-btn"
          type="button"
          onClick={this.fetchJobDetails}
        >
          Retry
        </button>
      </div>
    )
  }

  render() {
    const {status} = this.state
    return (
      <div>
        <Header />
        <this.RenderDetails />
      </div>
    )
  }
}
export default JobDetails
