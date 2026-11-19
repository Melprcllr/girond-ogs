
import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";

import "./FAQAccordion.scss";

interface FAQAccordionProps {
    question: string;
    children: ReactNode;
    isOpen: boolean;
    onToggle: () => void;
    id: string;
}

function FAQAccordion({
    question,
    children,
    isOpen,
    onToggle,
    id,
}: FAQAccordionProps) {
    const contentId = `${id}-content`;

    return (
        <section
            className={`faq-accordion${isOpen ? " faq-accordion--open" : ""}`}
        >
            <h3 className="faq-accordion__heading">
                <button
                    type="button"
                    className="faq-accordion__trigger"
                    onClick={onToggle}
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                >
                    <span className="faq-accordion__question">
                        {question}
                    </span>

                    <ChevronDown
                        className="faq-accordion__icon"
                        size={20}
                        aria-hidden="true"
                    />
                </button>
            </h3>

            <div
                id={contentId}
                className="faq-accordion__content"
                hidden={!isOpen}
            >
                <div className="faq-accordion__answer">
                    {children}
                </div>
            </div>
        </section>
    );
}

export default FAQAccordion;
