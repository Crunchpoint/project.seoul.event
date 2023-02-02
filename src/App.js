import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import IndexContents from "./components/IndexContents";
import Map from "./components/Map";
import Search from "./components/Search";
import Context from "./components/Context";
import Recommends from "./components/Recommends";
import Account from "./components/Account";
import Footer from "./components/Footer";
import "./css/_App.scss";

function App() {
  return (
    <Context>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Header />
        <main className="main-container">
          <Routes>
            <Route path="/" element={<IndexContents />} />
            <Route path="/search" element={<Search />} />
            <Route path="/map" element={<Map />} />
            <Route path="/recommends" element={<Recommends />} />
            <Route path="/account" element={<Account />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </Context>
  );
}

export default App;
