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
                        <TableCell>Logo</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>URL</TableCell>
                        <TableCell>Fonts</TableCell>
                        <TableCell>Colors</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Actions</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {websites.map((website) => (
                        <TableRow key={website.website._id}>
                            <TableCell>{website.website.name}</TableCell>
                            <TableCell>
                                {website.pageScreenshots
                                    .filter((data) => data.page === "logo")
                                    .map((logoScreenshot, index) => (
                                        <div key={index}>
                                            <img src={logoScreenshot.imageUrl} style={{ width: '50px', height: 'auto' }} alt={`${website.website.name} logo`} />
                                        </div>
                                    ))}
                            </TableCell>
                            <TableCell>{website.website.category.name}</TableCell>
                            <TableCell>{website.website.url}</TableCell>
                            <TableCell>{website.website.fonts}</TableCell>
                            <TableCell>
                                {website.website.colors.split(',').map((color, index) => (
                                    <div
                                        key={index}
                                        style={{
                                            borderRadius: "100px",
                                            height: "20px",
                                            width: "20px",
                                            backgroundColor: color.trim(), // Ensure colors are trimmed for valid values
                                            display: "inline-block",
                                            marginRight: "5px"
                                        }}
                                    ></div>
                                ))}
                            </TableCell>
                            <TableCell>{website.website.description}</TableCell>
                            <TableCell>
                                <IconButton color="primary" onClick={() => onEdit(website.website)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton color="secondary" onClick={() => onDelete(website.website._id)}>
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
