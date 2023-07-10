import { footerLinks } from "@/constant";
import Image from "next/image";
import Link from "next/link";

interface ColumnType {
  title: string;
  links: string[];
}
const FooterColumn = ({ title, links }: ColumnType) => (
  <div className="footer_column">
    <h4 className="font-semibold">{title}</h4>
    <ul className="flex flex-col gap-2 font-normal">
      {links.map((link, index) => (
        <Link href={"/"} key={index}>
          {link}
        </Link>
      ))}
    </ul>
  </div>
);

const Footer = () => {
  return (
    <footer className="flexStart footer">
      <div className="flex flex-col gap-12 w-full">
        <div className="flex items-start flex-col">
          <Image
            src={"/logo-purple.svg"}
            width={115}
            height={38}
            alt="Flexibble"
          />
        </div>
        <p className="text-start text-sm font-normal mt-5 max-w-xs">
          Flexibble is the world’s leading community for creatives to share,
          grow, and get hired.
        </p>
      </div>
      <div className="flex flex-wrap gap-12 w-full">
        {footerLinks.map(({ title, links }, index) => (
          <FooterColumn title={title} links={links} key={index} />
        ))}
      </div>
      <div className="flexBetween footer_copyright">
        <p>@ 2023 Flexible. All rights reserved</p>
        <p className="text-gray">
          <span className="text-black">10,214 </span>
          project submitted
        </p>
      </div>
    </footer>
  );
};

export default Footer;
