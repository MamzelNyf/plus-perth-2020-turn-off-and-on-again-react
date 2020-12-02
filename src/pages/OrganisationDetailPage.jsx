import React, { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import ReactLoading from "react-loading"
import OpportunityCard from "../components/OpportunityCard/OpportunityCard";



function OrganisationDetailPage() {
  const [organisationData, setorganisationData] = useState({
    loading: true,
  })
  const [opportunityList, setOpportunityList] = useState({
    loading: true
  });
  const { slug } = useParams()

  useEffect(() => {
    // console.log("slug", slug)
    fetch(`${process.env.REACT_APP_API_URL}organisations/${slug}`)
      .then((results) => {
        return results.json()
      })
      .then((data) => {
        // console.log("hello", data)
        setorganisationData(data)
      })
  }, [slug])

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}listing/`)
        .then((results) => {
            return results.json();
        })
        .then((data) => {
            setOpportunityList(data);
        });
}, []);

if (opportunityList.loading) {
    return  <ReactLoading className = "bubbles" type = { "Bubbles" } color = { "#FE4A49" }/>
}


  //show edit button if the logged in user organisation is the same as the page loaded
  //or if admin is logged in
  let canEdit = false
  if (
    window.localStorage.getItem("organisation") ===
      organisationData.organisation ||
    window.localStorage.getItem("username") === "admin"
  ) {
    canEdit = true
  }
  // console.log("can edit is", canEdit)

  // const deleteData = async () => {
  //   const response = await fetch(
  //     `${process.env.REACT_APP_API_URL}organisations/${slug}`,
  //     {
  //       method: "delete",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Token ${token}`,
  //       },
  //     }
  //   )
  //   history.push("/")
  // }

  if (organisationData.loading) {
      return  <ReactLoading className = "bubbles" type = { "Bubbles" } color = { "#FE4A49" }/>
  }

  return (
      <div className="mainContent"> 
        <div className="detail-box">
          <img src={organisationData.logo} alt="organisation" />
          <h2>{organisationData.organisation}</h2>
          <a href={organisationData.website}>{organisationData.website}</a>
          <p>{organisationData.description}</p>
          {canEdit ? <Link className="button-link" to={`/organisations/${slug}/edit`}>Edit</Link> : ""}
          <br/>
          <h3>My opportunities:</h3>
            <div  >
                {opportunityList.map((opportunityData, key) => {
                  if(opportunityData.organisation === organisationData.slug){
                    console.log(opportunityData.organisation)
                    console.log(organisationData.slug)
                    return <OpportunityCard key={key} opportunityData={opportunityData}/>;}
                    else {return null}
                    }) 
                } 
          </div> 
        </div>
    </div>

  )
}

export default OrganisationDetailPage
