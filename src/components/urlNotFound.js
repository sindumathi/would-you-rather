import React, { Component } from 'react';
import { Container, Typography, Paper, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

//This page will be displayed when user refreshes the page or try to access page with URL
class PageNotFound extends Component {
  render() {
    return (
      <Container
        style={{
          backgroundColor: '#f3e5f5',
          display: 'flex',
          height: '100vh',
          fontSize: 16,
        }}
      >
        <Paper style={{ margin: 'auto', padding: 80 }}>
          <Typography variant='h3'>Page Not Found.</Typography>
          <p style={{ textAlign: 'center' }}>
            Sorry! you entered a wrong URL that does not exist.
          </p>
          <p style={{ textAlign: 'center' }}>
            Please
            <Button
              component={Link}
              style={{ color: 'white', backgroundColor: '#ab47bc', margin: 5 }}
              to='/'
            >
              Signin
            </Button>
            to play a fun would you rather game.
          </p>
        </Paper>
      </Container>
    );
  }
}

export default PageNotFound;
