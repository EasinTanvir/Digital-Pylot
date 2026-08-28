import SidebarItem from "./SidebarItem";

export default function SidebarSection({ section, items, onNavigate, isLast }) {
  return (
    <section
      aria-labelledby={`sidebar-section-${section.toLowerCase().replaceAll(" ", "-")}`}
      className={isLast ? "pt-3" : "border-b border-border-150 py-3"}
    >
      <h2
        id={`sidebar-section-${section.toLowerCase().replaceAll(" ", "-")}`}
        className={`mb-2 px-2 text-xs  leading-[18px] text-secondary ${section === "Main" ? "font-semibold" : "font-bold"} `}
      >
        {section}
      </h2>
      <div className="space-y-1.5">
        {items.map((item) => (
          <SidebarItem key={item.href} item={item} onNavigate={onNavigate} />
        ))}
      </div>
    </section>
  );
}
