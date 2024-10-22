import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
} from "@mui/material";

const PageScreenshotFormDialog = ({ open, handleClose, handleSubmit, isEditing, elementScreenshot, websites }) => {
    const [imageFile, setImageFile] = useState(null);
    const [selectedWebsite, setSelectedWebsite] = useState(elementScreenshot.website || "");
    const [element, setElement] = useState(elementScreenshot.element || "");
    // Handle file input change
    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    // Handle form submission with file
    const handleSubmitWithFile = async () => {
        const formData = new FormData();
        formData.append("website", selectedWebsite._id);   // Append website ID
        formData.append("element", element);         // Append page type
        // Append description

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
        setSelectedWebsite(elementScreenshot.website || "");
        setElement(elementScreenshot.element || "");

        // Reset image file if switching between different screenshots
        setImageFile(null);
    }, [elementScreenshot]);

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
                    <InputLabel id="element-select-label">Element</InputLabel>
                    <Select
                        labelId="element-select-label"
                        value={element}
                        onChange={(e) => setElement(e.target.value)}
                        required
                    >
                        {/* Your page type options */}
                        <MenuItem value="card">Card</MenuItem>
                        <MenuItem value="table">Table</MenuItem>
                        <MenuItem value="button">Button</MenuItem>
                        {/* Add remaining options */}
                    </Select>
                </FormControl>

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
