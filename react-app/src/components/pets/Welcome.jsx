// import React, { useState, useEffect } from "react";
import { Route, Routes } from 'react-router-dom';
import AllBonds from "./AllBonds";
import UserBonds from "./UserBonds";

export const Welcome = (props) => {
  return (
    <div>
      {/* <h1>Welcome {props.name}</h1> */}
      <h1 class="text-center">Welcome User</h1>
      <figure class="text-center">
        <blockquote class="blockquote">
          <p class="mb-0">This is a Bond Tracker where you can view details of active bonds in all tradebooks and edit your trade(s).</p>
        
        </blockquote>
         <a href="/allbonds">View All Bonds</a> <br></br>
         <a href="/userbonds">View Your Bonds</a>
      </figure>
      <Routes>
        {/* <Route path="allbonds" element={<Pets />} /> */}
        <Route path="allbonds" element={<AllBonds/>} />
        <Route path="userbonds" element={<UserBonds/>} />
      </Routes>
      </div>
  )
};
