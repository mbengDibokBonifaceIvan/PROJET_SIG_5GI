"use client";

import React, { useRef } from "react";
import Image from "next/image";


export default function Footer() {

  return (
      <footer className="py-4 flex justify-center pb-8">
        <p className="footer-text text-sm flex items-center gap-1">
          CopyRight
          <Image src={"/logo-white.svg"} alt="logo" width={20} height={20} />
          <a href="#" target="_blank" className=" text-green-300 font-bold">
            WebGenius 2025
          </a>
        </p>
      </footer>
  );
}
