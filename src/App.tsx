import React from 'react';
import Layout from './layout';
import IPhone7LandingPage from './page/Iphone7';

function App() {
  return (
    <Layout logoPath="logo.png">
      <IPhone7LandingPage imagePath="iphone.png" />
    </Layout>
  );
}

export default App;
