import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { LayoutDashboard, LogOut, TicketCheck } from 'lucide-react';
import { Logo } from '@/components/shared/Logo';
import { Button } from '@/components/ui/button';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader>
            <Logo />
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/admin/dashboard">
                    <LayoutDashboard />
                    Menu Management
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/admin/verify-token">
                    <TicketCheck />
                    Verify Token
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenuButton asChild>
              <Link href="/">
                <LogOut />
                Logout
              </Link>
            </SidebarMenuButton>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset className="flex-1">
          <header className="flex h-14 items-center gap-4 border-b bg-background/95 px-6 sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="md:hidden">
              <SidebarTrigger />
            </div>
            <div className="flex-1">
              <h1 className="text-lg font-headline font-semibold">
                Admin Dashboard
              </h1>
            </div>
          </header>
          <main className="p-4 sm:p-6 lg:p-8">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
