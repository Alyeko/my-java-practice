import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { BondDetail } from "./BondDetail";
import { getAllBonds } from '../../services/BondServices';
import Dropdown from 'react-bootstrap/Dropdown';

const AllBonds = () => {
    const [bonds, setBonds] = useState([]);
    const [sortOrder, setSortOrder] = useState('asc_id');

    useEffect(() => {
        getBondsFromAPI();
    }, []);

    const getBondsFromAPI = () => {
        getAllBonds()
            .then(res => {
                console.log(res.data)
                setBonds(res.data);
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