import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from "../store/action/types";

class Segment extends React.Component {

  constructor() {
    super();
    this.state = {
      services_segment: []
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);

    axios.get(API_URL + "/segment-popup").then(result => {
      if (result.data.success) {
        this.setState({
          services_segment: result.data.main_segment
        })
        console.log(result.data.main_segment);
      }
    })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }
  render() {
    const { services_segment } = this.state;
    return (
      <div className="segment-bg">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="segment-inner">
                <div className="row">
                  <div className="col-md-2">
                    <h1>I am</h1>
                  </div>
                  <div className="col-md-10">
                    <div className="seg-links-main">

                      {services_segment.map((segment, index) => {
                        return (
                          <div className="row">
                            <div className="col-md-12">
                              <Link to={"segment/" + segment.slug} style={{ paddingBottom: '8px', borderBottom: '4px solid ' + segment.title_color }}>{segment.title_1}</Link>
                            </div>
                          </div>
                        )
                      }
                      )}

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      //         <div className="segment-bg">
      //   <div className="container">
      //     <div className="row">
      //       <div className="col-md-12">
      //         <div className="segment-inner">
      //           <div className="row">
      //             <div className="col-md-2">
      //               <h1>I am</h1>
      //             </div>
      //             <div className="col-md-10">
      //               <div className="seg-links-main">
      //                 <div className="row">
      //                   <div className="col-md-12"> 
      //                   <Link to="/segment/data-audience-aggregators" className="blue-line">an audience data aggregator</Link> 
      //                   <Link to="/segment/advanced-video-platforms" className="light-green-line">a video platform</Link> </div>
      //                 </div>
      //                 <div className="row">
      //                   <div className="col-md-12"> 

      //                   <Link to="/segment/pay-tv-distributors" className="mid-green-line">a pay TV distributor</Link>

      //                   <Link to="/segment/media-owners-content-providers" className="dark-green-line">a media owner</Link>

      //                   <Link to="/segment/gaming" className="yellow-line">a gaming company</Link> </div>
      //                 </div>
      //                 <div className="row">
      //                   <div className="col-md-12"> 
      //                   <Link to="/segment/connected-streaming-tv" className="purple-line">a streaming platform or service</Link>
      //                   <Link to="/segment/agencies" className="red-line">an agency</Link>
      //                   <Link to="/segment/brand" className="orange-line">a brand</Link> </div>
      //                 </div>
      //                 <div className="row">
      //                   <div className="col-md-12 seg-lrn-link"> 
      //                   <Link to="/services/general" className="neon-green-line">interested in learning more</Link> </div>
      //                 </div>
      //               </div>
      //             </div>
      //           </div>
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // </div>

    );

  }
}
export default Segment;
