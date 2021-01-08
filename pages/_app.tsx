import React, { ReactElement } from 'react';
import App, { AppInitialProps } from 'next/app';
import cookie from 'cookie';
import { CookieMessage } from '../@types';
import { AuthProvider } from '@providers/Auth';
import 'antd/dist/antd.less';
import '@assets/fonts.less';
import Head from 'next/head';

type AppProps = {
  authenticated: boolean;
};

class MyApp extends App<AppProps> {
  render(): ReactElement {
    const { Component, pageProps, authenticated } = this.props;
    return (
      <AuthProvider authenticated={authenticated}>
        <Head>
          <title>Mini Blog</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Component {...pageProps} />
      </AuthProvider>
    );
  }
}

MyApp.getInitialProps = async (appContext): Promise<AppInitialProps & AppProps> => {
  let authenticated = false;
  const request = appContext.ctx.req as CookieMessage;
  if (request) {
    request.cookies = cookie.parse(request.headers.cookie || '');
    authenticated = !!request.cookies.user;
  }

  // Call the page's `getInitialProps` and fill `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps, authenticated };
};

export default MyApp;
