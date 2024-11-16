import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Header() {
  return (
    <div className="flex justify-between p-5 shadow-sm">
      <Image src={"/favicon.svg"} width={30} height={30} alt="" />
      <div className="flex gap-2">
        <Link href={"/dashboard"}>
          <Button variant="outline">Dashboard</Button>
        </Link>
        <UserButton />
      </div>
    </div>
  );
}

export default Header;
