import React from 'react';

const Index = () => {
  return <div />;
};

Index.getInitialProps = ({ req, res }) => {
  if (res) {
    res.writeHead(302, { Location: '/blog' });
    res.end();
  }
  return {};
};
export default Index;
