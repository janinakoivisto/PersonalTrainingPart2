import { Container } from '@mui/material';
import './App.css';
import CustomerList from './CustomerList';
import TrainingList from './TrainingList';
import AddCustomer from './AddCustomer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EditCustomer from './EditCustomer';
import AddTraining from './AddTraining';

function App() {
  return (
    <Container>
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<CustomerList />} />
    <Route path="/trainings" element={<TrainingList />} />
    <Route path='/addcustomer' element={<AddCustomer />} />
    <Route path="/editcustomer/:id" element={<EditCustomer />} />
    <Route path="/addtraining" element={<AddTraining />} />


    </Routes>
  </BrowserRouter>
  </Container>
    
  );
}

export default App;
