"use client";

import Image from "next/image";
import React from "react";
import { TiHomeOutline } from "react-icons/ti";
import { GoStack } from "react-icons/go";
import { IoShieldOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";

function SideBar() {
  const Menu = [
    {
      id: 1,
      name: "Home",
      icon: <TiHomeOutline />,
      path: "/dashboard",
    },
    {
      id: 1,
      name: "Explore",
      icon: <GoStack />,
      path: "/dashboard/explore",
    },
    {
      id: 1,
      name: "Upgrade",
      icon: <IoShieldOutline />,
      path: "/dashboard/upgrade",
    },
    {
      id: 1,
      name: "Logout",
      icon: <CiLogout />,
      path: "/",
    },
  ];

  const path = usePathname();

  return (
    <div className="fixed h-full md:w-64 p-5 shadow-md">
      <Image src={"/logo.svg"} alt="" width={160} height={100} />
      <hr className="my-5" />
      
        {Menu.map((item, index) => (
          <ul key={index}><Link href={item.path}>
            <div
              
              className={`flex items-center gap-2 p-3 text-gray-500 cursor-pointer hover:bg-gray-100 hover:text-black rounded-lg ${
                item.path == path && "bg-gray-100 text-gray-900"
              }`}
            >
              <div className="text-2xl">{item.icon}</div>
              <h2>{item.name}</h2>
            </div>
          </Link></ul>
        ))}
      
      <div className="absolute bottom-10 w-[80%]">
        <Progress value={33} />
        <h2 className="text-xs text-center my-2">2 Out of 5 Courses created</h2>
        <h2 className=" text-xs text-center text-gray-500 my-2">Upgrade your plan for unlimited course generate</h2>
      </div>
    </div>
  );
}

export default SideBar;
