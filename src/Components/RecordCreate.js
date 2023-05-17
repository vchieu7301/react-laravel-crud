import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Grid, Typography } from '@mui/material';
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

  const handleCancel = () => {
    navigate('/');
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
    }
  };

  return (
    <form onSubmit={handleSubmit}>
     <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Create Record
        </Typography>
    <Grid item >
      <TextField
        label="Title"
        value={title}
        fullWidth
        onChange={handleTitleChange}
        required
      />
      </Grid>
      <Grid item>
      <TextField
        label="Description"
        value={description}
        fullWidth
        onChange={handleDescriptionChange}
        required
      />
      </Grid>
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 3, mb: 2,  ml: 3, mr: 2}}>
        Create Record
      </Button>
      <Button onClick={handleCancel} variant="contained" color="primary" sx={{ mt: 3, mb: 2,  ml: 3, mr: 2}}>
        Cancel
      </Button>
    </form>
  );
};

export default RecordCreate;
