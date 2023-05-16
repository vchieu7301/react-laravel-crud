import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from "./Components/Auth";
import Dashboard from "./Components/Dashboard";
import RecordUpdate from './Components/RecordUpdate';
import RecordDelete from './Components/RecordDelete';
import RecordCreate from './Components/RecordCreate';

const AppRouter = () => {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/update/:id" element={<RecordUpdate />} />
          <Route path="/delete/:id" element={<RecordDelete />} />
          <Route path="/create" element={<RecordCreate />} />
        </Routes>
      </Router>
    );
  };
  
  export default AppRouter;
  
  