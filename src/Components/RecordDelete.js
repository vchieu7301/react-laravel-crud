import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import axios from "axios";

const RecordDelete = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recordData, setRecordData] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

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
        const recordData = {
          title: response.data.result.title,
          description: response.data.result.description,
          // Update other record fields if needed
        };
        setRecordData(recordData);
      } catch (error) {
        console.error("Error fetching record data:", error);
      }
    };

    fetchRecordData();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://test.localhost/api/records/${id}`, {
        headers: {
          Authorization:
            "Bearer " + localStorage.getItem("PersonalAccessToken"),
        },
      });
      console.log("Record deleted successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };

  const handleConfirmationOpen = () => {
    setShowConfirmation(true);
  };

  const handleConfirmationClose = () => {
    setShowConfirmation(false);
  };

  if (!recordData) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <div>
      <Typography variant="h4">Record Details</Typography>
      <Typography>Title: {recordData.title || ""}</Typography>
      <Typography>Description: {recordData.description || ""}</Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={handleConfirmationOpen}
      >
        Delete
      </Button>

      <Dialog open={showConfirmation} onClose={handleConfirmationClose}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this record?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmationClose}>Cancel</Button>
          <Button onClick={handleDelete} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RecordDelete;
