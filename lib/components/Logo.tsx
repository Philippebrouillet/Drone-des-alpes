import Image from "next/image";
import Link from "next/link";
import { APP_NAME } from "../constant";

export default function Logo({
  size = 140,
  crop = true,
}: {
  size?: number;
  crop?: boolean;
}) {
  return (
    <Link href="/" className="relative flex justify-center items-center">
      <Image
        src={crop ? "/logoCrop2.png" : "/logo.jpg"}
        alt={APP_NAME}
        width={size}
        height={size}
        className="rounded-full relative z-10"
      />
      <div className="absolute rounded-full h-21.5 w-21.5 bg-white" />
    </Link>
  );
}
