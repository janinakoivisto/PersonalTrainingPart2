import React, {useState, useEffect} from 'react';
import {Box, Button, Container, TextField} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const AddTraining = () => {
    const [date,
        setDate] = useState('');
    const [duration,
        setDuration] = useState('');
    const [activity,
        setActivity] = useState('');
    const [customer,
        setCustomer] = useState('');
    const [customers,
        setCustomers] = useState([]);

    useEffect(() => {
        fetch('https://traineeapp.azurewebsites.net/getcustomers')
            .then(response => response.json())
            .then(data => {
                const customers = data.map(item => ({id: item.id, name: `${item.firstname} ${item.lastname}`}));
                setCustomers(customers);
                console.log(customers);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const handleAddTraining = async() => {
        try {
            const formattedDate = new Date(date).toISOString();
            const response = await fetch('https://traineeapp.azurewebsites.net/api/trainings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({date: formattedDate, duration: duration, activity: activity, customer: `https://traineeapp.azurewebsites.net/api/customers/${customer}`})
            });
            if (response.ok) {
                window.location.href = '/trainings';
            } else {
                console.error('Failed to add training');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Container>
            <Box
                sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}>
                <h1>Add Training</h1>
                <TextField
                    label=""
                    type="datetime-local"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    sx={{
                    my: 2,
                    width: '50%'
                }}/>
                <TextField
                    label="Duration (min)"
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    sx={{
                    my: 2,
                    width: '50%'
                }}/>
                <TextField
                    label="Activity"
                    value={activity}
                    onChange={(e) => setActivity(e.target.value)}
                    sx={{
                    my: 2,
                    width: '50%'
                }}/>
                <div>
                    <InputLabel>Customer</InputLabel>
                    <Select
                        value={customer}
                        onChange={(e) => setCustomer(e.target.value)}
                        sx={{
                        my: 2,
                        width: 400
                    }}>
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value="select-customer">Select a customer</MenuItem>
                        {customers.map((customer) => (
                            <MenuItem key={customer.id} value={customer.id}>
                                {customer.name}
                            </MenuItem>
                        ))}
                    </Select>
                </div>
                <Button variant="contained" onClick={handleAddTraining}>
                    Add Training
                </Button>
            </Box>
        </Container>
    );
};

export default AddTraining;
