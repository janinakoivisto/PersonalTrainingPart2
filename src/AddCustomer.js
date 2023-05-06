import React, { useState } from 'react';
import { TextField, Button, Container } from '@mui/material';

function AddCustomer() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [streetaddress, setStreetaddress] = useState('');
  const [postcode, setPostcode] = useState('');
  const [city, setCity] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [customerData, setCustomerData] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCustomer = {
      firstname: firstname,
      lastname: lastname,
      streetaddress: streetaddress,
      postcode: postcode,
      city: city,
      email: email,
      phone: phone
    };
    fetch('https://traineeapp.azurewebsites.net/api/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCustomer)
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setCustomerData([...customerData, data]);
        setFirstname('');
        setLastname('');
        setStreetaddress('');
        setPostcode('');
        setCity('');
        setEmail('');
        setPhone('');
        window.location.href = "/";
      })
      
      .catch(error => {
        console.error(error);
      });
    };
    
  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <TextField
          label="First Name"
          variant="outlined"
          value={firstname}
          onChange={(event) => setFirstname(event.target.value)}
          margin="normal"
          required
          fullWidth
        />
        <TextField
          label="Last Name"
          variant="outlined"
          value={lastname}
          onChange={(event) => setLastname(event.target.value)}
          margin="normal"
          required
          fullWidth
        />
        <TextField
          label="Street address"
          variant="outlined"
          value={streetaddress}
          onChange={(event) => setStreetaddress(event.target.value)}
          margin="normal"
          required
          fullWidth
        />
                <TextField
          label="Postcode"
          variant="outlined"
          value={postcode}
          onChange={(event) => setPostcode(event.target.value)} 
          margin="normal"
          required
          fullWidth
        />
                <TextField
          label="City"
          variant="outlined"
          value={city}
          onChange={(event) => setCity 
            (event.target.value)}
          margin="normal"
          required
          fullWidth
        />
        <TextField
          label="Email"
          variant="outlined"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          margin="normal"
          required
          fullWidth
        />
        <TextField
          label="Phone"
          variant="outlined"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          margin="normal"
          required
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary">
          Add Customer
        </Button>
      </form>
    </Container>
  );
};

export default AddCustomer;
