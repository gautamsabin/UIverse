import React from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
} from "@mui/material";

const WebsiteFormDialog = ({ open, handleClose, website, handleInputChange, handleSubmit, isEditing, categories }) => {
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{isEditing ? "Edit Website" : "Add Website"}</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    name="name"
                    label="Website Name"
                    fullWidth
                    value={website.name}
                    onChange={handleInputChange}
                />
                <TextField
                    margin="dense"
                    name="url"
                    label="Website URL"
                    fullWidth
                    value={website.url}
                    onChange={handleInputChange}
                />
                {/* Category Dropdown */}
                <FormControl fullWidth margin="dense">
                    <InputLabel>Category</InputLabel>
                    <Select
                        name="category"
                        value={website.category || ""} // Adjust for selected category
                        onChange={handleInputChange}
                    >
                        {categories.map((category) => (
                            <MenuItem key={category._id} value={category._id}>
                                {category.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    margin="dense"
                    name="description"
                    label="Description"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={website.description}
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

export default WebsiteFormDialog;
