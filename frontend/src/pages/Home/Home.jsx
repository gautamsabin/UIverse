import React from 'react';
import SidebarMenu from '../../components/SidebarMenu.jsx';

const Home = () => {
    return (
        <div style={{ display: 'flex' }}>
            <SidebarMenu />
            <div style={{ marginLeft: '240px', padding: '20px', width: '100%' }}>
                <h1>Welcome to the Management Dashboard</h1>
                <p>Select a category or website to manage from the sidebar.</p>
            </div>
        </div>
    );
};

export default Home;
