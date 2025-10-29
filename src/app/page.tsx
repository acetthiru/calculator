import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowRight, ShieldCheck, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { Logo } from '@/components/shared/Logo';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-background">
      <div className="text-center max-w-2xl mx-auto">
        <Logo className="justify-center mb-6" size="lg" />
        <h1 className="text-4xl md:text-6xl font-headline font-bold text-foreground">
          Achariya College Canteen
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Your one-stop solution for seamless canteen operations and happy
          customers.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
        <Card className="hover:shadow-xl transition-shadow duration-300 hover:border-primary/50">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <ShoppingCart className="h-8 w-8 text-primary" />
              </div>
              <div>
                <CardTitle className="font-headline text-2xl">
                  Customer Portal
                </CardTitle>
                <CardDescription>
                  View menu, place orders, and get your token.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Link href="/login">
              <Button className="w-full" size="lg">
                Order Now <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition-shadow duration-300 hover:border-primary/50">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <ShieldCheck className="h-8 w-8 text-primary" />
              </div>
              <div>
                <CardTitle className="font-headline text-2xl">
                  Admin Portal
                </CardTitle>
                <CardDescription>
                  Manage menu, track availability, and verify tokens.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Link href="/admin/login">
              <Button className="w-full" variant="secondary" size="lg">
                Manage Canteen <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
