import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../store/action/types";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { services: [] };
  }
  componentDidMount() {
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
    const { services } = this.state;
    return (
      <div className="header-menu">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <nav className="nav-lr-padding navbar navbar-expand-lg">
                <Link to="/" className="navbar-brand">
                  {" "}
                  <img
                    className="navbar-brand"
                    src={window.location.origin + "/images/logo-hd.png"}
                    id="logo_custom"
                    alt="logo"
                    width="10%"
                  />
                </Link>
                <button
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                  className="navbar-toggler"
                >
                  <span className="navbar-toggler-icon" />
                </button>
                <div
                  id="navbarSupportedContent"
                  className="collapse navbar-collapse"
                >
                  <ul className="navbar-nav ml-auto">
                    <li className="nav-item active">
                      <Link to="/about" className="nav-link">
                        About <span className="sr-only">(current)</span>
                      </Link>
                    </li>
                    <li className="nav-item dropdown active">
                      <Link
                        to="/solutions"
                        className="nav-link"
                        data-toggle="dropdown"
                        id="navbarSolutionDropdown"
                      >
                        Solutions
                      </Link>
                      <div
                        aria-labelledby="navbarSolutionDropdown"
                        className="dropdown-menu"
                      >
                        {services.map((service, index) => (
                          <Link
                            replace
                            key={index}
                            to={"/solutions/" + service.slug}
                            className="dropdown-item"
                          >
                            {service.title_2}
                          </Link>
                        ))}
                      </div>
                    </li>
                    <li className="nav-item active">
                      <Link to="/dispatches" className="nav-link">
                        Dispatches
                      </Link>
                    </li>
                    {/* <li className="nav-item dropdown"><Link id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="nav-link dropdown-toggle">Dispatches</Link>
                        <div aria-labelledby="navbarDropdown" className="dropdown-menu"><a href="http://bloghypha.clickysoft.us/" className="dropdown-item">BLOG</a><Link className="dropdown-item">PRESS</Link>
                            <Link className="dropdown-item">CASE STUDIES</Link> </div>
                        </li> */}
                    <li className="nav-item">
                      <Link to="/contact" className="nav-link">
                        Contact
                      </Link>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
