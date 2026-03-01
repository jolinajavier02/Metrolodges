import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import LandingPage from '../app/index';
import LoginPage from '../app/login';
import SignupPage from '../app/signup';

export function AppRouter() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
            </Routes>
        </BrowserRouter>
    );
}
