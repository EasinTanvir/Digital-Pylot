import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa6";
import { ICONS } from "@/constants";
import Container from "../shared/Container";

const footerLinks = [
  {
    title: "About",
    links: [
      { name: "How it works", href: "#how-it-works" },
      { name: "Featured", href: "#featured" },
      { name: "Partnership", href: "#partnership" },
    ],
  },
  {
    title: "Community",
    links: [
      { name: "Events", href: "#events" },
      { name: "Blog", href: "#blog" },
      { name: "Podcast", href: "#podcast" },
    ],
  },
  {
    title: "Socials",
    links: [
      { name: "Discord", href: "#discord" },
      { name: "Instagram", href: "#instagram" },
      { name: "Twitter", href: "#twitter" },
    ],
  },
];

const socialIcons = [
  { name: "Facebook", href: "https://facebook.com", icon: FaFacebookF },
  { name: "Twitter", href: "https://twitter.com", icon: FaTwitter },
  { name: "Instagram", href: "https://instagram.com", icon: FaInstagram },
];

export default function Footer() {
  return (
    <footer className="bg-surface-350 text-secondary border-t border-border-100">
      <Container className="pt-10 pb-8 sm:px-6 sm:pt-12 lg:pt-16 lg:pb-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 lg:grid-cols-5 lg:gap-8">
          {/* Brand & Mission Section */}
          <div className="flex flex-col items-center text-center md:col-span-3 lg:col-span-2 lg:items-start lg:text-left">
            <Link
              href="/"
              className="inline-block transition-opacity hover:opacity-80"
            >
              <Image
                src={ICONS.logo}
                alt="Best Auto Logo"
                width={140}
                height={40}
                className="h-8 sm:h-10 w-auto object-contain"
              />
            </Link>

            <p className="mt-4 max-w-xs text-xs sm:text-sm font-medium leading-relaxed text-text-body">
              Our vision is to provide convenience and help increase your sales
              business.
            </p>

            {/* React Icons Social Bar */}
            <div className="mt-6 lg:mt-8 flex items-center justify-center lg:justify-start gap-3">
              {socialIcons.map((social) => {
                const IconComponent = social.icon;
                return (
                  <Link
                    key={social.name}
                    aria-label={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-secondary shadow-xs transition-all duration-200 hover:bg-primary hover:text-white hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <IconComponent className="h-4 w-4 shrink-0" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* 3-Column Footer Links Grid */}
          <div className="grid grid-cols-3 gap-4 text-center sm:gap-8 md:col-span-3 lg:text-left lg:col-span-3">
            {footerLinks.map((section) => (
              <div key={section.title} className="flex flex-col gap-3 sm:gap-4">
                <h3 className="text-xs sm:text-sm leading-normal font-semibold text-secondary tracking-custom">
                  {section.title}
                </h3>
                <ul className="flex flex-col gap-2 sm:gap-2.5">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-xs sm:text-sm font-medium hover:underline tracking-custom text-text-body transition-colors duration-200 hover:text-primary"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Legal Section */}
        <div className="font-semibold leading-normal tracking-custom mt-10 sm:mt-12 flex flex-col-reverse items-center justify-center text-center gap-4 border-t border-gray-200 pt-6 sm:pt-8 text-xs sm:text-sm text-text-body sm:flex-row sm:justify-between">
          <p>© 2026 Best Auto. All rights reserved</p>

          <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm">
            <Link
              href="#privacy"
              className="transition-colors duration-200 hover:text-primary hover:underline"
            >
              Privacy &amp; Policy
            </Link>
            <Link
              href="#terms"
              className="transition-colors duration-200 hover:text-primary hover:underline"
            >
              Terms &amp; Condition
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
