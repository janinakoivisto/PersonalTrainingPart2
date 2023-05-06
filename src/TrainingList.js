import React, {useEffect, useState} from 'react';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import {Link} from 'react-router-dom';
import {Box, Button, Container} from '@mui/material';

const TrainingList = () => {
    const [trainings,
        setTrainings] = useState([]);

    useEffect(() => {
        fetch('https://traineeapp.azurewebsites.net/gettrainings').then((response) => response.json()).then((data) => {
            const trainings = data.map((item) => ({
                id: item.id,
                date: new Date(item.date).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'numeric',
                    year: 'numeric'
                }) + ' ' + new Date(item.date).toLocaleTimeString('en-GB', {
                    hour: 'numeric',
                    minute: 'numeric'
                }),
                duration: item.duration,
                activity: item.activity,
                customer: `${item.customer.firstname} ${item.customer.lastname}`
            }));
            setTrainings(trainings);
        }).catch((error) => {
            console.error(error);
        });
    }, []);

    const columnDefs = [
        {
            headerName: 'Date',
            field: 'date',
            sortable: true,
            filter: true,
            width: 200
        }, {
            headerName: 'Duration (min)',
            field: 'duration',
            sortable: true,
            filter: true,
            width: 145
        }, {
            headerName: 'Activity',
            field: 'activity',
            sortable: true,
            filter: true,
            width: 150
        }, {
            headerName: 'Customer',
            field: 'customer',
            sortable: true,
            filter: true,
            width: 190
        }, {
            headerName: "Delete",
            width: 110,
            cellRenderer: (params) => (
                <Button onClick={() => handleDelete(params.data)} className="btn-delete">
                    Delete
                </Button>
            )
        }
    ];

    const handleDelete = async(training) => {
        const url = `https://traineeapp.azurewebsites.net/api/trainings/${training.id}`;
        const confirmed = await new Promise((resolve) => {
            setTimeout(() => {
                resolve(window.confirm(`Are you sure you want to delete ${training.activity} training?`));
            }, 100);
        });

        if (confirmed) {
            fetch(url, {method: 'DELETE'}).then(() => {
                setTrainings(trainings.filter(t => t !== training));
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
                        height: '700px',
                        width: '76%'
                    }}>
                        <h1>Training</h1>
                        <AgGridReact rowData={trainings} columnDefs={columnDefs}></AgGridReact>
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
                        to="../"
                        variant="contained"
                        style={{
                        marginRight: "10px"
                    }}>Go to Customers</Button>
                    <Button
                        component={Link}
                        to="../addtraining"
                        variant="contained"
                        style={{
                        marginLeft: "10px"
                    }}>Add a Training</Button>
                </Box>
            </Container>
        </Container>
    );

};

export default TrainingList;