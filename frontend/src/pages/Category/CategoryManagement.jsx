import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import axios from "axios";
import CategoryTable from "../../components/Category/CategoryTable.jsx";
import CategoryFormDialog from "../../components/Category/CategoryFormDialog.jsx";
import DeleteConfirmationDialog from "../../components/DeleteConfirmationDialog.jsx";
import SidebarMenu from "../../components/SidebarMenu.jsx";
import ErrorMessage from "../../components/ErrorMessage.jsx";

const CategoryManagementPage = () => {
    const [categories, setCategories] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState({ name: "" });
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [deleteCategoryId, setDeleteCategoryId] = useState(null);
    const [errorMessage, setErrorMessage] = useState(''); // State for error message
    const [openError, setOpenError] = useState(false); // State to control Snackbar visibility

    // Fetch categories on component mount
    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/category");
            setCategories(response.data.payload.data);
        } catch (error) {
            console.error("Error fetching categories:", error.response);
            setErrorMessage(error.response?.data?.message || "Failed to fetch categories."); // Set the error message
            setOpenError(true); // Open the Snackbar
        }
    };

    const handleOpenDialog = (category = null) => {
        setSelectedCategory(category || { name: "" });
        setIsEditing(Boolean(category));
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedCategory({ name: "" });
    };

    const handleInputChange = (e) => {
        setSelectedCategory({ ...selectedCategory, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (isEditing) {
            // Update category
            try {
                await axios.patch(`http://localhost:5000/api/category/${selectedCategory._id}`, selectedCategory);
                fetchCategories(); // Refresh the list
                handleCloseDialog();
            } catch (error) {
                console.error("Error updating category:", error);
                setErrorMessage(error.response?.data?.message || "Failed to update category."); // Set the error message
                setOpenError(true); // Open the Snackbar
            }
        } else {
            // Add new category
            try {
                await axios.post("http://localhost:5000/api/category", selectedCategory);
                fetchCategories();
                handleCloseDialog();
            } catch (error) {
                console.error("Error adding category:", error);
                setErrorMessage(error.response?.data?.message || "Failed to add category."); // Set the error message
                setOpenError(true); // Open the Snackbar
            }
        }
    };

    const handleDeleteCategory = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/category/${deleteCategoryId}`);
            fetchCategories(); // Refresh the list
            handleCloseDeleteModal();
        } catch (error) {
            console.error("Error deleting category:", error);
            setErrorMessage(error.response?.data?.message || "Failed to delete category."); // Set the error message
            setOpenError(true); // Open the Snackbar
        }
    };

    const handleOpenDeleteModal = (id) => {
        setDeleteCategoryId(id);
        setOpenDeleteModal(true);
    };

    const handleCloseDeleteModal = () => {
        setOpenDeleteModal(false);
        setDeleteCategoryId(null);
    };
    const handleCloseErrorMessage = () => {
        setOpenError(false); // Close the Snackbar
    };

    return (
        <div>
            <div style={{ display: 'flex' }}>
                <SidebarMenu />
                <div style={{ marginLeft: 50, padding: 20 }}>
                    <h1>Category Management</h1>
                    <Button variant="contained" color="primary" onClick={() => handleOpenDialog()}>
                        Add Category
                    </Button>

                    {/* Category Table */}
                    <CategoryTable categories={categories} onEdit={handleOpenDialog} onDelete={handleOpenDeleteModal} />

                    {/* Add/Edit Dialog */}
                    <CategoryFormDialog
                        open={openDialog}
                        handleClose={handleCloseDialog}
                        category={selectedCategory}
                        handleInputChange={handleInputChange}
                        handleSubmit={handleSubmit}
                        isEditing={isEditing}
                    />

                    {/* Delete Confirmation Modal */}
                    <DeleteConfirmationDialog
                        open={openDeleteModal}
                        handleClose={handleCloseDeleteModal}
                        handleDelete={handleDeleteCategory}
                    />

                    {/* Error Message Snackbar */}
                    <ErrorMessage message={errorMessage} open={openError} onClose={handleCloseErrorMessage} />
                </div>
            </div>
        </div>
    );
};

export default CategoryManagementPage;
