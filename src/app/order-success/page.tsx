"use client";

import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, useMemo } from 'react';
import { useCanteenState } from '@/context/CanteenContext';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { MenuItem } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const itemId = searchParams.get('itemId');
  const { menuItems } = useCanteenState();
  const [orderedItem, setOrderedItem] = useState<MenuItem | null>(null);

  const token = useMemo(() => {
    // This will only run on the client, after initial hydration
    return Math.floor(1000 + Math.random() * 9000).toString();
  }, []);


  useEffect(() => {
    if (itemId) {
      const item = menuItems.find((i) => i.id === itemId);
      setOrderedItem(item || null);
    }
  }, [itemId, menuItems]);

  if (!orderedItem) {
    return (
      <div className="flex flex-col items-center">
        <Skeleton className="h-12 w-48 mb-4" />
        <Skeleton className="h-8 w-64 mb-8" />
        <Skeleton className="w-full max-w-sm h-64" />
      </div>
    );
  }

  const getImageUrl = (item: MenuItem) => {
    if (item.imageUrl.startsWith('blob:')) {
      return item.imageUrl;
    }
    const placeholder = PlaceHolderImages.find(
      (img) => img.id === item.imageId
    );
    return placeholder ? placeholder.imageUrl : item.imageUrl;
  };
  
  const getImageHint = (item: MenuItem) => {
    const placeholder = PlaceHolderImages.find(img => img.id === item.imageId);
    return placeholder ? placeholder.imageHint : 'food';
  }

  return (
    <div className="text-center">
      <CheckCircle className="mx-auto h-16 w-16 text-accent mb-4" />
      <h1 className="text-4xl font-bold font-headline text-foreground">
        Order Placed Successfully!
      </h1>
      <p className="mt-2 text-lg text-muted-foreground">
        Please show this token to the counter to collect your order.
      </p>

      <div className="my-8">
        <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">
          Your Token
        </p>
        <div className="text-8xl font-bold text-primary tracking-widest my-2 p-4 bg-primary/10 rounded-lg inline-block">
          {token}
        </div>
      </div>

      <Card className="max-w-sm mx-auto text-left">
        <CardHeader>
          <CardTitle>Your Order</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center gap-4">
          <Image
            src={getImageUrl(orderedItem)}
            alt={orderedItem.name}
            width={80}
            height={80}
            className="rounded-lg object-cover"
            data-ai-hint={getImageHint(orderedItem)}
          />
          <div>
            <h3 className="font-bold text-lg">{orderedItem.name}</h3>
            <p className="text-muted-foreground">
              Price: Rs. {orderedItem.price.toFixed(2)}
            </p>
          </div>
        </CardContent>
      </Card>

      <Link href="/dashboard" className="mt-8 inline-block">
        <Button variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Menu
        </Button>
      </Link>
    </div>
  );
}


export default function OrderSuccessPage() {
    return (
      <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
        <Suspense fallback={<Skeleton className="w-full max-w-lg h-96" />}>
           <OrderSuccessContent />
        </Suspense>
      </main>
    )
}
