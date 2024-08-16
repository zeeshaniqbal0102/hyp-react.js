import React from "react";
import axios from "axios";
import { API_URL } from "../store/action/types";
import { Link } from "react-router-dom";
import CircleLoader from "react-spinners/CircleLoader";
import { css } from "@emotion/core";
import ReactHtmlParser from "react-html-parser";
import Header from "./includes/Header";
import Footer from "./includes/Footer";

class Services extends React.Component {
  constructor() {
    super();
    this.state = {
      service: {},
      services_features: [],
      s_timeline_main: [],
      color: "#000000",
      loading: true
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    // if (this.props.match.params.service_name) {
      axios.get(API_URL + "/solutions/general" )
        .then(result => {
          if (result.data.success) {
             this.setState({
              service: result.data.services,
              services_features: result.data.services_features,
              s_timeline_main: result.data.s_timeline_main,
              color: result.data.services.title_color,
              loading: false
            });
          }
        })
        .catch(function (error) {
          alert("Could not fetch Contents");
        });
    // }
  }
  render() {

    const {
      service,
      color,
      services_features,
      s_timeline_main
    } = this.state;
    const numRows = services_features.length;
    const override = css`
      display: inline-block;
      border-color: #002a00;
    `;
    return (
      <>
        <style>
          {`.tabber-agency nav > div a.nav-item.nav-link.active .tab-inner {
            border: none;
            padding: 12px 0px;
            display: block;
            color: #002a00;
            background: transparent;
            width: 75px;
            height: 75px;
            margin: 0 auto;
            border-radius: 50%;

            border: 10px solid #CCFF00;
          }

          .tabber-agency nav > div a.nav-item.nav-link.active:after {
            content: "";
            position: relative;
            bottom: 0px;
            left: 0px;
            /* width: 10px; */
            /* height: 10px; */
            border: 5px solid transparent;

            background: #CCFF00;
            border-top-color: #CCFF00;
          }
          .tabber-agency .tab-content {
            background: transparent;
            line-height: 25px;
            border: 0px solid #ddd;
            padding: 0px 25px;
            padding-bottom: 10px
          }
          .tabber-agency nav > div a.nav-item.nav-link:hover .tab-inner {
            border: none;
            width: 75px;
            height: 75px;
            padding: 12px 0px;
            color: #002a00;
            border-radius: 50%;
            margin: 0 auto;
            transition: background 0.2s linear;
            border: 10px solid #CCFF00;
          }
          .tabber-agency nav > div a.nav-item.nav-link:focus .tab-inner {
            border: none;
            width: 75px;
            height: 75px;
            padding: 12px 0px;
            color: #002a00;
            border-radius: 50%;
            margin: 0 auto;
            transition: background 0.2s linear;
            border: 10px solid #CCFF00;
          }`}
        </style>
        <>
        <Header />
          {/*- Services Content Heading --*/}
          {this.state.loading ? (
            <div className="loader-div">
              <CircleLoader
                css={override}
                size={50}
                color={"#002A00"}
                loading={this.state.loading}
              />
            </div>

          ) : (
              <>
                <div
                  className="services-section"
                  style={{ borderBottom: `1px solid ${color}`, background: color }}
                >
                  <div className="container">
                    <div className="row">
                      <div className="srv-head">
                        <h2 style={{ color: service.font_color }}>
                         <Link to="/solutions-menu" style={{ color: service.font_color, textDecoration: "none" }}>{service.title_2}</Link> 
                          <span>
                            <Link
                              to="/solutions-menu"
                              style={{ color: service.font_color, textDecoration: "none" }}
                            > ▼
                      </Link>
                          </span>
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="services-intro"
                  style={{ borderBottom: `1px solid ${color}` }}
                >
                  <div className="container">
                    <div className="row">
                      <div className="col-md-6">
                        <p>{ReactHtmlParser(service.description_2)}</p>
                      </div>
                      <div className="col-md-6">
                        <div className="srv-hd-img">
                          <img src={service.image} className="img-fluid" alt={service.title_2} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/*-- Services Points ---*/}
                <div
                  className="services-points"
                  style={{ borderBottom: `1px solid ${color}` }}
                >
                  <div className="container">
                    {services_features.map((features, index) => {
                      return (
                        <>
                          {numRows !== ++index ? (
                            <div key={index}
                              className="row srv-pointer"
                              style={{
                                borderBottom: `1px solid ${color}`
                              }}
                            >
                              <div className="col-md-6">
                                <h2>{features.title}</h2>
                              </div>
                              <div className="col-md-6">
                                {ReactHtmlParser(features.description)}
                              </div>
                            </div>
                          ) : (
                              <div key={index} className="row srv-pointer">
                                <div className="col-md-6">
                                  <h2>{features.title}</h2>
                                </div>
                                <div className="col-md-6">
                                  {ReactHtmlParser(features.description)}
                                </div>
                              </div>
                            )}
                        </>
                      );
                    })}
                  </div>
                </div>
                {/*-- Services Points ---*/}
                <div className="srv-tabs">
                  {s_timeline_main.map((main, pindex) => {
                    return (
                      <div key={pindex}
                        className="container-fluid srv-tabs-row"
                        style={{ borderBottom: `1px solid ${color}` }}
                      >
                        <div className="container">
                          <div className="row">
                            <div className="col-md-4">
                              <div className="srv-tb-sec">
                                <h2>{main.title}</h2>
                                <p>{ReactHtmlParser(main.description)}</p>
                              </div>
                            </div>
                            <div className="col-md-8">
                              <div className="row tabber-agency">
                                <div className="col-md-12 ">
                                  <nav>
                                    <div
                                      className="nav nav-tabs nav-fill"
                                      id="nav-tab"
                                      role="tablist"
                                    >
                                      {main.services_details.map(
                                        (timeline, tindex) => {
                                          return (
                                            <a key={tindex}
                                              className={`nav-item nav-link${timeline.default_selection === 1 ? " active" : ""
                                                }`}
                                              id="nav-home-tab"
                                              data-toggle="tab"
                                              href={`#p${pindex}-t${tindex}`}
                                              role="tab"
                                              aria-controls="nav-home"
                                              aria-selected="true"
                                            >
                                              <div className="tab-inner">
                                                {timeline.time}
                                              </div>
                                            </a>
                                          );
                                        }
                                      )}
                                    </div>
                                  </nav>
                                  <div
                                    className="tab-content px-3 px-sm-0"
                                    id="nav-tabContent"
                                  >
                                    {main.services_details.map(
                                      (detail, tindex) => {
                                        return (
                                          <div key={tindex}
                                            className={`tab-pane fade${detail.default_selection === 1
                                              ? " show active"
                                              : ""
                                              }`}
                                            id={`p${pindex}-t${tindex}`}
                                            role="tabpanel"
                                            aria-labelledby="nav-home-tab"
                                          >
                                            <div
                                              style={{
                                                background: "#CCFF00",
                                                height: "10px",
                                                borderRadius: "8px",
                                                marginBottom: "25px"
                                              }}
                                            />
                                            <div className="row tab-btn">
                                              {detail.image_exist === 0 ? (
                                                <>
                                                  <div className="col-md-6">
                                                    {ReactHtmlParser(
                                                      detail.description_1
                                                    )}
                                                  </div>
                                                  <div className="col-md-6">
                                                    {ReactHtmlParser(
                                                      detail.description_2
                                                    )}
                                                  </div>
                                                </>
                                              ) : (
                                                  <>
                                                    <div className="col-md-5">
                                                      {ReactHtmlParser(
                                                        detail.description_1
                                                      )}
                                                    </div>
                                                    <div className="col-md-5">
                                                      {ReactHtmlParser(
                                                        detail.description_2
                                                      )}
                                                    </div>
                                                    <div className="col-md-2">
                                                      <img src={detail.image} alt={service.title_2} />
                                                    </div>
                                                  </>
                                                )}
                                            </div>
                                          </div>
                                        );
                                      }
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                </div>
              </>
            )}
            <Footer />
            </>
      </>
    );
  }
}

export default Services;
