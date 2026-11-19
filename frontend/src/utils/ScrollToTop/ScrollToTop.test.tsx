
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes, useNavigate } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";

import ScrollToTop from "./ScrollToTop";

function TestPage() {
    const navigate = useNavigate();

    return (
        <>
            <p>Page de test</p>
            <button onClick={() => navigate("/contact")}>
                Aller au contact
            </button>
        </>
    );
}

describe("ScrollToTop", () => {
    beforeEach(() => {
        window.scrollTo = vi.fn();
    });

    it("remonte en haut de page lors d'un changement de route", async () => {
        render(
            <MemoryRouter initialEntries={["/faq"]}>
                <ScrollToTop />
                <Routes>
                    <Route path="/faq" element={<TestPage />} />
                    <Route
                        path="/contact"
                        element={<p>Page contact</p>}
                    />
                </Routes>
            </MemoryRouter>
        );

        expect(window.scrollTo).toHaveBeenCalledWith({
            top: 0,
            left: 0,
            behavior: "instant",
        });

        vi.mocked(window.scrollTo).mockClear();

        fireEvent.click(
            screen.getByRole("button", { name: "Aller au contact" })
        );

        expect(await screen.findByText("Page contact")).toBeInTheDocument();

        expect(window.scrollTo).toHaveBeenCalledWith({
            top: 0,
            left: 0,
            behavior: "instant",
        });
    });
});
