import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = () => (
  //   const findJobs = () => {
  //     const {history} = props
  //     history.push('/jobs')
  //   }
  <div>
    <Header />
    <div className="home-container">
      <div className="inner-home">
        <h1>Find The Job That Fits Your Life</h1>
        <p>
          Millions of people are searching for jobs, salary, information,
          company reviews. Find the job that fits your abilities and potential.
        </p>
        <Link to="/jobs">
          <button type="button" className="job-btn">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  </div>
)

export default Home
