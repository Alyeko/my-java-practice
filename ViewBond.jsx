import React, { useState, useEffect } from "react";
import { findPets } from "../../services/PetServices";
import styles from "./Pets.module.css";
import Table from 'react-bootstrap/Table';

export const Pets = () => {
    const [pets, setPets] = useState([]);

    useEffect(() => {
      findPets()
            .then(({data}) => {
            setPets(data);
            });
    }, []);
  return (
    <>
        { pets.map(pet => 
        <div className={styles.pets}>
            {/* <div>ID: {pet.id}</div>
            <div>Name: {pet.name} </div>
            <div>Age: {pet.age}</div> */}

            <Table className="table-success" >
            <thead>
            <tr>
              <th>Column Name</th>
              <th>Data</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>Bond_id</td>
              <td>{pet.id}</td>
            </tr>
            <tr>
              <td>Bond_holder_name</td>
              <td>{pet.id}</td>
            </tr>
            <tr>
              <td>Unit_price</td>
              <td>{pet.id}</td>
            </tr>
            <tr>
              <td>Coupon_percent</td>
              <td>{pet.id}</td>
            </tr>
            <tr>
              <td>Bond_currency</td>
              <td>{pet.id}</td>
            </tr>
            <tr>
              <td>Cusip</td>
              <td>{pet.id}</td>
            </tr>
            <tr>
              <td>Face_value_mn</td>
              <td>{pet.id}</td>
            </tr>
            <tr>
              <td>Issuer_name</td>
              <td>{pet.id}</td>
            </tr>
            <tr>
              <td>Bond_maturity_date</td>
              <td>{pet.id}</td>
            </tr>
            </tbody>
            </Table>

        </div>) 
        }
    </>
  )
};
