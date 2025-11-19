// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollTop from "./components/ScrollTop";

// Pages
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import ContactPage from "./pages/ContactPage";
import Workshops from "./pages/Workshop";
import TeamPage from "./pages/TeamPage";

// Quiz Components
import UserLogin from "./components/Quiz/User/UserLogin";
import Login from "./components/Quiz/Admin/Login";
import GetQuiz from "./components/Quiz/User/GetQuiz";
import AdminDashboard from "./components/Quiz/Admin/AdminDashboard";
import AdminQuizBuilder from "./components/Quiz/Admin/AdminQuizBuilder";
import ShowAvailableQuizzes from "./components/Quiz/Admin/ShowAvailableQuizzes";
import ViewResult from "./components/Quiz/Admin/ViewResult";
import Feedback from "./components/Quiz/User/Feedback";
import ViewFeedback from "./components/Quiz/Admin/ViewFeedback";
import EditQuizSection from "./components/Quiz/Admin/EditQuizSection";
import EventsManagement from "./components/Quiz/Admin/EventsManagement";

function Layout({ children }) {
  const location = useLocation();

  // Hide navbar, header, and footer on this route
  const hideLayout = location.pathname === "/quiz/UserQuiz";

  return (
    <>
      <ScrollTop />
      {!hideLayout && <Header />}
      {!hideLayout && <Navbar />}
      {children}
      {!hideLayout && <Footer />}
    </>
  );
}

const App = () => {
  return (
    <Router>
      <Layout>
      {/* Main content routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/teams" element={<TeamPage />} /> 
          <Route path="/quiz" element={<UserLogin/>}/>
          <Route path="/quiz/adminLogin" element={<Login/>}/>
          <Route path="/quiz/userQuiz" element={<GetQuiz/>} />
          <Route path="/quiz/adminDashboard" element={<AdminDashboard/>}/>
          <Route path="/quiz/createQuiz" element={<AdminQuizBuilder/>} />
          <Route path="/quiz/availableQuiz" element={<ShowAvailableQuizzes/>} />
          <Route path="/quiz/eventManagement" element={<EventsManagement/>}/>
          <Route path="/quiz/viewResults" element={<ViewResult/>} />
          <Route path="/quiz/feedback" element={<Feedback/>} />
          <Route path="/quiz/viewFeedback" element={<ViewFeedback/>}/>
          <Route path="/quiz/editQuiz" element={<EditQuizSection/>}/>
          {/* 2. Add the new route for the Contact page */}
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/workshop" element={<Workshops />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
