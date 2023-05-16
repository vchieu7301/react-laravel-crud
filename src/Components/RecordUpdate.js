import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
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

      console.log("User updated successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div>
      <h1>Update User</h1>
      <form>
        <TextField
          label="Title"
          value={RecordData.title || ""}
          onChange={(e) =>
            setRecordData({ ...RecordData, title: e.target.value })
          }
        />
        <TextField
          label="Description"
          value={RecordData.description || ""}
          onChange={(e) =>
            setRecordData({ ...RecordData, description: e.target.value })
          }
        />
        <Button variant="contained" onClick={handleUpdateUser}>
          Update
        </Button>
      </form>
    </div>
  );
};

export default RecordUpdate;
