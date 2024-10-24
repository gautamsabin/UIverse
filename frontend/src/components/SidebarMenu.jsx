import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText } from '@mui/material';

const SidebarMenu = () => {
    return (
        <div style={{ width: 200, maxWidth: 200, padding: 20, backgroundColor: '#b8e1e3' }}>
            <h2>Menu</h2>
            <List>
                <ListItem button component={Link} to="/dashboard/categories">
                    <ListItemText primary="Categories" />
                </ListItem>
                <ListItem button component={Link} to="/dashboard/websites">
                    <ListItemText primary="Websites" />
                </ListItem>
                <ListItem button component={Link} to="/dashboard/pagescreenshots">
                    <ListItemText primary="Pages" />
                </ListItem>
                <ListItem button component={Link} to="/dashboard/elementscreenshots">
                    <ListItemText primary="UI Elements" />
                </ListItem>
            </List>
        </div>
    );
};

export default SidebarMenu;
