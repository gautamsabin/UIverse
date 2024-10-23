import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import axios from "axios";
import WebsiteFormDialog from "../../components/Website/WebsiteFormDialog.jsx";
import WebsiteTable from "../../components/Website/WebsiteTable.jsx";
import DeleteConfirmationDialog from "../../components/DeleteConfirmationDialog.jsx";
import SidebarMenu from "../../components/SidebarMenu.jsx";
import ErrorMessage from "../../components/ErrorMessage.jsx";

const WebsiteManagementPage = () => {
    const [websites, setWebsites] = useState([]);
    const [categories, setCategories] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedWebsite, setSelectedWebsite] = useState({ name: "", url: "" });
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [deleteWebsiteId, setDeleteWebsiteId] = useState(null);
    const [errorMessage, setErrorMessage] = useState(''); // State for error message
    const [openError, setOpenError] = useState(false); // State to control Snackbar visibility

    // Fetch websites on component mount
    useEffect(() => {
        fetchWebsites();
        fetchCategories();
    }, []);

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

    const fetchCategories = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/category");
            setCategories(response.data.payload.data); // Set fetched categories
        } catch (error) {
            console.error("Error fetching categories:", error);
            setErrorMessage(error.response?.data?.message || "Failed to fetch category."); // Set the error message
            setOpenError(true); // Open the Snackbar
        }
    };

    const handleOpenDialog = (website = null) => {
        setSelectedWebsite(website || { name: "", url: "", category: "", fonts: "", colors: "", description: "" });
        setIsEditing(Boolean(website));
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedWebsite({ name: "", url: "", category: "", fonts: "", colors: "", description: "" });
    };

    const handleInputChange = (e) => {
        setSelectedWebsite({ ...selectedWebsite, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        const websiteData = {
            name: selectedWebsite.name,
            url: selectedWebsite.url,
            category: selectedWebsite.category,
            fonts: selectedWebsite.fonts,
            colors: selectedWebsite.colors,
            description: selectedWebsite.description
        }
        if (isEditing) {
            // Update website
            try {
                await axios.patch(`http://localhost:5000/api/website/${selectedWebsite._id}`, websiteData);
                fetchWebsites(); // Refresh the list
                handleCloseDialog();
            } catch (error) {
                console.error("Error updating website:", error);
                setErrorMessage(error.response?.data?.message || "Failed to update website."); // Set the error message
                setOpenError(true); // Open the Snackbar
            }
        } else {
            // Add new website
            try {
                console.log(websiteData)
                await axios.post("http://localhost:5000/api/website", websiteData);
                fetchWebsites();
                handleCloseDialog();
            } catch (error) {
                console.error("Error adding website:", error);
                setErrorMessage(error.response?.data?.message || "Failed to app website."); // Set the error message
                setOpenError(true); // Open the Snackbar
            }
        }
    };

    const handleDeleteWebsite = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/website/${deleteWebsiteId}`);
            fetchWebsites(); // Refresh the list
            handleCloseDeleteModal();
        } catch (error) {
            console.error("Error deleting website:", error);
            setErrorMessage(error.response?.data?.message || "Failed to delete website."); // Set the error message
            setOpenError(true); // Open the Snackbar
        }
    };

    const handleOpenDeleteModal = (id) => {
        setDeleteWebsiteId(id);
        setOpenDeleteModal(true);
    };

    const handleCloseDeleteModal = () => {
        setOpenDeleteModal(false);
        setDeleteWebsiteId(null);
    };
    const handleCloseErrorMessage = () => {
        setOpenError(false); // Close the Snackbar
    };


    return (
        <div>
            <div style={{ display: 'flex' }}>
                <SidebarMenu />
                <div style={{ marginLeft: 50, padding: 20 }}>
                    <h1>Website Management</h1>

                    <Button variant="contained" color="primary" onClick={() => handleOpenDialog()}>
                        Add Website
                    </Button>

                    {/* Website Table */}
                    <WebsiteTable websites={websites} onEdit={handleOpenDialog} onDelete={handleOpenDeleteModal} />

                    {/* Add/Edit Dialog */}
                    <WebsiteFormDialog
                        open={openDialog}
                        handleClose={handleCloseDialog}
                        website={selectedWebsite}
                        handleInputChange={handleInputChange}
                        handleSubmit={handleSubmit}
                        isEditing={isEditing}
                        categories={categories}
                    />

                    {/* Delete Confirmation Modal */}
                    <DeleteConfirmationDialog
                        open={openDeleteModal}
                        handleClose={handleCloseDeleteModal}
                        handleDelete={handleDeleteWebsite}
                    />

                    {/* Error Message Snackbar */}
                    <ErrorMessage message={errorMessage} open={openError} onClose={handleCloseErrorMessage} />
                </div>
            </div>
        </div>
    );
};

export default WebsiteManagementPage;
