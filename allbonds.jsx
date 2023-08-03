import React, {useState, useEffect} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { BondDetail } from "./BondDetail";
import { getAllBonds } from '../../services/BondServices';
import Button from 'react-bootstrap/Button';


const AllBonds = () => {
  const [Bonds, setBonds] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc'); // Track the sorting order

  useEffect( () => {
    getBondsFromAPI();
  }, []);
  
  const getBondsFromAPI = ()=>{
    getAllBonds()
    .then(res => {
        //console.log(new Date(res.data[0].bondMaturityDate))
        //console.log(res.data[0].bondMaturityDate)
        for (let i=0; i<res.data.length; i++) {
          console.log(res.data[i].bondId, res.data[i].bondMaturityDate)
        }
        setBonds(res.data);
    })
    .catch(err => {
        setBonds([]);
        console.log(err);
    })
  }


  const handleSortClick = () => {
    const sortedBonds = [...Bonds].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.bondId - b.bondId;
      } else {
        return b.bondId - a.bondId;
      }
    });

    setBonds(sortedBonds);

    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  }



  return (
    <>
    <div className="list-group text-center">
        <div className="d-flex justify-content-between subnav">
          <h5 style={{marginLeft: "4.5%", marginTop: "1%"}}>All Active Bonds</h5>
          <Button variant="primary" className="btn btn-secondary" id="5daysAhead" onClick={console.log('thinking about this')}>5 Days Ahead</Button>
          <Button variant="primary" className="btn btn-secondary" id="sort" onClick={handleSortClick}>Sort</Button>
           </div>
      </div>
    <h4 style={{marginLeft: "4.5%", marginTop:"2%", marginBottom: "1%"}}> Total count is: <small className="text-body-secondary">{Bonds.length}</small></h4>

    <Container fluid="md-4" style={{marginLeft: "4%", marginTop: "2%", width: "95%"}} >
    {/* <Row xs={4}> */}
    <Row md={5}>
    {Bonds.map(bond => (
      <Col>
      <div className='container' key={bond.bondId.toString()}>
        <BondDetail info={bond}/>
      </div></Col>
     ))}
    </Row></Container>
  </>
   
  )
}

export default AllBonds
