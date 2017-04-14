/* eslint-disable no-undef,
 no-unused-vars */
import React, { PropTypes } from 'react';

class About extends React.Component {
    render () {
        return(
          <div className="about text-center">
            <img className="bomb" src="https://68.media.tumblr.com/024cf54439d1a61124ce6ab1436174c2/tumblr_omb3fcuptx1qh8q8mo1_400.png" alt="logo"/>
            <h1>
              Review me
            </h1>
            <h3>The place to get the best feedback on your projects</h3>
            <br></br>
              <h4>Review-me is a great tool for developers who wish to receive feedback on their open source projects.</h4>
             <h3>You may <strong>rate</strong>, <strong>review</strong> and <strong>discover</strong> cool projects by using
               different filters. Help other users and collaborate with them!</h3>
             <br></br>
             <div className="row">
               <div className="col-md-1">

               </div>
               <div className="col-md-10">
                 <div className="row">
                   <div className="col-md-3">
                     <i className="fa fa-github fa-3x" aria-hidden="true"></i>
                     <p>
                     <br></br>
                     Sign up with your Github account
                     </p>
                   </div>
                   <div className="col-md-3">
                     <i className="fa fa-file-code-o fa-3x" aria-hidden="true"></i>
                     <p>
                     <br></br>
                     Add your repo and include:<br></br>
                     A description to get people excited<br></br>
                   The profile of your project's ideal contributor
                   </p>
                   </div>
                   <div className="col-md-3">
                     <i className="fa fa-pencil-square-o fa-3x" aria-hidden="true"></i>
                     <p>
                     <br></br>
                       Receive constructive feedback and improve your work!
                       </p>
                   </div>
                   <div className="col-md-3">
                     <i className="fa fa-comments-o fa-3x" aria-hidden="true"></i>
                     <p>
                     <br></br>
                     Comment,
                     rate us, and collaborate with us!
                     </p>
                   </div>
                 </div>
               </div>

             </div>


          <br></br>


          </div>
        );
    }
}

export default About;
