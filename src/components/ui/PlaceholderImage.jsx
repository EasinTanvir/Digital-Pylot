import Image from "next/image";

export default function PlaceholderImage({ className = "", alt = "" }) {
  return <Image src="/car-placeholder.svg" alt={alt} width={640} height={400} className={className} />;
}
