"use client";

import React, { useRef } from "react";
import Footer from "../Components/Footer/footer";
import Navbar from "../Components/Navbar";

export default function Home() {

  return (
    <main className="mx-[1rem] lg:mx-[2rem] xl:mx-[6rem] 2xl:mx-[8rem] m-auto">
      <Navbar />

      <Footer />
    </main>
  );
}
