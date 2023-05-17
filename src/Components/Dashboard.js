import React, { useEffect, useState } from "react";
import {
  Container,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import Header from "./Header";

const Dashboard = () => {
  const navigate = useNavigate();
  const [listData, setListData] = useState([]);
  useEffect(() => {
    if (!isLoggedin()) {
      navigate('/login');
    }
    const fetchData = async () => {
      try {
        const response = await axios.get("http://test.localhost/api/records", {
          headers: {
            Authorization:
              "Bearer " + localStorage.getItem("PersonalAccessToken"),
          },
        });
        setListData(response.data.result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [navigate]);

  function isLoggedin() {
    const token = localStorage.getItem('PersonalAccessToken');
    return token !== null; 
  }

  const handleUpdate = async (id) => {
    try {
      navigate(`/update/${id}`);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDelete  = async (id) => {
    try {
      navigate(`/delete/${id}`);
    } catch (error) {
      console.error('Error Deleting user:', error);
    }
  };

  return (
    <div>
    <Header />
    <Container maxWidth="lg">
      <Link to="/create">
        <Button variant="contained" color="primary">
          Create Record
        </Button>
      </Link>
      {listData.length === 0 ? (
        <div>Loading...</div>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listData.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>
                  <Button
                   sx={{ mr: 2 }}
                    variant="contained"
                    onClick={() => handleUpdate(item.id)}
                  >
                    Update
                  </Button>
                  <Button
                   sx={{ mr: 2 }}
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          
        </Table>
      )}
    </Container>
    </div>
  );
};

export default Dashboard;
