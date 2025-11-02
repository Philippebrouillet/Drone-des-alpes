import Image from "next/image";
import Link from "next/link";

export default function Logo({ size = 110 }: { size?: number }) {
  return (
    <Link href="/">
      <Image
        src="/logoCrop.png"
        alt="Drone des Alpes"
        width={size}
        height={size}
        className="rounded-lg"
        style={{ width: "auto", height: "auto" }}
      />
    </Link>
  );
}
