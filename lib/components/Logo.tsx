import Image from "next/image";
import Link from "next/link";
import { APP_NAME } from "../constant";

export default function Logo({ size = 150 }: { size?: number }) {
  return (
    <Link
      href="/"
      className="relative flex justify-center items-center px-0 -ml-2.5"
    >
      <Image
        src="/logoCrop2.png"
        alt={APP_NAME}
        width={size}
        height={size}
        className="relative z-10"
      />
      <div className="absolute rounded-full h-23 w-23 transform translate-y-[2.2%] -translate-x-[0.4%] bg-white" />
    </Link>
  );
}
