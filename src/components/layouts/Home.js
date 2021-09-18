import React from "react";

import Header from "./Header";
import Booking from "./Booking";
import Howitworks from "./Howitworks";
import Footer from "./Footer";

const Home = ({ screenSize }) => {
   return (
      <div className="page-container">
         <div className="content-wrap">
            <Header screenSize={screenSize}></Header>
            <Booking screenSize={screenSize}></Booking>
            <Howitworks></Howitworks>
         </div>
         <Footer></Footer>
      </div>
   );
};

export default Home;
