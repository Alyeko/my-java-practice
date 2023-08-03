import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { BondDetail } from "./BondDetail";
import { getAllBonds } from '../../services/BondServices';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';


const endDate = new Date().getTime(); //timestamp
function subtract5DaysFromCurrentDate(startDate, numberOfDays) {
  const millisecondsPerDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
  //const originalTimestamp = originalDate.getTime();
  const newTimestamp = startDate - numberOfDays * millisecondsPerDay;
  const newDate = new Date(newTimestamp);
  console.log('start date is '+ newDate)
  return newTimestamp;
  //return newDate;
}

// const targetDate = '2023-07-08'; //bondMaturityDate = '2023-08-05'
const targetDate = '2023-08-04'; //bondMaturityDate = '2023-08-05'
const startDate = subtract5DaysFromCurrentDate(endDate, 5);
function isDateInRange(targetDate, startDate, endDate) {
   const targetTimestamp = new Date(targetDate).getTime();
   const startTimestamp = startDate;
   const endTimestamp = endDate;

   console.log('end date is ' + new Date(endDate));
   console.log('target date is ' + new Date(targetTimestamp));

   return targetTimestamp >=  startTimestamp && targetTimestamp <= endTimestamp;
}
//console.log(isDateInRange(targetDate, startDate, endDate));


const AllBonds = () => {
    const [bonds, setBonds] = useState([]);
    const [sortOrder, setSortOrder] = useState('asc_id');

    useEffect(() => {
        getBondsFromAPI();
    }, []);

    const getBondsFromAPI = ()=>{
        getAllBonds()
        .then(res => {
            // console.log(res.data[0].bondMaturityDate)
            // console.log(res.data[3].bondId, typeof(res.data[3].bondId))
            const bondIdsArray = [];
            for (let i=0; i<res.data.length; i++) {
               bondIdsArray.push(res.data[i].bondId)}//, res.data[i].bondMaturityDate)}
            //console.log(bondIdsArray);   //works!

            const excludedIds = [];
            for (let i=0; i<res.data.length; i++) {
                if (isDateInRange(res.data[i].bondMaturityDate, startDate, endDate)){
                    excludedIds.push(res.data[i].bondId)}}
            
            const filteredData = res.data.filter(item => !excludedIds.includes(item.bondId));
            console.log(filteredData);

            setBonds(filteredData);
        })
        .catch(err => {
            setBonds([]);
            console.log(err);
        })
      }

    const handleSortClick = (order) => {
        const sortedBonds = [...bonds].sort((a, b) => {
            if (order === 'asc_id') {
                return a.bondId - b.bondId;
            } else if (order === 'desc_id') {
                return b.bondId - a.bondId;
            } else if (order === 'asc_date') {
                return new Date(a.bondMaturityDate) - new Date(b.bondMaturityDate);
            } else if (order === 'desc_date') {
                return new Date(b.bondMaturityDate) - new Date(a.bondMaturityDate);
            } else if (order === 'type') {
            return a.type.localeCompare(b.type);}
            return 0;
        });

        setBonds(sortedBonds);
        setSortOrder(order);
    }


    return (
        <>
            <div className="list-group text-center">
                <div className="d-flex justify-content-between subnav">
                    <h5 style={{ marginLeft: "4.5%", marginTop: "1%" }}>All Active Bonds</h5>
                    <Button variant="primary" className="btn btn-secondary" id="5daysAhead" onClick={console.log('thinking about this')}>5 Days Ahead</Button>
                    <Dropdown>
                        <Dropdown.Toggle variant="primary" className="btn btn-secondary" id="sort">
                            Sort: {sortOrder === 'asc_id'
                            ? 'Ascending ID'
                            : sortOrder === 'desc_id'
                                ? 'Descending ID'
                                : sortOrder === 'asc_date'
                                    ? 'Ascending Date'
                                    : sortOrder === 'desc_date'
                                        ? 'Descending Date'
                                        : 'Bond Type'}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => handleSortClick('asc_id')}>Ascending ID</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleSortClick('desc_id')}>Descending ID</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleSortClick('asc_date')}>Ascending Date</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleSortClick('desc_date')}>Descending Date</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleSortClick('type')}>Bond Type</Dropdown.Item>

                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
            <h4 style={{ marginLeft: "4.5%", marginTop: "2%", marginBottom: "1%" }}> Total count is: <small className="text-body-secondary">{bonds.length}</small></h4>
            <Container fluid="md-4" style={{ marginLeft: "4%", marginTop: "2%", width: "95%" }} >
                <Row md={5}>
                    {bonds.map(bond => (
                        <Col key={bond.bondId.toString()}>
                            <div className='container'>
                                <BondDetail info={bond} />
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    )
}

export default AllBonds;
