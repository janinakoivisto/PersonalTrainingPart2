import React, {useState, useEffect} from 'react';
import {Box, Button, TextField} from '@mui/material';
import {useParams} from 'react-router-dom';

const EditCustomer = () => {
    const {id} = useParams();
    const [customer,
        setCustomer] = useState('');

    useEffect(() => {
        fetch(`https://traineeapp.azurewebsites.net/api/customers/${id}`)
            .then(response => response.json())
            .then(data => setCustomer(data));
    }, [id]);

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setCustomer({
            ...customer,
            [name]: value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch(customer.links[0].href, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        }).then(() => {
            window.location.href = "/";
        }).catch(error => console.error(error));
    };
    return (
        <Box
            component="form"
            sx={{
            '& .MuiTextField-root': {
                m: 1,
                width: '25ch'
            }
        }}
            onSubmit={handleSubmit}>
            <h1>Edit Customer</h1>
            <div>
                <TextField
                    required
                    id="outlined-required"
                    label="First Name"
                    name="firstname"
                    value={customer.firstname || ''}
                    onChange={handleInputChange}
                    variant="outlined"/>
                <TextField
                    required
                    id="outlined-required"
                    label="Last Name"
                    name="lastname"
                    value={customer.lastname || ''}
                    onChange={handleInputChange}
                    variant="outlined"/>
                <TextField
                    required
                    id="outlined-required"
                    label="Street Address"
                    name="streetaddress"
                    value={customer.streetaddress || ''}
                    onChange={handleInputChange}
                    variant="outlined"/>
                <TextField
                    required
                    id="outlined-required"
                    label="Postcode"
                    name="postcode"
                    value={customer.postcode || ''}
                    onChange={handleInputChange}
                    variant="outlined"/>
                <TextField
                    required
                    id="outlined-required"
                    label="City"
                    name="city"
                    value={customer.city || ''}
                    onChange={handleInputChange}
                    variant="outlined"/>
                <TextField
                    required
                    id="outlined-required"
                    label="Email"
                    name="email"
                    value={customer.email || ''}
                    onChange={handleInputChange}
                    variant="outlined"/>
                <TextField
                    required
                    id="outlined-required"
                    label="Phone"
                    name="phone"
                    value={customer.phone || ''}
                    onChange={handleInputChange}
                    variant="outlined"/>
            </div>
            <Box
                sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginTop: '2rem'
            }}>
                <Button
                    type="submit"
                    variant="contained"
                    sx={{
                    margin: '1rem'
                }}>Save</Button>
                <Button
                    onClick={() => window.location.href = "/"}
                    variant="contained"
                    sx={{
                    margin: '1rem'
                }}>Cancel</Button>
            </Box>
        </Box>
    );
};

export default EditCustomer;
