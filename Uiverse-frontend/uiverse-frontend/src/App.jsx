import Header from "./components/Header/Header";

import Footer from "./components/Footer/Footer";
import "./App.css";

import Contextprovider from "./Context/Context";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";

import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import CardDetails from "./pages/CardDetails";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./util/http";

function App() {
  const location = useLocation();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Contextprovider>
          {location.pathname !== "/signin" && <Header />}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/card" element={<CardDetails />}>
              <Route path=":cardId" element={<CardDetails />} />
            </Route>
            <Route path="/signin" element={<SignIn />} />
          </Routes>
          {location.pathname !== "/signin" && <Footer />}
        </Contextprovider>
      </QueryClientProvider>
    </>
  );
}

export default App;
