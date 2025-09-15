import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import StudentLogin from './pages/student-login';
import SubjectChapterSelection from './pages/subject-chapter-selection';
import StudentDashboard from './pages/student-dashboard';
import TeacherLogin from './pages/teacher-login';
import PublicLandingPage from './pages/public-landing-page';
import TeacherDashboard from './pages/teacher-dashboard';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<PublicLandingPage />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/subject-chapter-selection" element={<SubjectChapterSelection />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/teacher-login" element={<TeacherLogin />} />
        <Route path="/public-landing-page" element={<PublicLandingPage />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
