import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import '../assets/Home.css'
import logo from '../assets/images/logo.png'
import homeProfile from '../assets/images/homeProfilePic.png'
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { isAuthenticated, loginWithRedirect, logout, user } =
    useAuth0();
  const isUser = isAuthenticated && user;

  const navigate = useNavigate();

  useEffect(() => {
    //console.log(user);
  }, [user])

  return (
    <div>
      <div id='wrapperHome'>

        {isUser ? (
          <button
            isAuthenticated
            className="loginButtonHome"
            onClick={() => { logout({ returnTo: window.location.origin }); }}> Logout
          </button>
        ) : (
          <button onClick={loginWithRedirect} className='loginButtonHome'>Login</button>)}
        <div className='descriptionHome'>
          <h1>Upgrade your project</h1>
          <img src={logo} className='mainLogoHome' alt="logo" />
          <p>Designed to improve your teamwork experience, komanda offers a wide range of possibilities when it comes to project management.</p>
          <p>All within a couple of clicks.</p>
          <button onClick={() => { if (isUser) { navigate('/teams-page') } else { loginWithRedirect() } }} className='homeButtonHome'>Try Komanda</button>
        </div>
        <div className='sideProfileHome'>
          <img src={homeProfile} className='homeProfilePicHome' alt="You Profile Picture" />
          {isUser && user.name ?
            (<h2 className='loggedUserNameHome'>{user.name.toUpperCase()}</h2>)
            : (<h2 className='notloggedUserNameHome'>You! Yes, you!</h2>)}

          <button className='profileButtonHome'>Profile</button>
        </div>
        <div id='wrapperTutorialHome'>
          <div className='tutorialVideoHome'>
            <iframe width="600" height="400" src="https://www.youtube.com/embed/rSc4J3tmuIQ"
            title="YouTube video player" frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen></iframe>
          </div>
          <div className='tutorialTextHome'>
            <h1 className='tutorialTitleHome'>Tutorial</h1>
            <p>Want to dive in and experience everything first hand? Here is a quick tutorial that will introduce you to the basics of this application.</p>
            <p>All functionalities will be available to you right after registration for free! You will be able to create Teams with other users, Projects to collaborate with your team members and Tasks to plan and manage your workflow. </p>
          </div>
        </div>

        <div className="contactUs">
          <h1>Contact Us</h1>
          <form action="https://formspree.io/f/xlezwzlp" method="POST">
            <label>
              Email:
              <input type="email" name="email" required />
            </label>
            <label>
              Full Name:
              <input type="text" name="fullName" required />
            </label>
            <label>
              Message:
              <textarea name="message" required></textarea>
            </label>
            <button type="submit">Send</button>
          </form>
        </div>

      </div>
    </div>
  )
}
export default Home
