export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border-150 bg-white">
      <div className="flex items-center justify-between px-6 pt-3 pb-10 text-gray-700 ">
        {/* Left Side */}
        <p className="text-table-header text-[13px]">
          {currentYear} © All Right Reserved
        </p>

        {/* Right Side */}
        <p className="text-sm">Designed & Developed</p>
      </div>
    </footer>
  );
}
