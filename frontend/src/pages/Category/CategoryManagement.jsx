import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import axios from "axios";
import CategoryTable from "../../components/Category/CategoryTable.jsx";
import CategoryFormDialog from "../../components/Category/CategoryFormDialog.jsx";
import DeleteConfirmationDialog from "../../components/DeleteConfirmationDialog.jsx";
import SidebarMenu from "../../components/SidebarMenu.jsx";

const CategoryManagementPage = () => {
    const [categories, setCategories] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState({ name: "" });
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [deleteCategoryId, setDeleteCategoryId] = useState(null);

    // Fetch categories on component mount
    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/category");
            setCategories(response.data.payload.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
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
            }
        } else {
            // Add new category
            try {
                await axios.post("http://localhost:5000/api/category", selectedCategory);
                fetchCategories();
                handleCloseDialog();
            } catch (error) {
                console.error("Error adding category:", error);
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

    return (
        <div>
            <div style={{ display: 'flex' }}>
                <SidebarMenu />
                <div style={{ marginLeft: 250, padding: 20 }}>
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
                </div>
            </div>
        </div>
    );
};

export default CategoryManagementPage;
