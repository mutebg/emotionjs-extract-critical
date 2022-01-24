// STEP: 1 create a custom _document.js and _app.js
import React from "react";
import App from "next/app";
import { ThemeProvider, newskitLightTheme, Global, css } from 'newskit';


import { CacheProvider } from '@emotion/react'
import { myCache } from './create-emotion-cache';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;


    // STEP: 3.B.
    // Client Cache is need in order to match the cache key between server and client
    // It runs only on the Client since the _document.js is adding it for the server
    const ClientOnlyCacheProvider = typeof window !== 'undefined' ? (props) => <CacheProvider value={myCache} {...props} /> : React.Fragment;
    return (
      <ClientOnlyCacheProvider>
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
      </ClientOnlyCacheProvider>  
    );
  }
}

export default MyApp;
