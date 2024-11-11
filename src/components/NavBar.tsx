import { Fira_Sans_Extra_Condensed } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import searchIcon from "@/icons/search_icon.svg";

const fira_medium = Fira_Sans_Extra_Condensed({
  subsets: ["latin"],
  display: "swap",
  weight: "500",
  style: "normal"
});

const fira_light = Fira_Sans_Extra_Condensed({
  subsets: ["latin"],
  display: "swap",
  weight: "300",
  style: "normal"
});

interface navBarProps {
  name: string;
}

const NavBar: React.FC<navBarProps> = ({ name }) => {
  return (
    <nav className="w-full h-28 flex flex-row">
      <div className="w-1/2 h-full flex">
        <div className="w-1/4 h-full flex justify-center items-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/7216/7216128.png"
            className="h-10"
            alt=""
          />
        </div>
        <div className="w-3/4 h-full flex items-center gap-8">
          <Link href="/">
            <h1
              className={`font-bold text-5xl text-[#114238] ${fira_medium.className}`}
            >
              {name}
            </h1>
          </Link>
          <div className="border-t border-2 border-[#1F6657] w-44" />
        </div>
      </div>
      <div className="w-1/2 h-full flex items-center justify-end">
        <div
          id="CAIXA DE PESQUISA"
          className="m-10 flex items-center border border-black rounded-full w-[25rem] overflow-hidden"
        >
          <div className="p-2">
            <Image
              alt="search icon"
              src={searchIcon}
              width={35}
              height={35}
              className="text-[#114238]"
            />
          </div>
          <input
            type="text"
            placeholder="Pesquisar registro médico..."
            className={`w-full p-2 text-center outline-none text-[#114238] ${fira_light.className}`}
          />
        </div>
      </div>
    </nav>
  );
};
export default NavBar;
