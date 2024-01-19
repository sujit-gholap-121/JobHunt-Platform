import {FaStar} from 'react-icons/fa'
import {MdLocationOn, MdWork} from 'react-icons/md'
import './index.css'

const SimilarJobsCardItem = props => {
  const {item} = props
  return (
    <li className="similar-items">
      <div className="similar-top">
        <img
          className="simi-img"
          alt="similar job company logo"
          src={item.company_logo_url}
        />
        <div className="simi1">
          <h1 className="simi-head">{item.title}</h1>
          <div className="simi-right">
            <FaStar />
            <p>{item.rating}</p>
          </div>
        </div>
      </div>
      <h1 className="head3">Description</h1>
      <p className="para2">{item.job_description}</p>
      <div className="middle-start">
        <MdLocationOn />
        <p>{item.location}</p>
        <MdWork />
        <p>{item.employment_type}</p>
      </div>
    </li>
  )
}

export default SimilarJobsCardItem
