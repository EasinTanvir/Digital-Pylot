"use client";

export default function CategoryTabs({ tabs, activeTab, onSelectTab }) {
  return (
    <div
      role="tablist"
      aria-label="Car categories"
      /* Use matching grid columns and gap to match the cards grid below */
      className="lg:mt-20 mt-14 grid grid-cols-2 gap-4 border-b border-border-200 lg:grid-cols-4 lg:gap-6"
    >
      {tabs.map((tab) => {
        const isActive = tab === activeTab;
        return (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelectTab(tab)}
            style={{ letterSpacing: "-0.02em" }}
            className={`relative w-full pb-4 text-center text-[16px] font-medium leading-normal transition-colors duration-200 sm:text-[22px] ${
              isActive
                ? "font-semibold text-secondary"
                : "text-text-body hover:text-secondary"
            }`}
          >
            {tab}
            {/* Active 4px border spans the full width of the grid column */}
            <span
              className={`absolute bottom-0 left-0 right-0 h-[4px] rounded-t-sm transition-all duration-200 ${
                isActive ? "bg-primary" : "bg-transparent"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}
