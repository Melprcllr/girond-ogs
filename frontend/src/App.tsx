
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import DesignSystemPage from "./pages/DesignSystemPage/DesignSystemPage";
import AlertsPage from "./pages/AlertsPage/AlertsPage";
import AboutPage from "./pages/AboutPage/AboutPage";
import ContactPage from "./pages/ContactPage/ContactPage";
import LegalNoticePage from "./pages/LegalNoticePage/LegalNoticePage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage/PrivacyPolicyPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/alertes" element={<AlertsPage />} />
                <Route path="/a-propos" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/design-system" element={<DesignSystemPage />} />
                <Route path="/mentions-legales" element={<LegalNoticePage />} />
                <Route
                    path="/politique-confidentialite"
                    element={<PrivacyPolicyPage />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
