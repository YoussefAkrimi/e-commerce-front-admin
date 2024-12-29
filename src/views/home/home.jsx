import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import Footer from "../../components/footer";
import Layout from "./layout";
import { Outlet, useNavigate } from "react-router-dom";

const Home = () => {

  
  return (
    <div>
      <div
        className="page-wrapper"
        id="main-wrapper"
        data-layout="vertical"
        data-navbarbg="skin6"
        data-sidebartype="full"
        data-sidebar-position="fixed"
        data-header-position="fixed"
      >
        {/* Sidebar Start */}
        <Sidebar />
        {/*  Sidebar End */}
        {/*  Main wrapper */}
        <div className="body-wrapper">
          {/*  Header Start */}
          <Header />
          {/*  Header End */}
          <div className="container-fluid">
            <div className="row">
              
              <Outlet />
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
