import { localLinks, socialLinks, infoLinks } from "../constants.js";

function getLink(text) {
  return <p className="cursor-pointer hover:text-black">{text}</p>;
}

export default function Footer() {
  return (
    <div
      className="footer  flex mx-auto 
      justify-evenly mt-28 align-end pb-10 text-gray-700"
    >
      <div className="logo">
        <h1 className="text-3xl font-bold mb-4 cursor-pointer hover:text-black">
          Mentee
        </h1>
        {getLink(`2023 Mentee`)}
        {getLink("All rights reserved")}{" "}
      </div>

      <div className="links">{localLinks.map((link) => getLink(link))}</div>

      <div className="socials">{socialLinks.map((link) => getLink(link))}</div>

      <div className="info">{infoLinks.map((link) => getLink(link))}</div>
    </div>
  );
}
