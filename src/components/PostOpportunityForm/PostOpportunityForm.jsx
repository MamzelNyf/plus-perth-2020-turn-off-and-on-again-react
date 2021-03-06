import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import ReactLoading from "react-loading"
import Checkbox from "../Checkbox/Checkbox"


function PostOpportunityForm() {
  const organisation = window.localStorage.getItem("organisation")
  console.log(organisation)
  const today = new Date()
  const todayDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  //variables
  const [credentials, setCredentials] = useState({
      title: "",
      description: "",
      date_created: todayDate,
      start_date: "",
      apply_by_date: "",
      eligibility: "",
      typeList: [],
      location: [],
      level: [],
      audience: [],
      organisation: organisation
  })

  const history = useHistory()
  const token = window.localStorage.getItem("token")

  const [typeList, setTypeList] = useState([])
  const [locationList, setLocationList] = useState([])
  const [audienceList, setAudienceList] = useState([])
  const [levelList, setLevelList] = useState([])
  const [isLoading, setIsLoading] = useState (true)
  const [hasError, setErrors] = useState(false)

  
  useEffect(() => {
      async function fetchTypes() {
          try {
              const r = await fetch(`${process.env.REACT_APP_API_URL}types/`);
              const type = await r.json()
              setTypeList(type)
          } catch (error) {
              setErrors(error)
          }
      }
      async function fetchLocations() {
          try {
              const r = await fetch(`${process.env.REACT_APP_API_URL}locations/`);
              const locations = await r.json()
              setLocationList(locations)
          } catch (error) {
              setErrors(error)
          }
      }
      async function fetchAudiences() {
          try {
              const r = await fetch(`${process.env.REACT_APP_API_URL}audiences/`);
              const audiences = await r.json()
              setAudienceList(audiences)
          } catch (error) {
              setErrors(error)
          }
      }
      async function fetchLevels() {
      try {
          const r = await fetch(`${process.env.REACT_APP_API_URL}levels/`);
          const levels = await r.json()
          setLevelList(levels)
      } catch (error) {
          setErrors(error)
      }
      }
      // Promise allows to run multiple functions in parallel
      Promise.all([
          fetchTypes(),
          fetchLocations(),
          fetchAudiences(),
          fetchLevels()
      ]).then(() => setIsLoading(false))
  },[]);

  const postData = async () => {
    let form_data = new FormData();
    form_data.append('image', credentials.image);
    form_data.append('title', credentials.title);
    form_data.append('description', credentials.description);
    form_data.append('date_created', credentials.date_created);
    form_data.append('start_date', credentials.start_date);
    form_data.append('apply_by_date', credentials.apply_by_date);
    form_data.append('link', credentials.link);
    form_data.append('eligibility', credentials.eligibility);
    // form_data.append('owner', credentials.owner);
    credentials.typeList.forEach(t => form_data.append('typeList', t))
    credentials.location.forEach(t => form_data.append('location', t))
    credentials.level.forEach(t => form_data.append('level', t))
    credentials.audience.forEach(t => form_data.append('audience', t))
    form_data.append('organisation', credentials.organisation);

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}listing/`,
      {
        method: "post",
        headers: {
          Authorization: `token ${token}`,
        },
        body: form_data,
      }
    )
    return response.json()
  }
  //methods
const handleSubmit = (e) => {
    e.preventDefault();
    postData()
      .then((response) => {
        history.push("/")
        //  console.log(response);
    })
    .catch((error) => {
      alert("you have not completed the form")
    })
  
  };

const handleChange = (e) => {
    const { id, value } = e.target
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [id]: value,
    }))
  }
const handleChangeImage = (e) => {
  e.persist();
  setCredentials((prevCredentials) => ({
    ...prevCredentials,
    image: e.target.files[0],
  }));
};

const handleCheckbox = ({name, stateKey, checked}) => {
  // console.log(name,stateKey,checked)
  let nextValue = [...credentials[stateKey]]
  if (checked){
    nextValue.push(name) 
  } else {
    nextValue = nextValue.filter(item => item !== name)
  }
  setCredentials({
    ...credentials, 
    [stateKey]: nextValue
  })
}
        
  if ( isLoading) {
    return  <ReactLoading className = "bubbles" type = { "Bubbles" } color = { "#FE4A49" }/>
} 
  //template
  return (
    <div className="medium-form">
    <form>
    {hasError? <span>Has error: {JSON.stringify(hasError)}</span> : null }
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          placeholder="Enter Opportunity Title"
          onChange={handleChange}
          value={credentials.title}
        />
      </div>
      <div>
        <label htmlFor="image">Upload your image:</label>
        <input
          type="file"
          id="image"
          placeholder="Image"
          onChange={handleChangeImage}
          accept="image/*"
        />
      </div>
      <div>
        <label htmlFor="start_date">This opportunity starts on:</label>
        <input
          type="date"
          id="start_date"
          name="start_date"
          onChange={handleChange}
          value={credentials.start_date}
          placeholder="Choose a date"
        />
      </div>
      <div>
        <label htmlFor="audiences">Choose an audience:</label>
        <br/>    
        <div className="checkList">
        <span>{audienceList.map((listData, key) => {
              return <Checkbox formData={credentials} formKey={"audience"} listData={listData} key={key} handleCheckbox={handleCheckbox}/>})}
        </span>
        </div>
      </div>
      <div>
        <label htmlFor="locations">Choose a location:</label>
        <br/>    
        <div className="checkList">
        <span>{locationList.map((listData, key) => {
          return <Checkbox formData={credentials} formKey={"location"} listData={listData} key={key} handleCheckbox={handleCheckbox}/>})}
        </span>
        </div>
      </div>
      <div>
        <label htmlFor="types">Choose a type:</label>
        <br/>    
        <div className="checkList">
        <span>{typeList.map((listData, key) => {
          return <Checkbox formData={credentials} formKey={"typeList"} listData={listData} key={key} handleCheckbox={handleCheckbox}/>})}
        </span>
        </div>
      </div>
      <div>
        <label htmlFor="levels">Choose a level:</label>
        <br/>    
        <div className="checkList">
        <span>{levelList.map((listData, key) => {
          return <Checkbox formData={credentials} formKey={"level"} listData={listData} key={key} handleCheckbox={handleCheckbox}/>})}
        </span>
        </div>
      </div>
      <div>
        <label htmlFor="weblink">Register to this opportunity online:</label>
        <input
          type="text"
          id="weblink"
          placeholder="Enter website link"
          onChange={handleChange}
          value={credentials.link}
        />
      </div>
      <div>
        <label htmlFor="eligibility">Eligibility:</label>
        <input
          type="text"
          id="eligibility"
          placeholder="Enter eligibility requirements"
          onChange={handleChange}
          value={credentials.eligibility}
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          type="text"
          id="description"
          placeholder="Description"
          onChange={handleChange}
          value={credentials.description}
          rows="10"
        />
      </div>
      <div>
        <label htmlFor="apply_by_date">Application to validate before:</label>
        <input
          type="date"
          id="apply_by_date"
          name="apply_by_date"
          min="2020-01-01"
          max="2021-12-31"
          placeholder="Choose a date"
          onChange={handleChange}
          value={credentials.apply_by_date}
        />
      </div>

      <button type="submit" onClick={handleSubmit}>
        Create an Opportunity
      </button>
    </form>
    </div>
  )
}

export default PostOpportunityForm
