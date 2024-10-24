import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from '../pages/Home/Home.jsx';
import CategoryManagement from "../pages/Category/CategoryManagement.jsx";
import WebsiteManagement from "../pages/Website/WebsiteManagement.jsx";
import PageScreenshotManagementPage from "../pages/PageScreenshots/PageScreenshotsManagement.jsx";
import ElementScreenshotManagementPage from "../pages/ElementScreenshot/ElementScreenshotManagement.jsx";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/dashboard" element={<Home />} />
                <Route path="/dashboard/categories" element={<CategoryManagement />} />
                <Route path="/dashboard/websites" element={<WebsiteManagement />} />
                <Route path="/dashboard/pagescreenshots" element={<PageScreenshotManagementPage />} />
                <Route path="/dashboard/elementscreenshots" element={<ElementScreenshotManagementPage />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
