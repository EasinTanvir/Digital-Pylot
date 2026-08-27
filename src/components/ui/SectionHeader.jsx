export default function SectionHeader({ id, title, description }) {
  return (
    <div className="mx-auto max-w-2xl text-center space-y-5">
      <h2
        id={id}
        className="text-[32px] font-medium leading-normal tracking-[-0.02em] text-secondary sm:text-[40px] lg:text-[48px]"
      >
        {title}
      </h2>
      <p className="mx-auto  max-w-xl text-lg leading-normal text-text-body sm:text-base lg:text-lg">
        {description}
      </p>
    </div>
  );
}
