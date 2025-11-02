import Image from "next/image";
import Link from "next/link";

export default function Logo({ size }: { size?: number }) {
  return (
    <Link href="/">
      <Image
        src="/logoCrop.png"
        alt="Drone des Alpes"
        width={size || 110}
        height={size || 110}
        className="rounded-lg"
      />
    </Link>
  );
}
