import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from "@mui/material";

const PageScreenshotTable = ({ pageScreenshots, onEdit, onDelete }) => {
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Website</TableCell>
                        <TableCell>Page Type</TableCell>
                        <TableCell>Image URL</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {pageScreenshots.map((screenshot) => (
                        <TableRow key={screenshot._id}>
                            <TableCell>{screenshot.website.name}</TableCell>
                            <TableCell>{screenshot.page}</TableCell>
                            <TableCell><img src={screenshot.imageUrl} alt={screenshot.description} style={{ width: "100px", height: "auto" }}></img></TableCell>
                            <TableCell>{screenshot.description}</TableCell>

                            <TableCell>
                                <Button onClick={() => onEdit(screenshot)}>Edit</Button>
                                <Button onClick={() => onDelete(screenshot._id)}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default PageScreenshotTable;
