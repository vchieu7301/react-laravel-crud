import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Grid } from "@mui/material";
import axios from "axios";

const RecordUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [RecordData, setRecordData] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    const fetchRecordData = async () => {
      try {
        const response = await axios.get(
          `http://test.localhost/api/records/${id}`,
          {
            headers: {
              Authorization:
                "Bearer " + localStorage.getItem("PersonalAccessToken"),
            },
          }
        );

        // Update the user data in the state
        const recordData = {
          title: response.data.result.title,
          description: response.data.result.description,
        };
        setRecordData(recordData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchRecordData();
  }, [id]);

  const handleUpdateUser = async () => {
    try {
      const response = await axios.put(
        `http://test.localhost/api/records/${id}`,
        RecordData,
        {
          headers: {
            Authorization:
              "Bearer " + localStorage.getItem("PersonalAccessToken"),
          },
        }
      );
      console.log('Response:', response);
      navigate("/");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div>
       <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Update Record
        </Typography>
      <form>
      <Grid item>
        <TextField
          label="Title"
          value={RecordData.title || ""}
          fullWidth
          onChange={(e) =>
            setRecordData({ ...RecordData, title: e.target.value })
          }
        />
        </Grid>
        <Grid item>
        <TextField
          label="Description"
          value={RecordData.description || ""}
          fullWidth
          onChange={(e) =>
            setRecordData({ ...RecordData, description: e.target.value })
          }
        />
        </Grid>
        <Button variant="contained" onClick={handleUpdateUser} sx={{ mt: 3, mb: 2,  ml: 3, mr: 2}} >
          Update
        </Button>
        <Button onClick={handleCancel} variant="contained" color="primary" sx={{ mt: 3, mb: 2,  ml: 3, mr: 2}}>
        Cancel
      </Button>
      </form>
    </div>
  );
};

export default RecordUpdate;
