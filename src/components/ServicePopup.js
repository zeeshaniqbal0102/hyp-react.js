import React, { Component } from 'react';
import parse from 'html-react-parser';
import axios from 'axios';
import { API_URL } from "../store/action/types";
import Anchor from "../components/includes/Anchor";
import { css } from "@emotion/core";
import CircleLoader from "react-spinners/CircleLoader";
import { Link } from 'react-router-dom';

export default class ServicePopup extends Component {

  constructor() {
    super();
    this.state = {
      segment_details: {},
      loading: true,
    }
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    if (this.props.match.params.service_name) {
      axios.get(API_URL + "/segment/" + this.props.match.params.service_name).then(result => {
        if (result.data.success) {
          console.log(result);
          this.setState({
            segment_details: result.data.segment_details,
            loading: false,
          })
        }
      })
        .catch(function (error) {
          alert("Could not get contents");
          this.setState({
            loading: false
          });

        });
    }
  }
  render() {
    const override = css`
      display: inline-block;
      border-color: #002A00;
    `;
    const { segment_details } = this.state;
    return (
      <>
        {this.state.loading ? <div className="loader-div"><CircleLoader
          css={override}
          size={50}
          color={"#002A00"}
          loading={this.state.loading}
        /></div> :
          <div className="segment-popup">
            <div className="hm-lmore">
              <div className="container">
                <div className="row">
                  <div className="col-md-12"> I am: <Link to={'/solutions/' + segment_details.slug} style={{ paddingBottom: '8px', borderBottom: '4px solid' + segment_details.title_color, color: segment_details.title_color }}>{parse(String(segment_details.desc_segment_1))} </Link> seeking to <Link to={'/solutions/' + segment_details.slug} style={{ paddingBottom: '8px', borderBottom: '4px solid' + segment_details.title_color, color: segment_details.title_color }}>{parse(String(segment_details.desc_segment_2))}</Link>
                  </div>
                  <div className="col-md-12">
                    <div className="hm-lm-go">
                      <Anchor
                        linkType={1}
                        link={'/services/' + segment_details.slug}
                        text={segment_details.btn_text}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      </>
    );
  }
}
