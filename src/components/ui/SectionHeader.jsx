export default function SectionHeader({ id, title, description }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <h2 id={id} className="text-[32px] font-medium leading-[150%] tracking-[-0.02em] text-secondary sm:text-[40px] lg:text-[48px]">
        {title}
      </h2>
      <p className="mx-auto mt-2 max-w-xl text-sm leading-[150%] text-text-body sm:text-base lg:text-lg">
        {description}
      </p>
    </div>
  );
}
