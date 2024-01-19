import {FaStar} from 'react-icons/fa'
import {MdLocationOn, MdWork} from 'react-icons/md'
import {Link} from 'react-router-dom'
import './index.css'

const JobCardItem = props => {
  const {item} = props
  //   const fetchJobDetails = () => {
  //     const {history} = props
  //   }
  return (
    <Link to={`/jobs/${item.id}`} style={{textDecoration: 'none'}}>
      <div className="jobs-card">
        <div className="card-top">
          <img
            className="job-img"
            src={item.company_logo_url}
            alt="company logo"
          />
          <div className="top-details">
            <h1>{item.title}</h1>
            <FaStar /> <p>{item.rating}</p>
          </div>
        </div>
        <div className="middle">
          <div className="middle-start">
            <MdLocationOn />
            <p>{item.location}</p>
            <MdWork />
            <p>{item.employment_type}</p>
          </div>
          <p className="para">{item.package_per_annum}</p>
        </div>
        <hr />
        <div className="bottom">
          <h1>Description</h1>
          <p>{item.job_description}</p>
        </div>
      </div>
    </Link>
  )
}

export default JobCardItem
