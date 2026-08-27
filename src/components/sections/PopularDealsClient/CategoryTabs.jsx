"use client";

export default function CategoryTabs({ tabs, activeTab, onSelectTab }) {
  return (
    <div
      role="tablist"
      aria-label="Car categories"
      className="mt-12 flex flex-wrap border-b border-border-200"
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
            className={`relative flex-1 min-w-[140px] pb-4 text-center text-[16px] sm:text-[22px] font-medium leading-[150%] transition-colors duration-200 ${
              isActive
                ? "text-secondary font-semibold"
                : "text-text-body hover:text-secondary"
            }`}
          >
            {tab}
            {/* Primary Colored 4px Active Border */}
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
