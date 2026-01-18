"use client";
import { TransitionLink, usePageTransition } from "../context/pageTransition";

const Links = [
  { href: "/", label: "Home" },
  { href: "/carousel", label: "Carousel" },
  { href: "/counter", label: "Counter" },
];

export default function Nav() {
  const { isReady } = usePageTransition();
  return (
    <nav className="flex space-x-4 z-10 fixed top-0">
      {Links.map(({ href, label }) => (
        <TransitionLink
          key={href}
          href={href}
          className={`px-3 py-2 rounded-md text-sm font-medium ${
            isReady
              ? "text-white bg-blue-500 hover:bg-blue-600"
              : "text-gray-300 bg-gray-700 cursor-not-allowed"
          }`}
        >
          {label}
        </TransitionLink>
      ))}
    </nav>
  );
}
