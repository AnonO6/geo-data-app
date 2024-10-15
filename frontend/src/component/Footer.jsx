import { Github, GithubIcon, Linkedin, User } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <div className="inset-x-0 bottom-0 overflow-hidden overscroll-contain bg-gray-800 text-white z-[10] h-fit py-2 ">
      <div className="flex items-center justify-between h-full gap-2 px-8 mx-auto max-w-7xl">
        <p className="text-l font-bold">
          Developed with ❤️ by{" "}
          <a href={"https://www.github.com/AnonO6"}>Aviral Shukla</a>{" "}
        </p>
        <div className="flex items-center justify-between gap-4">
          <a href={"https://www.linkedin.com/in/aviral-shukla-85b112228/"}>
            <Linkedin />
          </a>
          <a href={"https://www.github.com/AnonO6"}>
            <GithubIcon />
          </a>
          <a href={"https://aviral.software"}>
            <User />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
