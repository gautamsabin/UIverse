import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import axios from "axios";
import ElementScreenshotTable from "../../components/ElementScreenshots/ElementScreenshotTable.jsx"; // Adjust path as needed
import ElementScreenshotFormDialog from "../../components/ElementScreenshots/ElementScreenshotFormDialog.jsx"; // Adjust path as needed
import DeleteConfirmationDialog from "../../components/DeleteConfirmationDialog.jsx"; // Adjust path as needed
import SidebarMenu from "../../components/SidebarMenu.jsx";
import ErrorMessage from "../../components/ErrorMessage.jsx";

const PageScreenshotManagementPage = () => {
    const [elementScreenshots, setElementScreenshots] = useState([]);
    const [websites, setWebsites] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedElementScreenshot, setSelectedElementScreenshot] = useState({ website: "", page: "", image: "" });
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [deleteScreenshotId, setDeleteScreenshotId] = useState(null);
    const [errorMessage, setErrorMessage] = useState(''); // State for error message
    const [openError, setOpenError] = useState(false); // State to control Snackbar visibility

    // Fetch page screenshots and websites on component mount
    useEffect(() => {
        fetchElementScreenshots();
        fetchWebsites();
    }, []);

    const fetchElementScreenshots = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/elementscreenshot");
            setElementScreenshots(response.data.payload.data);
        } catch (error) {
            console.error("Error fetching page screenshots:", error);
            setErrorMessage(error.response?.data?.message || "Failed to fetch screenshots."); // Set the error message
            setOpenError(true); // Open the Snackbar
        }
    };

    const fetchWebsites = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/website");
            setWebsites(response.data.payload.data);
        } catch (error) {
            console.error("Error fetching websites:", error);
            setErrorMessage(error.response?.data?.message || "Failed to fetch website."); // Set the error message
            setOpenError(true); // Open the Snackbar
        }
    };

    const handleOpenDialog = (screenshot = null) => {
        setSelectedElementScreenshot(screenshot || { website: "", page: "", image: "" });
        setIsEditing(Boolean(screenshot));
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedElementScreenshot({ website: "", page: "", image: "" });
    };

    const handleSubmit = async (formData) => {
        const data = {
            website: formData.get('website'),
            element: formData.get('element'),
            image: formData.get('image'),
        };
        console.log(data, "post data")
        if (isEditing) {

            // Update existing screenshot
            try {
                await axios.patch(`http://localhost:5000/api/elementscreenshot/${selectedElementScreenshot._id}`, data, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                fetchElementScreenshots(); // Refresh the list
                handleCloseDialog();
            } catch (error) {
                console.error("Error updating element screenshot:", error);
                setErrorMessage(error.response?.data?.message || "Failed to update screenshot."); // Set the error message
                setOpenError(true); // Open the Snackbar
            }
        } else {
            // Add new screenshot
            try {
                await axios.post("http://localhost:5000/api/elementscreenshot", data, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                fetchElementScreenshots(); // Refresh the list
                handleCloseDialog();
            } catch (error) {
                console.error("Error adding page screenshot:", error);
                setErrorMessage(error.response?.data?.message || "Failed to add screenshot."); // Set the error message
                setOpenError(true); // Open the Snackbar
            }
        }
    };

    const handleDeleteScreenshot = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/elementscreenshot/${deleteScreenshotId}`);
            fetchElementScreenshots(); // Refresh the list
            handleCloseDeleteModal();
        } catch (error) {
            console.error("Error deleting page screenshot:", error);
            setErrorMessage(error.response?.data?.message || "Failed to delete screenshot."); // Set the error message
            setOpenError(true); // Open the Snackbar
        }
    };

    const handleOpenDeleteModal = (id) => {
        setDeleteScreenshotId(id);
        setOpenDeleteModal(true);
    };

    const handleCloseDeleteModal = () => {
        setOpenDeleteModal(false);
        setDeleteScreenshotId(null);
    };

    const handleCloseErrorMessage = () => {
        setOpenError(false); // Close the Snackbar
    };


    return (
        <div>
            <div style={{ display: 'flex' }}>
                <SidebarMenu />
                <div style={{ marginLeft: 50, padding: 20 }}>
                    <h1>Element Screenshot Management</h1>
                    <Button variant="contained" color="primary" onClick={() => handleOpenDialog()}>
                        Add ELement Screenshot
                    </Button>

                    {/* Page Screenshot Table */}
                    <ElementScreenshotTable
                        elementScreenshots={elementScreenshots}
                        onEdit={handleOpenDialog}
                        onDelete={handleOpenDeleteModal}
                    />

                    {/* Add/Edit Dialog */}
                    <ElementScreenshotFormDialog
                        open={openDialog}
                        handleClose={handleCloseDialog}
                        handleSubmit={handleSubmit}
                        isEditing={isEditing}
                        elementScreenshot={selectedElementScreenshot}
                        websites={websites}
                    />

                    {/* Delete Confirmation Modal */}
                    <DeleteConfirmationDialog
                        open={openDeleteModal}
                        handleClose={handleCloseDeleteModal}
                        handleDelete={handleDeleteScreenshot}
                    />

                    {/* Error Message Snackbar */}
                    <ErrorMessage message={errorMessage} open={openError} onClose={handleCloseErrorMessage} />
                </div>
            </div>
        </div>
    );
};

export default PageScreenshotManagementPage;
