import React from "react";
import axios from "axios";
import { API_URL } from "../store/action/types";
import parse from "html-react-parser";
import { css } from "@emotion/core";
import CircleLoader from "react-spinners/CircleLoader";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Header from "./includes/Header";
import Footer from "./includes/Footer";
// import "../assets/css/js_composer.min.css";

class About extends React.Component {
  constructor() {
    super();
    this.state = {
      about_page: {},
      about_features: [],
      team_members: [],
      loading: true,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    window.jQuery(document).off("click", ".panel");
    window.jQuery(function ($) {
      $(document).on("click", ".panel", function (e) {
        e.preventDefault();
        if ($(this).hasClass("show")) {
          $(this).removeClass("show");
          $(this).find("i").removeClass("fa-caret-up");
          $(this).find("i").addClass("fa-caret-down");
          $(this).next().slideUp();
        } else {
          $(this).addClass("show");
          $(this).find("i").removeClass("fa-caret-down");
          $(this).find("i").addClass("fa-caret-up");
          $(this).next().slideDown();
        }
        // $(this).next().slideToggle('slow');
        // $(this).parent().siblings().find('.panel-content').slideUp();
      });
    });

    axios
      .get(API_URL + "/about")
      .then((result) => {
        if (result.data.success) {
          this.setState({
            about_page: result.data.about,
            about_features: result.data.about_features,
            team_members: result.data.team,
            loading: false,
          });
        }
      })
      .catch(function (error) {
        alert("Could not get contents");
        // this.setState({
        //   loading: false
        // });
      });
  }

  render() {
    const override = css`
      display: inline-block;
      border-color: #002a00;
    `;
    let members = "";
    const { about_page, about_features, team_members } = this.state;
    if (!this.state.loading) {
      const responsive = {
        0: {
          items: 1,
        },
        450: {
          items: 2,
        },
        600: {
          items: 3,
        },
        1000: {
          items: 4,
        },
      };
      members = (
        <div className="abt-team-mmbr">
          <div class="abt-team-mmbr-line"></div>
          <div className="container">
            <div className="row">
              <OwlCarousel
                className="owl-theme"
                margin={20}
                autoplay={true}
                responsive={responsive}
              >
                {/* <div className="col-md-2 nlrp" /> */}
                {team_members.map((members, index) => {
                  return (
                    <div className="col-md-12 nlrp" key={index}>
                      <div className="team-mmbr team-mmbr-lft-bdr">
                        <div className="team-mmbr-img">
                          <a href={members.profile_url} target="_blank">
                            <img
                              src={members.image}
                              className="img-fluid"
                              alt={about_page.main_title}
                            />
                          </a>
                        </div>
                        <div className="team-mmbr-nm">
                          <h4>{members.name}</h4>
                          <p>{members.designation}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </OwlCarousel>
            </div>
          </div>
          <div class="abt-team-mmbr-line"></div>
        </div>
      );
    }

    return (
      <>
        <Header />
        {this.state.loading ? (
          <>
            <div className="loader-div">
              <CircleLoader
                css={override}
                size={50}
                color={"#002A00"}
                loading={this.state.loading}
              />
            </div>
          </>
        ) : (
          <>
            {/* <div className="abt-bg-top">
          <div className="container-fluid nlrp">
            <div className="row">
              <div className="col-md-12">
              <img src={about_page.image_1} className="img-fluid" alt={about_page.main_title}/>
              </div>
            </div>
          </div>
          <div className="video-background-content">
            <div className="d-flex h-100 text-center align-items-center">
            </div>
            <div className="w-100 text-about">
                <h1 className="display-4">{about_page.main_title}</h1>
            </div>
          </div>
        </div> */}

            {/* Old Video Block - Start */}
            {/* <div className="video-background-holder">
              <div className="video-background-overlay" />
              <video
                playsInline="playsinline"
                autoPlay
                muted="muted"
                loop
                poster="images/about.jpg"
              >
                /* <source src={'https://backend.hypha.clickysoft.us/public/about/about.webm'} type="video/mp4" /> 
                <source src={about_page.image_1} type="video/mp4" />
              </video>

              <div className="video-background-content container h-100">
                <div className="d-flex h-100 text-center align-items-center">
                  <div className="w-100 text-about">
                    <h1 className="display-4">{about_page.main_title}</h1>
                  </div>
                </div>
              </div>
            </div> */}
            {/* Old Video Block - End */}
            {/* New Video Block - Start */}
            <div class="video-header-container">
              <div class="video-container">
                <video
                  className="about-video"
                  playsInline="playsinline"
                  autoPlay
                  muted="muted"
                  loop
                  poster="images/about.jpg"
                >
                  {/* <source src={'https://backend.hypha.clickysoft.us/public/about/about.webm'} type="video/mp4" />  */}
                  <source src={about_page.image_1} type="video/mp4" />
                </video>
              </div>
              <div class="text-container">
                <div class="text-wrapper">{about_page.main_title}</div>
              </div>
            </div>
            {/* New Video Block - End*/}
            <div className="abt-tp-content">
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    {parse(String(about_page.description_1))}
                  </div>
                </div>
              </div>
            </div>
            <div className="aboutsec">
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <div className="abt-mid">
                      {parse(String(about_page.description_2))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="abt-tp-content">
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    {parse(String(about_page.description_3))}
                  </div>
                </div>
              </div>
            </div>
            {/*- About We Are --*/}
            <div className="abt-wa">
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <div className="abt-wa-hd">
                      <h3>We are</h3>
                      {about_features.map((features, index) => {
                        return (
                          <div class="accordion" key={index}>
                            <div class="panel">
                              <p>
                                {features.title}{" "}
                                <i class="fa fa-caret-down"></i>
                              </p>
                            </div>
                            <div class="panel-content">
                              <p>{features.description}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*- About The Team -*/}
            <div className="abt-team">
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <div className="abt-team-cnt">
                      {parse(String(about_page.team_description))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* team carousel */}
            {members}
            {/*- The Hypha Advisory Board --*/}
            <div className="adv-board">
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <h3>{about_page.board_heading}</h3>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    {parse(String(about_page.board_decription))}
                  </div>
                  <div className="col-md-4">
                    {parse(String(about_page.board_decription))}
                  </div>
                  <div className="col-md-4">
                    {parse(String(about_page.board_decription))}
                  </div>
                </div>
              </div>
            </div>
            {/*- The Hypha Advisory Board Ends--*/}
          </>
        )}
        <Footer />
      </>
    );
    /*return (
      <>
        {parse(
          '<div id="fws_5f7b683e2c866" data-midnight="dark" data-bg-mobile-hidden="" class="wpb_row vc_row-fluid vc_row standard_section " style="padding-top: 0px; padding-bottom: 0px; "><div class="row-bg-wrap"><div class="inner-wrap"><div class="row-bg " style=""></div></div><div class="row-bg-overlay" ></div></div><div class="col span_12 dark left"> <div class="vc_col-sm-8 wpb_column column_container vc_column_container col no-extra-padding" data-t-w-inherits="default" data-border-radius="none" data-shadow="none" data-border-animation="" data-border-animation-delay="" data-border-width="none" data-border-style="solid" data-border-color="" data-bg-cover="" data-padding-pos="all" data-has-bg-color="false" data-bg-color="" data-bg-opacity="1" data-hover-bg="" data-hover-bg-opacity="1" data-animation="" data-delay="0"><div class="column-bg-overlay"></div> <div class="vc_column-inner"> <div class="wpb_wrapper"> <div class="wpb_text_column wpb_content_element " > <div class="wpb_wrapper"> <h2>&#8220;Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</h2> </div> </div> </div> </div> </div> <div class="vc_col-sm-4 wpb_column column_container vc_column_container col no-extra-padding" data-t-w-inherits="default" data-border-radius="none" data-shadow="none" data-border-animation="" data-border-animation-delay="" data-border-width="none" data-border-style="solid" data-border-color="" data-bg-cover="" data-padding-pos="all" data-has-bg-color="false" data-bg-color="" data-bg-opacity="1" data-hover-bg="" data-hover-bg-opacity="1" data-animation="" data-delay="0"><div class="column-bg-overlay"></div> <div class="vc_column-inner"> <div class="wpb_wrapper"> </div> </div> </div> </div></div> <div id="fws_5f7b683e2d959" data-midnight="dark" data-top-percent="4%" data-bg-mobile-hidden="" class="wpb_row vc_row-fluid vc_row standard_section " style="padding-top: calc(100vw * 0.04); padding-bottom: 0px; "><div class="row-bg-wrap"><div class="inner-wrap"><div class="row-bg " style=""></div></div><div class="row-bg-overlay" ></div></div><div class="col span_12 dark left"> <div class="vc_col-sm-8 wpb_column column_container vc_column_container col no-extra-padding" data-t-w-inherits="default" data-border-radius="none" data-shadow="none" data-border-animation="" data-border-animation-delay="" data-border-width="none" data-border-style="solid" data-border-color="" data-bg-cover="" data-padding-pos="all" data-has-bg-color="false" data-bg-color="" data-bg-opacity="1" data-hover-bg="" data-hover-bg-opacity="1" data-animation="" data-delay="0"><div class="column-bg-overlay"></div> <div class="vc_column-inner"> <div class="wpb_wrapper"> <div class="wpb_text_column wpb_content_element " > <div class="wpb_wrapper"> <h4>&#8220;Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?&#8221;</h4> </div> </div> </div> </div> </div> <div class="vc_col-sm-4 wpb_column column_container vc_column_container col no-extra-padding" data-t-w-inherits="default" data-border-radius="none" data-shadow="none" data-border-animation="" data-border-animation-delay="" data-border-width="none" data-border-style="solid" data-border-color="" data-bg-cover="" data-padding-pos="all" data-has-bg-color="false" data-bg-color="" data-bg-opacity="1" data-hover-bg="" data-hover-bg-opacity="1" data-animation="" data-delay="0"><div class="column-bg-overlay"></div> <div class="vc_column-inner"> <div class="wpb_wrapper"> </div> </div> </div> </div></div> <div id="fws_5f7b683e2e389" data-midnight="dark" data-top-percent="7%" data-bottom-percent="7%" data-bg-mobile-hidden="" class="wpb_row vc_row-fluid vc_row full-width-content standard_section " style="padding-top: calc(100vw * 0.07); padding-bottom: calc(100vw * 0.07); "><div class="row-bg-wrap"><div class="inner-wrap"><div class="row-bg " style=""></div></div><div class="row-bg-overlay" ></div></div><div class="col span_12 dark left"> <div class="vc_col-sm-12 wpb_column column_container vc_column_container col no-extra-padding" data-t-w-inherits="default" data-border-radius="none" data-shadow="none" data-border-animation="" data-border-animation-delay="" data-border-width="none" data-border-style="solid" data-border-color="" data-bg-cover="" data-padding-pos="all" data-has-bg-color="false" data-bg-color="" data-bg-opacity="1" data-hover-bg="" data-hover-bg-opacity="1" data-animation="" data-delay="0"><div class="column-bg-overlay"></div> <div class="vc_column-inner"> <div class="wpb_wrapper"> <div class="vc_separator wpb_content_element vc_separator_align_center vc_sep_width_100 vc_sep_pos_align_center vc_sep_color_black" ><span class="vc_sep_holder vc_sep_holder_l"><span class="vc_sep_line"></span></span><span class="vc_sep_holder vc_sep_holder_r"><span class="vc_sep_line"></span></span> </div> </div> </div> </div> </div></div> <div id="fws_5f7b683e2f1b5" data-midnight="dark" data-bg-mobile-hidden="" class="wpb_row vc_row-fluid vc_row standard_section " style="padding-top: 0px; padding-bottom: 0px; "><div class="row-bg-wrap"><div class="inner-wrap"><div class="row-bg " style=""></div></div><div class="row-bg-overlay" ></div></div><div class="col span_12 dark left"> <div class="vc_col-sm-8 wpb_column column_container vc_column_container col no-extra-padding" data-t-w-inherits="default" data-border-radius="none" data-shadow="none" data-border-animation="" data-border-animation-delay="" data-border-width="none" data-border-style="solid" data-border-color="" data-bg-cover="" data-padding-pos="all" data-has-bg-color="false" data-bg-color="" data-bg-opacity="1" data-hover-bg="" data-hover-bg-opacity="1" data-animation="" data-delay="0"><div class="column-bg-overlay"></div> <div class="vc_column-inner"> <div class="wpb_wrapper"> <div class="img-with-aniamtion-wrap center" data-max-width="100%" data-border-radius="none"><div class="inner"><img data-shadow="none" data-shadow-direction="middle" class="img-with-animation skip-lazy " data-delay="0" height="1280" width="1920" data-animation="fade-in" src="https://bloghypha.clickysoft.us/wp-content/uploads/2020/08/pexels-photo-716276-1.jpeg" srcset="https://bloghypha.clickysoft.us/wp-content/uploads/2020/08/pexels-photo-716276-1.jpeg 1920w, https://bloghypha.clickysoft.us/wp-content/uploads/2020/08/pexels-photo-716276-1-300x200.jpeg 300w, https://bloghypha.clickysoft.us/wp-content/uploads/2020/08/pexels-photo-716276-1-1024x683.jpeg 1024w, https://bloghypha.clickysoft.us/wp-content/uploads/2020/08/pexels-photo-716276-1-768x512.jpeg 768w, https://bloghypha.clickysoft.us/wp-content/uploads/2020/08/pexels-photo-716276-1-1536x1024.jpeg 1536w, https://bloghypha.clickysoft.us/wp-content/uploads/2020/08/pexels-photo-716276-1-900x600.jpeg 900w" sizes="100vw" alt="" /></div></div> </div> </div> </div> <div class="vc_col-sm-4 wpb_column column_container vc_column_container col no-extra-padding" data-t-w-inherits="default" data-border-radius="none" data-shadow="none" data-border-animation="" data-border-animation-delay="" data-border-width="none" data-border-style="solid" data-border-color="" data-bg-cover="" data-padding-pos="all" data-has-bg-color="false" data-bg-color="" data-bg-opacity="1" data-hover-bg="" data-hover-bg-opacity="1" data-animation="" data-delay="0"><div class="column-bg-overlay"></div> <div class="vc_column-inner"> <div class="wpb_wrapper"> <div class="wpb_text_column wpb_content_element " > <div class="wpb_wrapper"> <p>Image Description &#8211; Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium</p> </div> </div> </div> </div> </div> </div></div>'
        )}
      </>
    );*/
  }
}

export default About;
