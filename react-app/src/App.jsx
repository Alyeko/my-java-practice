import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Route, Routes } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import './App.css';
import AllBonds from "./components/pets/AllBonds";
import UserBonds from "./components/pets/UserBonds";
import { Welcome } from "./components/pets/Welcome";
import ViewBond from "./components/pets/ViewBond";

// const App = () => {
function App() {
  return (
  <>
  <Navbar expand="lg" className="navbar navbar-expand-lg " data-bs-theme="dark" style={{backgroundColor: "#0018a8"}}>
        <Container>
        {/* style={{marginLeft: "2%"}} */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto text-center">
            <Navbar.Brand href="/" className="navbar-brand text-center">Home</Navbar.Brand>
            
              <Nav.Link href="/allbonds" className="nav-link nav-item text-center">All Bonds</Nav.Link>
             
              <Nav.Link href="/userbonds" className="nav-link nav-item text-center">Your Bonds</Nav.Link>
              {/* <Nav.Link href="/bonds" className="nav-link nav-item text-center">View Bond</Nav.Link> */}
              <Button variant="primary" className="btn btn-primary-disabled " id="logout " style={{float: "right"}}>Logout</Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
      
      <Routes>
        {/* <Route path="allbonds" element={<Pets />} /> */}
        <Route path="allbonds" element={<AllBonds/>} />
        <Route path="userbonds" element={<UserBonds/>} />
        <Route path="/bonds/:bondId" element={<ViewBond />} />
        <Route path="/" element={<Welcome />} />
      </Routes>

      
  </>)
  // <Pets />;
};

export default App;
