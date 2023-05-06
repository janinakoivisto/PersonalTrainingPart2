import React, {useEffect, useState} from 'react';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import {Link} from 'react-router-dom';
import {Box, Button, Container} from '@mui/material';

const CustomerList = () => {
    const [customers,
        setCustomers] = useState([]);

    useEffect(() => {
        fetch('https://traineeapp.azurewebsites.net/api/customers')
            .then(response => response.json())
            .then(data => setCustomers(data.content));
    }, []);

    const columnDefs = [
        {
            headerName: 'Name',
            field: 'firstname',
            sortable: true,
            filter: true,
            width: 100

        }, {
            headerName: 'Last name',
            field: 'lastname',
            sortable: true,
            filter: true,
            width: 130

        }, {
            headerName: 'Street address',
            field: 'streetaddress',
            sortable: true,
            filter: true,
            width: 180
        }, {
            headerName: 'Postcode',
            field: 'postcode',
            sortable: true,
            filter: true,
            width: 110
        }, {
            headerName: 'City',
            field: 'city',
            sortable: true,
            filter: true,
            width: 110
        }, {
            headerName: 'Email',
            field: 'email',
            sortable: true,
            filter: true,
            width: 200
        }, {
            headerName: 'Phone',
            field: 'phone',
            sortable: true,
            filter: true,
            width: 150
        }, {
            headerName: "Delete",
            width: 110,
            cellRenderer: (params) => (
                <Button onClick={() => handleDelete(params.data)} className="btn-delete">
                    Delete
                </Button>
            )
        }, {
            headerName: "Edit",
            width: 110,
            cellRenderer: (params) => (
                <Button>
                    <Link
                        to={`/editcustomer/${params
                        .data
                        .links[0]
                        .href
                        .split('/')
                        .pop()}`}
                        className="btn-edit">
                        Go to editing
                    </Link>
                </Button>
            )
        }

    ];

    const handleDelete = async(customer) => {
        const url = 'https://traineeapp.azurewebsites.net/api/customers';
        const confirmed = await new Promise((resolve) => {
            setTimeout(() => {
                resolve(window.confirm(`Are you sure you want to delete ${customer.firstname} ${customer.lastname}?`));
            }, 100);
        });
        if (confirmed) {
            fetch(customer.links[0].href, {method: 'DELETE'}).then(() => {
                setCustomers(customers.filter(cust => cust !== customer));
            }).catch(error => console.error(error));
        }
    };

    return (
        <Container>
            <Container>
                <div>
                    <div
                        className="ag-theme-alpine"
                        style={{
                        height: 700,
                        width: 1250
                    }}>
                        <h1>Customers</h1>
                        <AgGridReact rowData={customers} columnDefs={columnDefs}/>
                    </div>

                </div>
                <Box
                    sx={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginTop: '5rem'
                }}>
                    <Button
                        component={Link}
                        to="../trainings"
                        variant="contained"
                        sx={{
                        margin: '1rem'
                    }}>Go to Training</Button>

                    <Button
                        component={Link}
                        to="../addcustomer"
                        variant="contained"
                        sx={{
                        margin: '1rem'
                    }}>Add a customer</Button>
                </Box>
            </Container>
        </Container>
    );

};

export default CustomerList;
