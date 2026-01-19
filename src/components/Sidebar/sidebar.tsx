"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

export const Sidebar = () => {
  const pathname = usePathname();

  const buttons = [
    { name: "dashboard", icon: "dashboard.svg", path: "/dashboard" },
    { name: "tickets", icon: "tickets.svg", path: "/tickets" },
    { name: "chat", icon: "chat.svg", path: "/chat" },
    { name: "account", icon: "user.svg", path: "/account" },
    { name: "simulator", icon: "simulator.svg", path: "/simulator" }
  ];

  const router = useRouter();

  return (
    <div
      className="bg-grayblue fixed z-50 flex h-full w-32 flex-col items-center justify-between rounded-r-4xl py-7"
      style={{
        boxShadow:
          "0 10px 15px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.4), 10px 0 20px -10px rgba(0, 0, 0, 0.3)"
      }}
    >
      <div className="relative h-10 w-10">
        <Image src={"logo.svg"} fill alt="Loomi Fenix Logo" />
      </div>
      <div className="flex flex-col gap-6">
        {buttons.map((button) => (
          <Button
            variant={pathname === button.path ? "glowingdefault" : "grayblue"}
            className="h-15 w-15 rounded-xl"
            key={button.name}
            onClick={() => router.push(button.path)}
          >
            <Image src={button.icon} width={24} height={24} alt={button.name} />
          </Button>
        ))}
      </div>
      <div
        onClick={() => router.push("/account")}
        className="bg-accent-blue animate-all flex h-14 w-14 cursor-pointer items-center justify-center rounded-full duration-300 hover:scale-105"
      >
        <p className="font-montserrat text-xl font-bold">GL</p>
      </div>
    </div>
  );
};
