import React, { useState, useEffect } from "react";
import { getAllBonds } from "../../services/PetServices";
import styles from "./Pets.module.css";

export const Practice = () => {
    const [pets, setPets] = useState([]);

    useEffect(() => {
      getAllBonds()
            .then(({data}) => {
            setPets(data);
            });
    }, []);
  return (
    <>
        { pets.map(pet => 
        <div className={styles.pets}>
            <div>Bond ID: {pet.id}</div>
            <div>Name: {pet.name} </div>
            <div>Age: {pet.age}</div>
        </div>) 
        }
    </>
  )
};
