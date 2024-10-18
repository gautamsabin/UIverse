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

const CategoryTable = ({ categories, onEdit, onDelete }) => {
    return (
        <TableContainer component={Paper} style={{ marginTop: "20px" }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {categories.map((category) => (
                        <TableRow key={category._id}>
                            <TableCell>{category.name}</TableCell>
                            <TableCell>
                                <IconButton color="primary" onClick={() => onEdit(category)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton color="secondary" onClick={() => onDelete(category._id)}>
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

export default CategoryTable;
