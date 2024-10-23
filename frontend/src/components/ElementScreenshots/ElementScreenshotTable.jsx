import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const PageScreenshotTable = ({ elementScreenshots, onEdit, onDelete }) => {
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Website</TableCell>
                        <TableCell>Element Type</TableCell>
                        <TableCell>Image URL</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {elementScreenshots.map((screenshot) => (
                        <TableRow key={screenshot._id}>
                            <TableCell>{screenshot.website.name}</TableCell>
                            <TableCell>{screenshot.element}</TableCell>
                            <TableCell><img src={screenshot.imageUrl} alt={screenshot.description} style={{ width: "100px", height: "150px", objectFit: "contain", objectPosition: "25% 25%" }}></img></TableCell>
                            <TableCell>
                                <IconButton color="primary" onClick={() => onEdit(screenshot)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton color="secondary" onClick={() => onDelete(screenshot._id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default PageScreenshotTable;
