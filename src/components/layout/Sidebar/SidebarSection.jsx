import SidebarItem from "./SidebarItem";

export default function SidebarSection({ section, items, onNavigate, isLast }) {
  return (
    <section
      aria-labelledby={`sidebar-section-${section.toLowerCase().replaceAll(" ", "-")}`}
      className={isLast ? "pt-3" : "border-b border-border-100 py-3"}
    >
      <h2
        id={`sidebar-section-${section.toLowerCase().replaceAll(" ", "-")}`}
        className="mb-1 px-2 text-xs font-semibold leading-[18px] text-secondary"
      >
        {section}
      </h2>
      <div className="space-y-1">
        {items.map((item) => (
          <SidebarItem key={item.href} item={item} onNavigate={onNavigate} />
        ))}
      </div>
    </section>
  );
}
