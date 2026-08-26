export default function Card({ children, className = "" }) {
  return (
    <section
      className={`rounded-lg border border-border-100 bg-white ${className}`}
    >
      {children}
    </section>
  );
}
