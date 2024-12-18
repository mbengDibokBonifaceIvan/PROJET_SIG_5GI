"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/scrutateur"); // Redirige vers Scrutateur
  }, [router]);

  return <div>Redirecting...</div>;
}
