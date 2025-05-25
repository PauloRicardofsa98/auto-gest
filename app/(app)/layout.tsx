import { UserButton } from "@clerk/nextjs";

import AppSidebar from "../_components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "../_components/ui/sidebar";

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <SidebarProvider className="overflow-hidden">
      <AppSidebar className="bg-black text-white" />
      <SidebarInset>
        <header className="sticky top-0 flex h-16 shrink-0 items-center justify-between gap-2 border-b bg-background px-4">
          <SidebarTrigger className="-ml-1" />

          <UserButton showName />
        </header>
        <div className="flex flex-1 flex-col gap-4 bg-slate-200 p-4">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default RootLayout;
