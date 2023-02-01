import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import IndexContents from "./components/IndexContents";
import Map from "./components/Map";
import Search from "./components/Search";
import Context from "./components/Context";
import Footer from "./components/Footer";
import "./css/_App.scss";

function App() {
  return (
    <Context>
      <BrowserRouter>
        <Header />
        <main className="main-container">
          <Routes>
            <Route path="/" element={<IndexContents />} />
            <Route path="/map" element={<Map />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </Context>
  );
}

export default App;
