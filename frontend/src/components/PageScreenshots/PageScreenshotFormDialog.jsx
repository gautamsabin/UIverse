import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
} from "@mui/material";

const PageScreenshotFormDialog = ({ open, handleClose, handleSubmit, isEditing, pageScreenshot, websites }) => {
    const [imageFile, setImageFile] = useState(null);
    const [selectedWebsite, setSelectedWebsite] = useState(pageScreenshot.website || "");
    const [pageType, setPageType] = useState(pageScreenshot.pageType || "");
    const [description, setDescription] = useState(pageScreenshot.description || "");

    // Handle file input change
    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    // Handle form submission with file
    const handleSubmitWithFile = async () => {
        const formData = new FormData();
        formData.append("website", selectedWebsite._id);   // Append website ID
        formData.append("pageType", pageType);         // Append page type
        formData.append("description", description);   // Append description

        if (imageFile) {
            formData.append("image", imageFile);       // Append image file only if it exists
        }

        // Debugging: Ensure form data fields are being set correctly
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }
        console.log(formData)

        await handleSubmit(formData);
    };

    // Update form state when pageScreenshot prop changes
    useEffect(() => {
        setSelectedWebsite(pageScreenshot.website || "");
        setPageType(pageScreenshot.pageType || "");
        setDescription(pageScreenshot.description || "");
        // Reset image file if switching between different screenshots
        setImageFile(null);
    }, [pageScreenshot]);

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{isEditing ? "Edit Page Screenshot" : "Add Page Screenshot"}</DialogTitle>
            <DialogContent>
                <FormControl fullWidth margin="dense">
                    <InputLabel id="website-select-label">Website</InputLabel>
                    <Select
                        labelId="website-select-label"
                        value={selectedWebsite}
                        onChange={(e) => setSelectedWebsite(e.target.value)}
                        required
                    >
                        {websites.map((website) => (
                            <MenuItem key={website._id} value={website}>
                                {website.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth margin="dense">
                    <InputLabel id="page-type-select-label">Page Type</InputLabel>
                    <Select
                        labelId="page-type-select-label"
                        value={pageType}
                        onChange={(e) => setPageType(e.target.value)}
                        required
                    >
                        {/* Your page type options */}
                        <MenuItem value="about">About</MenuItem>
                        <MenuItem value="blog">Blog</MenuItem>
                        <MenuItem value="career">Career</MenuItem>
                        <MenuItem value="catalog">Catalog</MenuItem>
                        <MenuItem value="contact">Contact</MenuItem>
                        <MenuItem value="dashboard">Dashboard</MenuItem>
                        <MenuItem value="FAQs">FAQs</MenuItem>
                        <MenuItem value="features">Features</MenuItem>
                        <MenuItem value="landing">Landing</MenuItem>
                        <MenuItem value="logo">Logo</MenuItem>
                        <MenuItem value="login">Login</MenuItem>
                        <MenuItem value="profile">Profile</MenuItem>
                        <MenuItem value="services">services</MenuItem>
                        <MenuItem value="signup">Signup</MenuItem>
                        <MenuItem value="team">Team</MenuItem>
                        <MenuItem value="404">404</MenuItem>
                        <MenuItem value="other">Other</MenuItem>
                        {/* Add remaining options */}
                    </Select>
                </FormControl>

                <TextField
                    margin="dense"
                    name="description"
                    label="Description"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ marginTop: 16 }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSubmitWithFile} color="primary">
                    {isEditing ? "Update" : "Add"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default PageScreenshotFormDialog;
