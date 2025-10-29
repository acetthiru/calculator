export interface MenuItem {
  id: string;
  name: string;
  price: number;
  availabilityCount: number;
  isAvailable: boolean;
  category: 'Snacks' | 'Meals' | 'Beverages';
  imageId: string;
  imageUrl: string;
}
