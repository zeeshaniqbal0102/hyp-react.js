import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { API_URL } from "../../store/action/types";

class Footer extends Component {
  constructor() {
    super();
    this.state = {
      contact_social: [],
    }
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    axios.get(API_URL + "/contact-us").then(result => {
      if (result.data.success) {
        this.setState({
          contact: result.data.contact,
          contact_social: result.data.contact_social,
        })
      }
    })
      .catch(function (error) {
        alert("Could not get contents");
        // handle error
        console.log(error);
      });
  }
  redirectToExternalURL = (url) => {
    window.open(url);
  };

  render() {
    const { contact_social } = this.state;
    return <div className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <h3>Contact</h3>
            <Link to="/contact">Contact</Link>
            {contact_social.map((socials, index) => {
              return (
                <p onClick={() => {
                  this.redirectToExternalURL(
                    socials.social_link
                  );
                }} key={index}>{socials.social_title}</p>
              );
            }
            )}
          </div>
          <div className="col-md-3">
            <h3>Solutions</h3>
            <Link to="/solutions">Learn More</Link> </div>
          <div className="col-md-3">
            <h3>Company</h3>
            <Link to="/about">About Us</Link> </div>
          <div className="col-md-3">
            <Link to="/dispatches" className="dispatch-a"><h3>Dispatches</h3></Link>
            {/* <a href="http://bloghypha.clickysoft.us/">Blog</a>
            <Link>Press</Link>
            <Link>Case Studies</Link>*/} </div>
        </div>
      </div>
    </div>;
  }
}

export default Footer;
