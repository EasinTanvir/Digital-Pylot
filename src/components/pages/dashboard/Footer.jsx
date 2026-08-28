export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border-150 bg-white">
      <div className="flex items-center justify-between px-6 pt-3 pb-6 text-xs text-text-body">
        {/* Left Side */}
        <p>{currentYear} © All Right Reserved</p>

        {/* Right Side */}
        <p>Designed & Developed</p>
      </div>
    </footer>
  );
}
