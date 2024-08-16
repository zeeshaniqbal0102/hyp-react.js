import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../store/action/types";
import { css } from "@emotion/core";
import CircleLoader from "react-spinners/CircleLoader";
import Header from "./includes/Header";
import Footer from "./includes/Footer";

class ServicesMain extends React.Component {
  constructor() {
    super();
    this.state = {
      services: [],
      loading: true,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);

    axios
      .get(API_URL + "/solutions-menu")
      .then((result) => {
        if (result.data.success) {
          this.setState({
            services: result.data.services_menu,
            loading: false,
          });
        }
      })
      .catch(function (error) {
        alert("Could not get contents");
        console.log(error);
      });
  }
  render() {
    const override = css`
      display: inline-block;
      border-color: #002a00;
    `;
    const { services } = this.state;
    return (
      <>
        <Header />
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
          <div className="services-main-menu">
            {services.map((serv, index) => {
              return (
                <div
                  className="srvmain"
                  style={{ background: serv.title_color }}
                >
                  <div className="container">
                    <div className="row">
                      <div className="col-md-12">
                        {" "}
                        <Link
                          style={{ color: serv.font_color }}
                          to={"/solutions/" + serv.slug}
                        >
                          {serv.title_2} <span>▼</span>
                        </Link>{" "}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <Footer />
      </>
    );
  }
}
export default ServicesMain;
