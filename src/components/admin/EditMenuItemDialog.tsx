"use client";

import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useCanteenDispatch } from '@/context/CanteenContext';
import type { MenuItem } from '@/lib/types';
import Image from 'next/image';

interface EditMenuItemDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  menuItem: MenuItem | null;
}

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  price: z.coerce.number().min(0, { message: 'Price cannot be negative.' }),
  availabilityCount: z.coerce
    .number()
    .int()
    .min(0, { message: 'Count cannot be negative.' }),
  category: z.enum(['Meals', 'Snacks', 'Beverages']),
  imageUrl: z.string().min(1, { message: 'Please select an image.' }),
  isAvailable: z.boolean(),
});

export function EditMenuItemDialog({
  isOpen,
  setIsOpen,
  menuItem,
}: EditMenuItemDialogProps) {
  const dispatch = useCanteenDispatch();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      price: 0,
      availabilityCount: 0,
      category: 'Meals',
      imageUrl: '',
      isAvailable: true,
    },
  });

  useEffect(() => {
    if (menuItem) {
      form.reset({
        ...menuItem,
        imageUrl: menuItem.imageUrl || '',
      });
      setImagePreview(menuItem.imageUrl || null);
    } else {
      form.reset({
        name: '',
        price: 0,
        availabilityCount: 0,
        category: 'Meals',
        imageUrl: '',
        isAvailable: true,
      });
      setImagePreview(null);
    }
  }, [menuItem, form, isOpen]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
      form.setValue('imageUrl', url, { shouldValidate: true });
    }
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const payload = { ...values, imageId: '' }; // Keep imageId for type compatibility
    if (menuItem) {
      dispatch({ type: 'UPDATE_ITEM', payload: { ...menuItem, ...payload } });
    } else {
      dispatch({ type: 'ADD_ITEM', payload: payload });
    }
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-headline">
            {menuItem ? 'Edit Menu Item' : 'Add New Menu Item'}
          </DialogTitle>
          <DialogDescription>
            {menuItem
              ? 'Update the details of your menu item.'
              : 'Fill in the details for the new menu item.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" {...form.register('name')} className="col-span-3" />
          </div>
          {form.formState.errors.name && (
            <p className="text-sm text-destructive col-start-2 col-span-3">
              {form.formState.errors.name.message}
            </p>
          )}

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Price (Rs.)
            </Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              {...form.register('price')}
              className="col-span-3"
            />
          </div>
          {form.formState.errors.price && (
            <p className="text-sm text-destructive col-start-2 col-span-3">
              {form.formState.errors.price.message}
            </p>
          )}

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="availabilityCount" className="text-right">
              Count
            </Label>
            <Input
              id="availabilityCount"
              type="number"
              {...form.register('availabilityCount')}
              className="col-span-3"
            />
          </div>
          {form.formState.errors.availabilityCount && (
            <p className="text-sm text-destructive col-start-2 col-span-3">
              {form.formState.errors.availabilityCount.message}
            </p>
          )}

          <Controller
            control={form.control}
            name="category"
            render={({ field }) => (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Category</Label>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Meals">Meals</SelectItem>
                    <SelectItem value="Snacks">Snacks</SelectItem>
                    <SelectItem value="Beverages">Beverages</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          />
          
          <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image" className="text-right">
                Image
              </Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="col-span-3"
              />
            </div>
            {imagePreview && (
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="col-start-2 col-span-3">
                  <Image
                    src={imagePreview}
                    alt="Image Preview"
                    width={80}
                    height={80}
                    className="rounded-md object-cover"
                  />
                </div>
              </div>
            )}
            {form.formState.errors.imageUrl && (
              <p className="text-sm text-destructive col-start-2 col-span-3">
                {form.formState.errors.imageUrl.message}
              </p>
            )}

          <Controller
            control={form.control}
            name="isAvailable"
            render={({ field }) => (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="isAvailable" className="text-right">
                  Available
                </Label>
                <Switch
                  id="isAvailable"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </div>
            )}
          />

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {menuItem ? 'Save Changes' : 'Create Item'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
