import React from 'react';
import styled, { css } from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react';

const Registration = () => {
  const { isAuthenticated, loginWithRedirect, logout, user, isLoading } =
    useAuth0();
  const isUser = isAuthenticated && user;

  return (
    <Container>
      {isUser && user.picture && (
        <img className="img-icon" src={user.picture} alt={user.name} />
      )}
      {isUser && user.name && (
        <h6>
          Welcome, <strong>{user.name.toUpperCase()}</strong>
        </h6>
      )}
      {isUser ? (
        <Button
          isAuthenticated
          className=".hero-btn"
          onClick={() => {
            logout({ returnTo: window.location.origin });
          }}
        >
          logout
        </Button>
      ) : (
        <Button onClick={loginWithRedirect}>login</Button>
      )}
    </Container>
  );
};

const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid var(--clr-primary-4);
  color: var(--clr-primary-4);
  margin: 0.5em 1em;
  padding: 0.25em 1em;

  ${(props) =>
    props.isAuthenticated &&
    css`
      background: var(--clr-primary-4);
      color: white;
    `}
`;

const Container = styled.div`
  text-align: center;
  .img-icon {
    width: 2%;
    height: 2%;
  }
`;
export default Registration;
