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
    <Link href="/" className="relative bg-red-200">
      <Image
        src={crop ? "/logoCrop2.png" : "/logo.jpg"}
        alt={APP_NAME}
        width={size}
        height={size}
        className="rounded-full relative z-100"
      />
      <div className="absolute left-1/2 top-1/2 transform translate-y-[-48%] z-0 translate-x-[-50%] rounded-full h-21.5 w-21.5 bg-white" />
    </Link>
  );
}
