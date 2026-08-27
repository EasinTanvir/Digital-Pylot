import Image from "next/image";
import Link from "next/link";
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
  { name: "Facebook", href: "https://facebook.com", icon: ICONS.facebookIcon },
  { name: "Twitter", href: "https://twitter.com", icon: ICONS.twitterIcon },
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: ICONS.instagramIcon,
  },
];

export default function Footer() {
  return (
    <footer className="bg-surface-350 text-secondary border-t border-border-100">
      <Container className="pt-12 sm:px-6 lg:pt-16 pb-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5 lg:gap-8">
          {/* Brand & Mission Section */}
          <div className="flex flex-col items-start lg:col-span-2">
            <Link
              href="/"
              className="inline-block transition-opacity hover:opacity-80"
            >
              <Image
                src={ICONS.logo}
                alt="Best Auto Logo"
                width={140}
                height={40}
                className="h-10 w-auto object-contain"
              />
            </Link>

            <p className="mt-4 max-w-xs text-sm font-medium leading-relaxed text-text-body">
              Our vision is to provide convenience and help increase your sales
              business.
            </p>

            {/* Social Icons with Fallback Badges */}
            <div className="mt-14 flex items-center gap-3">
              {socialIcons.map((social) => (
                <Link
                  key={social.name}
                  aria-label={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full  transition-all duration-200 "
                >
                  <Image
                    src={social.icon}
                    alt={social.name}
                    width={16}
                    height={16}
                    className="h-20 w-20 object-cover"
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Dynamic Navigation Columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-1 lg:col-span-3">
            {footerLinks.map((section) => (
              <div key={section.title} className="flex flex-col gap-4">
                <h3 className=" leading-normal font-semibold text-secondary tracking-custom">
                  {section.title}
                </h3>
                <ul className="flex flex-col gap-2.5">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm font-medium hover:underline tracking-custom  text-text-body transition-colors duration-200 hover:text-primary"
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
        <div className="font-semibold  leading-normal tracking-custom mt-12 flex flex-col-reverse gap-4 border-t border-gray-200 pt-8  text-text-body sm:flex-row sm:items-center sm:justify-between">
          <p className=" ">© 2026 Best Auto. All rights reserved</p>

          <div className="flex items-center gap-6">
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
