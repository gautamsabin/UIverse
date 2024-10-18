import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import axios from "axios";
import PageScreenshotTable from "../../components/PageScreenshots/PageScreenshotTable.jsx"; // Adjust path as needed
import PageScreenshotFormDialog from "../../components/PageScreenshots/PageScreenshotFormDialog.jsx"; // Adjust path as needed
import DeleteConfirmationDialog from "../../components/DeleteConfirmationDialog.jsx"; // Adjust path as needed
import SidebarMenu from "../../components/SidebarMenu.jsx";

const PageScreenshotManagementPage = () => {
    const [pageScreenshots, setPageScreenshots] = useState([]);
    const [websites, setWebsites] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedPageScreenshot, setSelectedPageScreenshot] = useState({ description: "", website: "", page: "", image: "" });
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [deleteScreenshotId, setDeleteScreenshotId] = useState(null);

    // Fetch page screenshots and websites on component mount
    useEffect(() => {
        fetchPageScreenshots();
        fetchWebsites();
    }, []);

    const fetchPageScreenshots = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/pagescreenshot");
            setPageScreenshots(response.data.payload.data);
        } catch (error) {
            console.error("Error fetching page screenshots:", error);
        }
    };

    const fetchWebsites = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/website");
            setWebsites(response.data.payload.data);
        } catch (error) {
            console.error("Error fetching websites:", error);
        }
    };

    const handleOpenDialog = (screenshot = null) => {
        setSelectedPageScreenshot(screenshot || { description: "", website: "", page: "", image: "" });
        setIsEditing(Boolean(screenshot));
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedPageScreenshot({ description: "", website: "", page: "", image: "" });
    };

    const handleSubmit = async (formData) => {
        const data = {
            website: formData.get('website') || selectedPageScreenshot._id,
            page: formData.get('pageType'),
            image: formData.get('image'),
            description: formData.get('description')
        };
        console.log(data, "post data")
        if (isEditing) {

            // Update existing screenshot
            try {
                await axios.patch(`http://localhost:5000/api/pagescreenshot/${selectedPageScreenshot._id}`, data, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                fetchPageScreenshots(); // Refresh the list
                handleCloseDialog();
            } catch (error) {
                console.error("Error updating page screenshot:", error);
            }
        } else {
            // Add new screenshot
            try {
                await axios.post("http://localhost:5000/api/pagescreenshot", data, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                fetchPageScreenshots(); // Refresh the list
                handleCloseDialog();
            } catch (error) {
                console.error("Error adding page screenshot:", error);
            }
        }
    };

    const handleDeleteScreenshot = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/pagescreenshot/${deleteScreenshotId}`);
            fetchPageScreenshots(); // Refresh the list
            handleCloseDeleteModal();
        } catch (error) {
            console.error("Error deleting page screenshot:", error);
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

    return (
        <div>
            <div style={{ display: 'flex' }}>
                <SidebarMenu />
                <div style={{ marginLeft: 250, padding: 20 }}>
                    <h1>Page Screenshot Management</h1>
                    <Button variant="contained" color="primary" onClick={() => handleOpenDialog()}>
                        Add Page Screenshot
                    </Button>

                    {/* Page Screenshot Table */}
                    <PageScreenshotTable
                        pageScreenshots={pageScreenshots}
                        onEdit={handleOpenDialog}
                        onDelete={handleOpenDeleteModal}
                    />

                    {/* Add/Edit Dialog */}
                    <PageScreenshotFormDialog
                        open={openDialog}
                        handleClose={handleCloseDialog}
                        handleSubmit={handleSubmit}
                        isEditing={isEditing}
                        pageScreenshot={selectedPageScreenshot}
                        websites={websites}
                    />

                    {/* Delete Confirmation Modal */}
                    <DeleteConfirmationDialog
                        open={openDeleteModal}
                        handleClose={handleCloseDeleteModal}
                        handleDelete={handleDeleteScreenshot}
                    />
                </div>
            </div>
        </div>
    );
};

export default PageScreenshotManagementPage;
