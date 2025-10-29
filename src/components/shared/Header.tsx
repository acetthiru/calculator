import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/shared/Logo';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link
            href="/dashboard"
            className="mr-6 flex items-center space-x-2"
          >
            <Logo />
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Link href="/">
            <Button variant="ghost">Logout</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
