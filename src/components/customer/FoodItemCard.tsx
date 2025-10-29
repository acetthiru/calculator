"use client";

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import type { MenuItem } from '@/lib/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useCanteenDispatch } from '@/context/CanteenContext';
import { useToast } from '@/hooks/use-toast';
import { ArrowRight } from 'lucide-react';

interface FoodItemCardProps {
  item: MenuItem;
}

export function FoodItemCard({ item }: FoodItemCardProps) {
  const router = useRouter();
  const dispatch = useCanteenDispatch();
  const { toast } = useToast();
  
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

  const handleOrder = () => {
    dispatch({ type: 'ORDER_ITEM', payload: { id: item.id } });
    toast({
      title: 'Item Added!',
      description: `${item.name} has been booked. Your token is being generated.`,
    });
    router.push(`/order-success?itemId=${item.id}`);
  };

  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="p-0">
        <div className="aspect-video relative">
          <Image
            src={getImageUrl(item)}
            alt={item.name}
            fill
            className="object-cover"
            data-ai-hint={getImageHint(item)}
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <div className="flex justify-between items-start">
          <CardTitle className="font-headline text-xl mb-1">
            {item.name}
          </CardTitle>
          <Badge style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }}>
            {item.availabilityCount} left
          </Badge>
        </div>
        <CardDescription className="text-lg font-semibold text-primary">
          Rs. {item.price.toFixed(2)}
        </CardDescription>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full" onClick={handleOrder}>
          Order Now <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
