// STEP: 2 create a custom _document.js and _app.js
import React from "react";
import App from "next/app";
import { ThemeProvider, newskitLightTheme, Global, css } from 'newskit';


import { CacheProvider } from '@emotion/react'
import { myCache } from './create-emotion-cache';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;


    // STEP: 3
    return (
      <CacheProvider value={myCache} {...pageProps}>
        <ThemeProvider theme={newskitLightTheme}>
          <Global styles={
            css`
              body {
                background-color: #ccc;
                padding: 50px;
              }
            `
          } />
      
          <Component {...pageProps} />
        </ThemeProvider> 
      </CacheProvider>  
    );
  }
}

export default MyApp;
