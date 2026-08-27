export function PinIcon() {
  return <span aria-hidden="true">●</span>;
}
export function CalendarIcon() {
  return <span aria-hidden="true">▦</span>;
}
export function CarIcon() {
  return <span aria-hidden="true">▱</span>;
}
export function HeartIcon({ filled = false }) {
  return <span aria-hidden="true">{filled ? "♥" : "♡"}</span>;
}
export function ArrowIcon({ direction = "right" }) {
  return <span aria-hidden="true">{direction === "left" ? "←" : "→"}</span>;
}
