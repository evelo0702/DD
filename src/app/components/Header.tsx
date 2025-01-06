import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center mx-4">
      <Image src="/main.png" alt="" width={100} height={100} />
      <Link className="text-5xl" href="/">
        DevPedia
      </Link>
      <nav className="">
        <ul>
          <li>
            <Link href="/ai" className="mx-4 text-3xl">
              AI 사전 검색
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
