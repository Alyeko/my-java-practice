import React, { useState, useEffect } from "react";
import { getBondDetails} from "../../services/BondServices";
import Table from 'react-bootstrap/Table';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import '../../App.css';

const ViewBond = (props) => {
  const bondId  = props.info;
  console.log(props);
  
  // const bondId  = 1;
  const [bondDetails, setBondDetails] = useState({});
  useEffect(() => {
    // Fetch bond details using bondId
    getBondDetails(bondId)
    .then(res => {
      console.log(res.data)
      setBondDetails(res.data);
    })
    .catch(err => {
      setBondDetails([]);
        console.log(err);
    })
    // console.log(bondId)
  }, [bondId]);
  return (
    <>
    <div className="list-group text-center">
        <div className="d-flex justify-content-between subnav">
          <h5 style={{marginLeft: "4.5%", marginTop: "1%"}}>Bond: {bondDetails.bondId}</h5>
          
        </div>
      </div>
      <Container fluid="md-4" style={{marginLeft: "4%", marginTop: "2%", width: "93%"}}>
          <Table className="table-light" >
            <thead>
              <tr>
                <th>ISIN</th>
                <th>Type</th>
                <th>Issuer</th>
                <th>Maturity</th>
                <th>Face Value</th>
                <th>Currency</th>
                <th>Coupon %</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{bondDetails.bondId}</td>
                <td>{bondDetails.bondId}</td>
                <td>{bondDetails.bondId}</td>
                <td>{bondDetails.bondId}</td>
                <td>{bondDetails.bondId}</td>
                <td>{bondDetails.bondId}</td>
                <td>{bondDetails.bondId}</td>
                <td>{bondDetails.bondId}</td>
              </tr>
            </tbody>
          </Table>
        </Container>
        <Container fluid="md-4" style={{marginLeft: "4%", marginTop: "22%", width: "93%"}} >
            <Table className="table-light" >
            <thead>
              <tr>
                <th>ISIN</th>
                <th>Book Id</th>
                <th>Client</th>
                <th>Status</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Currency</th>
                <th>Buy/Sell</th>
                <th>Trade Date</th>
                <th>Settlement Date</th>

              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{bondDetails.bondId}</td>
                <td>{bondDetails.bondId}</td>
                <td>{bondDetails.bondId}</td>
                <td>{bondDetails.bondId}</td>
                <td>{bondDetails.bondId}</td>
                <td>{bondDetails.bondId}</td>
                <td>{bondDetails.bondId}</td>
                <td>{bondDetails.bondId}</td>
                <td>{bondDetails.bondId}</td>
                <td>{bondDetails.bondId}</td>
              </tr>
            </tbody>
            </Table>
            </Container>

        

    </>
  )
};



export default ViewBond;