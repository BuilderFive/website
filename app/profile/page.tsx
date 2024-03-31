"use client";

import { HoverEffect } from "../../components/ui/card-hover-effect";

export default function CardHoverEffectDemo() {
  return (
    <div className="max-w-5xl mx-auto px-8">
      <HoverEffect items={projects} />
    </div>
  );
}
export const projects = [
  {
    title: "My Phung",
    description:
      "A legend in the making. A software engineer who is passionate about building products that make a difference.",
    link: "",
    image_url:
      "https://letsenhance.io/static/66c1b6abf8f7cf44c19185254d7adb0c/28ebd/AiArtBefore.jpg",
  },
  {
    title: "Anshul",
    description: "A cracked freshman who does cse",
    link: "",
    image_url:
      "https://letsenhance.io/static/66c1b6abf8f7cf44c19185254d7adb0c/28ebd/AiArtBefore.jpg",
  },
  {
    title: "Priyanshu",
    description: "A robotics master",
    link: "",
    image_url:
      "https://letsenhance.io/static/66c1b6abf8f7cf44c19185254d7adb0c/28ebd/AiArtBefore.jpg",
  },
  {
    title: "Alex",
    description: "A Calm and collected man.",
    link: "",
    image_url:
      "https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg",
  },
  {
    title: "Unknown",
    description: "A friend of Priyanshu",
    link: "",
    image_url: "https://images.emojiterra.com/mozilla/1024px/2754.png",
  },
  // {
  //   title: "Amazon",
  //   description:
  //     "A multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
  //   link: "",
  // },
  // {
  //   title: "Microsoft",
  //   description:
  //     "A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
  //   link: "",
  // },
];
