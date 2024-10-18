import React from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from "@mui/material";

const CategoryFormDialog = ({ open, handleClose, category, handleInputChange, handleSubmit, isEditing }) => {
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{isEditing ? "Edit Category" : "Add Category"}</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    name="name"
                    label="Category Name"
                    fullWidth
                    value={category.name}
                    onChange={handleInputChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit} color="primary">
                    {isEditing ? "Update" : "Add"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CategoryFormDialog;
