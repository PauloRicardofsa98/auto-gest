import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";

import { Button } from "./_components/ui/button";

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <div className="grid h-screen grid-cols-1 gap-4 bg-black lg:grid-cols-[2fr,1fr]">
      <div className="polygon hidden h-full w-full lg:flex">
        <Image src="/opala.png" alt="Formotech" className="object-cover" fill />
      </div>
      <div className="relative flex items-center justify-center bg-[url(/opala.png)] bg-center p-8 sm:bg-none lg:justify-start">
        <div className="absolute inset-0 bg-black/70 lg:hidden"></div>
        <div className="z-10 space-y-6 text-center text-white">
          <div>
            <h2 className="text-3xl">Bem vindo a</h2>
            <h2 className="text-bold text-6xl">FormoTech</h2>
          </div>
          <SignInButton mode="modal">
            <Button className="w-full text-xl font-semibold">Acessar</Button>
          </SignInButton>
        </div>
      </div>
    </div>
  );
}
