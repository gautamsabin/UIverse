import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const WebsiteTable = ({ websites, onEdit, onDelete }) => {
    return (
        <TableContainer component={Paper} style={{ marginTop: "20px" }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>URL</TableCell>
                        <TableCell>Actions</TableCell>
                        <TableCell>Description</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {websites.map((website) => (
                        <TableRow key={website._id}>
                            <TableCell>{website.name}</TableCell>
                            <TableCell>{website.url}</TableCell>
                            <TableCell>{website.description}</TableCell>
                            <TableCell>
                                <IconButton color="primary" onClick={() => onEdit(website)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton color="secondary" onClick={() => onDelete(website._id)}>
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

export default WebsiteTable;
