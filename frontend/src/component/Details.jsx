import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HelpCircle } from "lucide-react";
import Link from "react-router-dom"; // Adjusted to use React Router
import Image from "next/image"; // If you're using a different image component, change this accordingly
import { GitHubLogoIcon } from "lucide-react"; // Using lucide-react for the GitHub icon

const Details = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <span className="flex items-center px-2 py-1 text-white rounded-md bg-slate-800 animate-bounce">
          What is this
          <HelpCircle className="w-5 h-5 ml-1" />
        </span>
      </DialogTrigger>
      <DialogContent className="w-[70vw] max-w-[100vw] md:w-[50vw]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Welcome to Quiz@Ease!</DialogTitle>
          <DialogDescription>
            <p className="my-2 mt-4">
              Are you tired of mundane and repetitive quizzes? Say goodbye to
              the ordinary and embrace the extraordinary with Quiz@Ease! Our
              platform is revolutionizing the quiz and trivia experience by
              harnessing the immense potential of artificial intelligence.
            </p>
            <hr />
            <p className="my-2 font-semibold">
              <span className="text-base font-semibold">Built with</span>
              <div className="grid justify-around grid-cols-4 mt-2 gap-y-3">
                {[
                  { src: "/nextjs.png", alt: "nextjs", label: "Next.js" },
                  { src: "/tailwind.png", alt: "tailwind", label: "Tailwind" },
                  { src: "/nextauth.png", alt: "nextauth", label: "NextAuth" },
                  { src: "/openai.png", alt: "openai", label: "OpenAI" },
                  {
                    src: "/react-query.png",
                    alt: "react query",
                    label: "React Query",
                  },
                  { src: "/prisma.png", alt: "prisma", label: "Prisma" },
                  {
                    src: "/typescript.png",
                    alt: "typescript",
                    label: "TypeScript",
                  },
                ].map(({ src, alt, label }) => (
                  <div className="flex items-center gap-2" key={alt}>
                    <Image alt={alt} src={src} width={35} height={35} />
                    <span className="hidden md:block lg:block">{label}</span>
                  </div>
                ))}
              </div>
            </p>
            <p className="my-2 font-semibold">
              <span className="text-base font-semibold mb-1">
                Deployed using
              </span>
              <div className="grid justify-around grid-cols-4 mt-2 gap-y-3">
                {[
                  {
                    src: "/digitalocean.svg",
                    alt: "Digital Ocean",
                    label: "Digital Ocean",
                  },
                  { src: "/docker.svg", alt: "Docker", label: "Docker" },
                  { src: "/nginx.svg", alt: "Nginx", label: "Nginx" },
                  { src: "/certbot.png", alt: "certbot", label: "certbot" },
                ].map(({ src, alt, label }) => (
                  <div className="flex items-center gap-2" key={alt}>
                    <Image alt={alt} src={src} width={35} height={35} />
                    <span className="hidden md:block lg:block">{label}</span>
                  </div>
                ))}
              </div>
            </p>
            <p className="my-2 font-semibold">
              <span className="text-base font-semibold mb-1">
                No downtime CI/CD ensured using
              </span>
              <div className="grid justify-around grid-cols-4 mt-2 gap-y-3">
                <div className="flex items-center gap-2">
                  <Image
                    alt="Github Actions"
                    src="/GitHubActions.svg"
                    width={35}
                    height={35}
                  />
                  <span className="">Github Actions</span>
                </div>
              </div>
            </p>
            <hr />
            <div className="flex flex-row justify-center items-center gap-2">
              <p className="my-2 font-semibold">
                This project is open sourced, feel free to contribute
              </p>
              <Link to={"https://github.com/AnonO6/quiz-at-ease"}>
                <GitHubLogoIcon />
              </Link>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default Details;
