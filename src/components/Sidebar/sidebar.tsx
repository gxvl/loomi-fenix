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
      className="h-full fixed flex items-center justify-between py-7 flex-col w-32 z-50 rounded-r-4xl bg-grayblue"
      style={{
        boxShadow:
          "0 10px 15px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.4), 10px 0 20px -10px rgba(0, 0, 0, 0.3)"
      }}
    >
      <div className="relative w-10 h-10">
        <Image src={"logo.svg"} fill alt="Loomi Fenix Logo" />
      </div>
      <div className="flex flex-col gap-6">
        {buttons.map((button) => (
          <Button
            variant={pathname === button.path ? "glowingdefault" : "grayblue"}
            className="w-15 h-15 rounded-xl"
            key={button.name}
            onClick={() => router.push(button.path)}
          >
            <Image src={button.icon} width={24} height={24} alt={button.name} />
          </Button>
        ))}
      </div>
      <div className="w-14 h-14 rounded-full flex justify-center items-center bg-accent-blue">
        <p className="font-montserrat text-xl font-bold">AC</p>
      </div>
    </div>
  );
};
