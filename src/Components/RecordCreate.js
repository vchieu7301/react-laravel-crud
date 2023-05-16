import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button } from '@mui/material';
import { useNavigate } from "react-router-dom";

const RecordCreate = () => {
const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        'http://test.localhost/api/records',
        { title, description },
        {
            headers: {
                Authorization:
                  "Bearer " + localStorage.getItem("PersonalAccessToken"),
              },
        }
      );
      
      console.log('Record created:', response.data);
      
      navigate("/");
    } catch (error) {
      console.error('Error creating record:', error);
      
      // Xử lý lỗi nếu cần thiết
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Title"
        value={title}
        onChange={handleTitleChange}
        fullWidth
        required
      />
      <TextField
        label="Description"
        value={description}
        onChange={handleDescriptionChange}
        fullWidth
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Create Record
      </Button>
    </form>
  );
};

export default RecordCreate;
