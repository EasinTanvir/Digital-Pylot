"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ICONS } from "@/constants";

export default function HeaderActions({ content }) {
  const [unreadCount] = useState("01");
  const [isComingSoonOpen, setIsComingSoonOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const comingSoonRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        comingSoonRef.current &&
        !comingSoonRef.current.contains(event.target)
      ) {
        setIsComingSoonOpen(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const comingSoonItems = [
    { label: "Feature One", href: "#" },
    { label: "Feature Two", href: "#" },
    { label: "Feature Three", href: "#" },
  ];

  return (
    <div className="flex items-center gap-2.5">
      <div className="hidden items-center gap-2.5 lg:flex">
        {/* Coming Soon Dropdown */}
        <div className="relative" ref={comingSoonRef}>
          <motion.button
            whileTap={{ scale: 0.97 }}
            type="button"
            onClick={() => setIsComingSoonOpen((prev) => !prev)}
            className="flex h-10 items-center gap-2 rounded-lg border border-border-150 bg-white px-3.5 text-xs font-medium text-text-heading transition-all hover:bg-[#F7F7F7]"
          >
            <Image
              src={ICONS?.catImageIcon || ICONS?.header?.car}
              alt=""
              width={22}
              height={16}
              className="object-contain"
            />
            <span>{content?.comingSoon || "Coming Soon"}</span>
            <motion.div
              animate={{ rotate: isComingSoonOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <Image
                src={ICONS?.arrowDropdownIcon || ICONS?.chevronDown}
                alt=""
                width={10}
                height={10}
                className="opacity-70"
              />
            </motion.div>
          </motion.button>

          <AnimatePresence>
            {isComingSoonOpen && (
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.96 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="absolute left-0 top-[calc(100%+8px)] z-50 w-48 rounded-lg border border-border-150 bg-white py-1.5 shadow-lg"
              >
                {comingSoonItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="block px-4 py-2 text-xs font-medium text-text-heading transition-colors hover:bg-[#F7F7F7]"
                    onClick={() => setIsComingSoonOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Add New Button */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          type="button"
          className="flex h-10 items-center gap-2 rounded-md bg-[#FF9F43] px-4 text-xs font-semibold text-white shadow-xs transition-opacity hover:opacity-90"
        >
          <Image
            src={ICONS?.CirclePlus || ICONS?.header?.addNew}
            alt=""
            width={15}
            height={15}
            className="brightness-0 invert"
          />
          <span>{content?.addNew || "Add New"}</span>
        </motion.button>

        {/* POS Button */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          type="button"
          className="flex h-10 items-center gap-2 rounded-md bg-secondary px-4 text-xs font-semibold text-white shadow-xs transition-opacity hover:opacity-90"
        >
          <Image
            src={ICONS?.DeviceLaptop || ICONS?.sales?.pos}
            alt=""
            width={15}
            height={15}
            className="brightness-0 invert"
          />
          <span>{content?.pos || "POS"}</span>
        </motion.button>

        {/* Divider */}
        <div className="mx-2 h-6 w-px bg-border-150" />

        {/* Action Icon: Language */}
        <div className="group relative">
          <motion.button
            whileTap={{ scale: 0.95 }}
            type="button"
            aria-label="Select Language"
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-200 transition-colors hover:bg-surface-250"
          >
            <Image
              src={ICONS?.flagImage || ICONS?.header?.flag}
              alt="USA Flag"
              width={20}
              height={20}
              className="rounded-full object-cover"
            />
          </motion.button>
          <span className="pointer-events-none absolute -bottom-8 left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-[10px] font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
            Language
          </span>
        </div>

        {/* Action Icon: Fullscreen */}
        <div className="group relative">
          <motion.button
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={toggleFullscreen}
            aria-label="Toggle Fullscreen"
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-200 transition-colors hover:bg-surface-250"
          >
            <Image
              src={ICONS?.navMaximizeIcon || ICONS?.header?.maximize}
              alt="Maximize"
              width={18}
              height={18}
            />
          </motion.button>
          <span className="pointer-events-none absolute -bottom-8 left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-[10px] font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
            Fullscreen
          </span>
        </div>

        {/* Action Icon: Messages */}
        <div className="group relative">
          <motion.button
            whileTap={{ scale: 0.95 }}
            type="button"
            aria-label="Messages"
            className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-surface-200 transition-colors hover:bg-surface-250"
          >
            <Image
              src={ICONS?.navMailIcon || ICONS?.header?.mail}
              alt="Mail"
              width={18}
              height={18}
            />
            {unreadCount && (
              <span className="absolute -right-1 -top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full border-2 border-white bg-[#FF0000] px-1 text-[9px] font-bold leading-none text-white shadow-xs">
                {unreadCount}
              </span>
            )}
          </motion.button>
          <span className="pointer-events-none absolute -bottom-8 left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-[10px] font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
            Messages
          </span>
        </div>

        {/* Action Icon: Notifications */}
        <div className="group relative">
          <motion.button
            whileTap={{ scale: 0.95 }}
            type="button"
            aria-label="Notifications"
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-200 transition-colors hover:bg-surface-250"
          >
            <Image
              src={ICONS?.BellIcon || ICONS?.header?.notification}
              alt="Notifications"
              width={18}
              height={18}
            />
          </motion.button>
          <span className="pointer-events-none absolute -bottom-8 left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-[10px] font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
            Notifications
          </span>
        </div>

        {/* Action Icon: Settings */}
        <div className="group relative">
          <motion.button
            whileTap={{ scale: 0.95 }}
            type="button"
            aria-label="Settings"
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-200 transition-colors hover:bg-surface-250"
          >
            <Image
              src={ICONS?.navSettingIcon || ICONS?.header?.settings}
              alt="Settings"
              width={18}
              height={18}
            />
          </motion.button>
          <span className="pointer-events-none absolute -bottom-8 left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-[10px] font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
            Settings
          </span>
        </div>

        {/* User Profile */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          type="button"
          aria-label="User profile"
          className="relative ml-1 h-10 w-10 overflow-hidden"
        >
          <Image
            src={ICONS?.avatarImage || ICONS?.header?.avatar}
            alt="User Profile"
            fill
            className="rounded-lg object-cover"
          />
        </motion.button>
      </div>

      <div
        className="relative flex items-center gap-2.5 lg:hidden"
        ref={mobileMenuRef}
      >
        <button
          type="button"
          aria-label="User profile"
          className="relative h-10 w-10 overflow-hidden"
        >
          <Image
            src={ICONS?.avatarImage || ICONS?.header?.avatar}
            alt="User Profile"
            fill
            className="rounded-lg object-cover"
          />
        </button>

        <motion.button
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-border-150 bg-surface-200 text-text-heading shadow-xs hover:bg-surface-250"
          aria-label="Toggle Menu"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </motion.button>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="absolute right-0 top-[calc(100%+12px)] z-50 flex w-[340px] max-w-[calc(100vw-2rem)] flex-col gap-4.5 rounded-xl border border-border-150 bg-white p-5 shadow-2xl"
            >
              {/* Coming Soon Dropdown for Mobile */}
              <div className="relative" ref={comingSoonRef}>
                <button
                  type="button"
                  onClick={() => setIsComingSoonOpen((prev) => !prev)}
                  className="flex h-10 w-full items-center justify-between rounded-lg border border-border-150 bg-white px-3.5 text-xs font-medium text-text-heading"
                >
                  <div className="flex items-center gap-2">
                    <Image
                      src={ICONS?.catImageIcon || ICONS?.header?.car}
                      alt=""
                      width={20}
                      height={14}
                      className="object-contain"
                    />
                    <span>{content?.comingSoon || "Coming Soon"}</span>
                  </div>
                  <Image
                    src={ICONS?.arrowDropdownIcon || ICONS?.chevronDown}
                    alt=""
                    width={10}
                    height={10}
                    className={`opacity-70 transition-transform ${
                      isComingSoonOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isComingSoonOpen && (
                  <div className="mt-2 rounded-lg border border-border-150 bg-[#F7F7F7] p-1.5">
                    {comingSoonItems.map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        className="block rounded-md px-3 py-2 text-xs font-medium text-text-heading transition-colors hover:bg-white"
                        onClick={() => {
                          setIsComingSoonOpen(false);
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Buttons Row */}
              <div className="flex items-center gap-3 mt-4">
                <button
                  type="button"
                  className="flex h-10 flex-1 items-center justify-center gap-2 rounded-md bg-[#FF9F43] text-xs font-semibold text-white shadow-xs"
                >
                  <Image
                    src={ICONS?.CirclePlus || ICONS?.header?.addNew}
                    alt=""
                    width={14}
                    height={14}
                    className="brightness-0 invert"
                  />
                  <span>Add New</span>
                </button>
                <button
                  type="button"
                  className="flex h-10 flex-1 items-center justify-center gap-2 rounded-md bg-secondary text-xs font-semibold text-white shadow-xs"
                >
                  <Image
                    src={ICONS?.DeviceLaptop || ICONS?.sales?.pos}
                    alt=""
                    width={14}
                    height={14}
                    className="brightness-0 invert"
                  />
                  <span>POS</span>
                </button>
              </div>

              <hr className="border-border-150" />

              {/* Action Icons Row */}
              <div className="flex items-center justify-between px-1 mt-3">
                <button
                  type="button"
                  title="Language"
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-200 hover:bg-surface-250"
                >
                  <Image
                    src={ICONS?.flagImage || ICONS?.header?.flag}
                    alt=""
                    width={20}
                    height={20}
                    className="rounded-full"
                  />
                </button>
                <button
                  type="button"
                  title="Fullscreen"
                  onClick={toggleFullscreen}
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-200 hover:bg-surface-250"
                >
                  <Image
                    src={ICONS?.navMaximizeIcon || ICONS?.header?.maximize}
                    alt=""
                    width={18}
                    height={18}
                  />
                </button>
                <button
                  type="button"
                  title="Messages"
                  className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-surface-200 hover:bg-surface-250"
                >
                  <Image
                    src={ICONS?.navMailIcon || ICONS?.header?.mail}
                    alt=""
                    width={18}
                    height={18}
                  />
                  {unreadCount && (
                    <span className="absolute -right-1 -top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[#FF0000] text-[9px] font-bold text-white">
                      {unreadCount}
                    </span>
                  )}
                </button>
                <button
                  type="button"
                  title="Notifications"
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-200 hover:bg-surface-250"
                >
                  <Image
                    src={ICONS?.BellIcon || ICONS?.header?.notification}
                    alt=""
                    width={18}
                    height={18}
                  />
                </button>
                <button
                  type="button"
                  title="Settings"
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-200 hover:bg-surface-250"
                >
                  <Image
                    src={ICONS?.navSettingIcon || ICONS?.header?.settings}
                    alt=""
                    width={18}
                    height={18}
                  />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
