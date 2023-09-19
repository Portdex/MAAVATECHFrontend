import React, { useState } from 'react';
import Header from '../menu/Header';
import Trending from '../containers/Trending';
import Carousel from '../containers/carousel';
import Headline from '../containers/Headline';
import '../assets/firstview.css'
import { createGlobalStyle } from 'styled-components';
const GlobalStyles = createGlobalStyle `
.App
{
    display:block;
    height:auto;
}
::-webkit-scrollbar {
 display:none /* You can adjust the width to your preference */
}
`

const FirstView = () => {

  return (
    <>
    <GlobalStyles/>
    <div className="app">
      <Carousel/>
      <Trending/>
      <Headline/>
    </div>
    </>
  );
}

export default FirstView;
