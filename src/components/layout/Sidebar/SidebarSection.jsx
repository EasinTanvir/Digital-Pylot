import SidebarItem from "./SidebarItem";

export default function SidebarSection({ section, items, onNavigate, isLast }) {
  return (
    <section
      aria-labelledby={`sidebar-section-${section.toLowerCase().replaceAll(" ", "-")}`}
      className={isLast ? "pt-2" : "border-b border-border-100 py-2"}
    >
      <h2
        id={`sidebar-section-${section.toLowerCase().replaceAll(" ", "-")}`}
        className="mb-1 px-2 text-[8px] font-bold leading-4 text-secondary"
      >
        {section}
      </h2>
      <div className="space-y-0.5">
        {items.map((item) => (
          <SidebarItem key={item.href} item={item} onNavigate={onNavigate} />
        ))}
      </div>
    </section>
  );
}
