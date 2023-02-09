import { HashRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import IndexContents from "./components/IndexContents";
import Map from "./components/Map";
import Search from "./components/Search";
import Context from "./components/Context";
import Recommends from "./components/Recommends";
import CalturalSpc from "./components/CulturalSpc";
import SideContents from "./components/SideContents";
import SideContentsR from "./components/SideContentsR";
import Footer from "./components/Footer";
import "./css/_App.scss";

function App() {
  return (
    <Context>
      <HashRouter basename={process.env.PUBLIC_URL}>
        <div className="bg-layer">
          <SideContents />
          <SideContentsR />
        </div>
        <div className="content-wrapper">
          <Header />
          <main className="main-container">
            <Routes>
              <Route path="/" element={<IndexContents />} />
              <Route path="/search" element={<Search />} />
              <Route path="/culturalspc" element={<CalturalSpc />} />
              <Route path="/map" element={<Map />} />
              <Route path="/recommends" element={<Recommends />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </HashRouter>
    </Context>
  );
}

export default App;
