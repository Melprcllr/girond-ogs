
import type { ReactNode } from "react";
import "./FilterAccordion.scss";

interface FilterAccordionProps {
    title: string;
    children: ReactNode;
    isOpen: boolean;
    onToggle: () => void;
    activeCount?: number;
    className?: string;
}

function FilterAccordion({
    title,
    children,
    isOpen,
    onToggle,
    activeCount = 0,
    className = "",
}: FilterAccordionProps) {
    const classes = [
        "filter-accordion",
        isOpen ? "filter-accordion--open" : "",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <section className={classes}>
            <h3 className="filter-accordion__heading">
                <button
                    type="button"
                    className="filter-accordion__trigger"
                    onClick={onToggle}
                    aria-expanded={isOpen}
                >
                    <span className="filter-accordion__title">
                        {title}
                    </span>

                    <span className="filter-accordion__actions">
                        {activeCount > 0 && (
                            <span className="filter-accordion__count">
                                {activeCount}
                            </span>
                        )}

                        <span
                            className="filter-accordion__chevron"
                            aria-hidden="true"
                        />
                    </span>
                </button>
            </h3>

            {isOpen && (
                <div className="filter-accordion__content">
                    {children}
                </div>
            )}
        </section>
    );
}

export default FilterAccordion;
