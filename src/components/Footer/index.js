import React from 'react';
import './styles.scss';

const Footer = (props) => {
  return (
    <>
      {props.isLoaded && (
        <footer className='footer'>
          Challenge by{' '}
          <a
            href='https://www.frontendmentor.io?ref=challenge'
            target='_blank'
            rel='noopener noreferrer'
            className='footer-link'
          >
            Frontend Mentor
          </a>
          . Coded by{' '}
          <a
            href='https://github.com/IsaqueIgor'
            target='_blank'
            rel='noopener noreferrer'
            className='footer-link'
          >
            Isaque Igor
          </a>
          .
        </footer>
      )}
    </>
  );
};

export default Footer;
