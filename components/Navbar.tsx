import { NavLinks } from "@/constant";
import Image from "next/image";
import Link from "next/link";
import AuthProviders from "./AuthProviders";
import { getCurrentUser } from "@/lib/session";

const Navbar = async () => {
  const session = await getCurrentUser();
  return (
    <header className="flexBetween navbar">
      <nav className="flex-1 flexStart gap-10">
        <Link href={"/"}>
          <Image src={"/logo.svg"} width={115} height={43} alt="Flexibble" />
        </Link>
        <ul className="xl:flex hidden text-small gap-7">
          {NavLinks.map(({ href, key, text }) => (
            <Link key={key} href={href}>
              {text}
            </Link>
          ))}
        </ul>
      </nav>
      <div className="flexCenter gap-4">
        {session?.user ? (
          <>
            {session?.user?.image && (
              <Image
                src={session?.user?.image}
                height={40}
                width={40}
                alt={session.user.name}
              />
            )}
            <Link href={"/create-project"}>Share work</Link>
          </>
        ) : (
          <AuthProviders />
        )}
      </div>
    </header>
  );
};

export default Navbar;
