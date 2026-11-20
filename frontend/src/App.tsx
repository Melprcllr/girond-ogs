
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import DesignSystemPage from "./pages/DesignSystemPage/DesignSystemPage";
import AlertsPage from "./pages/AlertsPage/AlertsPage";
import AboutPage from "./pages/AboutPage/AboutPage";
import ContactPage from "./pages/ContactPage/ContactPage";
import LegalNoticePage from "./pages/LegalNoticePage/LegalNoticePage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage/PrivacyPolicyPage";
import PWAInstallPrompt from "./components/organisms/PWAInstallPrompt/PWAInstallPrompt";
import FAQPage from "./pages/FAQPage/FAQPage";
import ScrollToTop from "./utils/ScrollToTop/ScrollToTop";
import SeasonalAlertModal from "./components/organisms/SeasonalAlertModal/SeasonalAlertModal";

function App() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <SeasonalAlertModal />
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
                <Route path="/faq" element={<FAQPage />} />
            </Routes>

            <PWAInstallPrompt />
        </BrowserRouter>
    );
}

export default App;
