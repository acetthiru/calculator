"use client";

import { useCanteenState } from '@/context/CanteenContext';
import { FoodItemCard } from '@/components/customer/FoodItemCard';
import { UtensilsCrossed } from 'lucide-react';

export default function DashboardPage() {
  const { menuItems } = useCanteenState();
  const availableItems = menuItems.filter((item) => item.isAvailable && item.availabilityCount > 0);

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold font-headline tracking-tight">
          Today&apos;s Menu
        </h1>
        <p className="text-muted-foreground">
          Freshly prepared and ready to be served. Order now!
        </p>
      </div>

      {availableItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {availableItems.map((item) => (
            <FoodItemCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center py-20 rounded-lg border-2 border-dashed">
            <UtensilsCrossed className="h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-bold font-headline">The kitchen is taking a break!</h2>
            <p className="text-muted-foreground mt-2">No items are available at the moment. Please check back later.</p>
        </div>
      )}
    </div>
  );
}
