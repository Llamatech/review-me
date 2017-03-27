import React, { PropTypes } from 'react'

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
        <p>
          Review me is a wonderful tool that pretends to organize and give people the ability to review and rate open source projects.
          Right now, review me only supports projects hosted in Github, but we hope to change that in the future. The idea of this tool
          is to provide a plataform where you can post your github repo, a description to get people excited, and if you wish,
          the profile of your project's ideal contributor. This way, people can quickly learn about your project and start collaborating
          and they can also review your idea with comments and ratings. Try to correct what people suggest in their comments, so that
          your rating will be reset and you can rise to the top of the ratings. We hope this tool helps you improve your projects and
          find amazing people to collaborate with you. You can Search for projects using the search bar up there, and it will match
          project name, description, and owner.If you have any feedback for us, our project is included below.
<br></br>
          Comment,
          rate us, and collaborate with us!
      </p>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      </div>
    )
  }
}

export default About;
