import Image from "next/image";

export default function Logo() {
    return (
        <Image
            className="invert pt-2"
            src="https://nextjs.org/icons/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
        />
    );
}
