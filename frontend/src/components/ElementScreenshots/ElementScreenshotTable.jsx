import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from "@mui/material";

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
