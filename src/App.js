import { HashRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import IndexContents from "./components/IndexContents";
import Map from "./components/Map";
import Search from "./components/Search";
import Recommends from "./components/Recommends";
import CalturalSpc from "./components/CulturalSpc";
import SideContents from "./components/SideContents";
import SideContentsR from "./components/SideContentsR";
import Recent from "./components/Recent";
import Footer from "./components/Footer";
import React, { useContext } from "react";
import { MyContext } from "./components/Context";
import "./css/_Style.scss";

function App() {
  const { mainCont } = useContext(MyContext);
  // app
  return (
    <HashRouter basename={process.env.PUBLIC_URL}>
      <div className={mainCont ? "active bg-layer" : "bg-layer"}>
        <SideContents />
        <SideContentsR />
      </div>
      <div className={mainCont ? "active content-wrapper" : "content-wrapper"}>
        <Header />
        <main className='main-container'>
          <Routes>
            <Route path='/' element={<IndexContents />} />
            <Route path='/search' element={<Search />} />
            <Route path='/culturalspc' element={<CalturalSpc />} />
            <Route path='/map' element={<Map />} />
            <Route path='/recommends' element={<Recommends />} />
            <Route path='/recent' element={<Recent />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;
