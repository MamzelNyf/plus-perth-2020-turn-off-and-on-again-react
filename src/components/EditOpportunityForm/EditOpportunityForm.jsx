import React, { useState, useEffect } from "react"
import { useParams, useHistory } from "react-router-dom"

function EditOpportunityForm() {
  //variables
  const [opportunityData, setopportunityData] = useState({
    title: "",
    start_date: "",
    audience: "",
    level: "",
    type: "",
    location: "",
    website: "",
    description: "",
    apply_by_date: "",
    is_open: true,
    //   date_created: "2020-09-09T20:31:00Z",
  })
  const { id } = useParams()

  const history = useHistory()
  const token = window.localStorage.getItem("token")

  //methods
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}PostOpportunityPage/${id}`)
      .then((results) => {
        return results.json()
      })
      .then((data) => {
        setopportunityData(data)
      })
  }, [id])

  const handleChange = (e) => {
    const { id, value } = e.target
    setopportunityData((data) => ({
      ...data,
      [id]: value,
    }))
  }

  const postData = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}OpportunityListPage/${id}/`,
      {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${token}`,
        },
        body: JSON.stringify({
          title: opportunityData.title,
          start_date: opportunityData.start_date,
          audience: opportunityData.audience,
          level: opportunityData.level,
          type: opportunityData.type,
          location: opportunityData.location,
          website: opportunityData.website,
          description: opportunityData.description,
          apply_by_date: opportunityData.apply_by_date,
          image: opportunityData.image,
          is_open: opportunityData.is_open,
        }),
      }
    )
    return response.json()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (true) {
      postData()
        .then((response) => {
          history.push(`/PostOpportunityPage/${id}`)
          // console.log(response);
        })
        .catch((error) => {
          alert("There is an error in your request")
        })
    }
  }

  //template
  return (
    <form>
      <div>
        <label htmlFor="image">Uplaod your image:</label>
        <input
          type="file"
          id="image"
          placeholder="Image"
          onChange={handleChange}
          accept="image/*"
          value={opportunityData.image}
        />
      </div>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          placeholder="Enter Opportunity Title"
          onChange={handleChange}
          value={opportunityData.title}
        />
      </div>
      <div>
        <label for="start_date">Start Date:</label>
        <input
          type="date"
          id="start"
          name="start-date"
          value="2020-01-01"
          min="2020-01-01"
          max="2021-12-31"
          onChange={handleChange}
          value={opportunityData.start_date}
        />
      </div>
      <div>
        <label htmlFor="is_open">Audience:</label>
        <input
          type="checkbox"
          id="is_open"
          placeholder="is_open"
          onChange={handleChange}
          value={opportunityData.is_open}
        />
      </div>
      <div>
        <label htmlFor="is_open">Level:</label>
        <input
          type="checkbox"
          id="is_open"
          placeholder="is_open"
          onChange={handleChange}
          value={opportunityData.is_open}
        />
      </div>
      <div>
        <label htmlFor="is_open">Type:</label>
        <input
          type="checkbox"
          id="is_open"
          placeholder="is_open"
          onChange={handleChange}
          value={opportunityData.is_open}
        />
      </div>
      <div>
        <label htmlFor="is_open">Location:</label>
        <input
          type="checkbox"
          id="is_open"
          placeholder="is_open"
          onChange={handleChange}
          value={opportunityData.location}
        />
      </div>
      <div>
        <label htmlFor="website">Website:</label>
        <input
          type="text"
          id="website"
          placeholder="Enter website link"
          onChange={handleChange}
          value={opportunityData.website}
        />
      </div>
      <div>
        <label htmlFor="eligibility">Eligibility:</label>
        <input
          type="text"
          id="eligibility"
          placeholder="Enter eligibility requirements"
          onChange={handleChange}
          value={opportunityData.eligibility}
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          placeholder="Description"
          onChange={handleChange}
          value={opportunityData.description}
        />
      </div>
      <div>
        <label for="apply_by_date">Apply by Date:</label>
        <input
          type="date"
          id="apply_by_date"
          name="apply_by_date"
          value="2020-01-01"
          min="2020-01-01"
          max="2021-12-31"
          onChange={handleChange}
          value={opportunityData.apply_by_date}
        />
      </div>
      <div>
        <label htmlFor="is_open">Project Open:</label>
        <input
          type="checkbox"
          id="is_open"
          placeholder="is_open"
          onChange={handleChange}
          value={opportunityData.is_open}
        />
      </div>
      <button type="submit" onClick={handleSubmit}>
        Save
      </button>
    </form>
  )
}

export default EditOpportunityForm
