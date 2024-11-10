import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

function Header() {
  return (
    <div className="flex justify-between p-5 shadow-sm">
      <Image src={"/favicon.svg"} width={30} height={50} />
      <UserButton />
    </div>
  );
}

export default Header;