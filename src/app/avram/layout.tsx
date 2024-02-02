import React from "react";

import HorizontalDivider from "@/components/atoms/Divider/Horizontal";
import Icon from "@/components/atoms/Icon";

const Avram = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <nav className="flex flex-row gap-2 justify-end items-center px-16 py-5 text-gray_black">
        <div className="flex flex-row gap-2 cursor-pointer">
          <Icon name="helpcircle" color="gray_black" />
          <p className="font-bold text-sm">Tanya Avram</p>
        </div>
        <HorizontalDivider color="text-gray_black" />
        <div className="flex flex-row gap-2 cursor-pointer">
          <Icon name="mail" color="gray_black"/>
          <p className="font-bold text-sm">Subscribe</p>
        </div>
        <HorizontalDivider color="text-gray_black" />
        <div className="flex flex-row gap-2 cursor-pointer">
          <Icon name="search"/>
        </div>
      </nav>
      <nav className="flex justify-center items-center text-black">Navbar</nav>
      <div className="text-black">
        {children}
      </div>
      <footer className="flex justify-center items-center text-black">Footer</footer>
    </div>
  )
}

export default Avram;
