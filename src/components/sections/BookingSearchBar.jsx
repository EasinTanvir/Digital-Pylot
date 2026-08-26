const fields = [
  ["Locations", "Select your city"], ["Date", "Select your date"], ["Time", "Select your time"],
];

function SearchFields({ legend, prefix }) {
  return (
    <fieldset className="grid gap-3 sm:grid-cols-3 sm:gap-4">
      <legend className="mb-3 text-xs font-bold text-secondary">{legend}</legend>
      {fields.map(([label, placeholder]) => (
        <label key={`${prefix}-${label}`} className="block">
          <span className="block text-[11px] font-bold text-secondary">{label}</span>
          <select aria-label={`${legend} ${label}`} defaultValue="" className="mt-1 w-full appearance-none bg-transparent text-[10px] text-text-body outline-none">
            <option value="" disabled>{placeholder}</option>
            <option>London</option><option>12 June 2026</option><option>10:00 AM</option>
          </select>
        </label>
      ))}
    </fieldset>
  );
}

export default function BookingSearchBar() {
  return (
    <section id="booking-search" aria-label="Car booking search" className="relative z-10 bg-page-bg px-6 lg:px-8">
      <form className="mx-auto -mt-6 max-w-7xl rounded-lg bg-white p-5 shadow-[0_10px_30px_rgba(17,19,35,0.08)] lg:-mt-10 lg:grid lg:grid-cols-[1fr_1fr_auto] lg:items-end lg:gap-8">
        <SearchFields legend="Pick-Up" prefix="pickup" />
        <SearchFields legend="Drop-Off" prefix="dropoff" />
        <button type="submit" className="mt-5 bg-secondary px-7 py-3 text-xs font-bold text-white lg:mt-0">Search</button>
      </form>
    </section>
  );
}
