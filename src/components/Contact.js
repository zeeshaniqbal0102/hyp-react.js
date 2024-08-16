import React, { Component } from "react";
import axios from 'axios';
import { API_URL } from "../store/action/types";
import { css } from "@emotion/core";
import CircleLoader from "react-spinners/CircleLoader";
import Header from "./includes/Header";
import Footer from "./includes/Footer";


class Contact extends Component {

  constructor() {
    super();
    this.state = {
      contact: {},
      contact_social: [],
      loading: true,
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    axios.get(API_URL + "/contact-us").then(result => {
      if (result.data.success) {
        this.setState({
          contact: result.data.contact,
          contact_social: result.data.contact_social,
          loading: false,
        })
      }
    })
      .catch(function (error) {
        alert("Could not get contents");
        this.setState({
          loading: false,
        });
      });
  }

  render() {
    const { contact, contact_social } = this.state;
    const numRows = contact_social.length;
    const override = css`
  display: inline-block;
  border-color: #002A00;
`;

    return (
      <>
      <Header />
        {this.state.loading ?
          <div className="loader-div"><CircleLoader
            css={override}
            size={50}
            color={"#002A00"}
            loading={this.state.loading}
          />
          </div> :
          <>
            <div className="abt-bg-top">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-12 nlrp"
                  // style={{backgroundImage:"url("+contact.image+")",height:"810px"}}
                  >
                    <img src={contact.image} className="img-fluid" alt={contact.image} />
                  </div>
                </div>
              </div>
            </div>
            <div className="cntsec">
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <h3>Contact</h3>
                    <p> <a href={"mailto:" + contact.email} className="email"><span>{contact.email}</span> </a></p>
                    <p>
                      {contact_social.map((socials, index) => {
                        return (
                          <>
                            {numRows !== ++index ?
                              (
                                <><a href={socials.social_link} className="smedia" key={index}>{socials.social_title}</a> <span style={{ color: "#005D00" }}>•</span> </>
                              ) : (
                                <a href={socials.social_link} className="smedia" key={index}>{socials.social_title}</a>
                              )
                            }
                          </>
                        );
                      }
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        }
         <Footer />
      </>

    );
  }
}
export default Contact;