"use client";

import Image from 'next/image';
import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Edit,
  MoreVertical,
  PlusCircle,
  Trash2,
  AlertCircle,
  Plus,
  Minus,
  Package,
  Truck,
} from 'lucide-react';
import { useCanteenState, useCanteenDispatch } from '@/context/CanteenContext';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { MenuItem } from '@/lib/types';
import { EditMenuItemDialog } from '@/components/admin/EditMenuItemDialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminDashboardPage() {
  const { menuItems } = useCanteenState();
  const dispatch = useCanteenDispatch();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  // Placeholder data for order stats
  const totalOrders = 25;
  const pendingOrders = 8;

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item);
    setIsDialogOpen(true);
  };

  const handleAddNew = () => {
    setEditingItem(null);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    dispatch({ type: 'DELETE_ITEM', payload: { id } });
  };

  const handleToggleAvailability = (id: string, isAvailable: boolean) => {
    const itemToUpdate = menuItems.find((item) => item.id === id);
    if (itemToUpdate) {
      dispatch({
        type: 'UPDATE_ITEM',
        payload: { ...itemToUpdate, isAvailable: !isAvailable },
      });
    }
  };

  const handleAdjustCount = (item: MenuItem, amount: number) => {
    const newCount = Math.max(0, item.availabilityCount + amount);
    dispatch({
      type: 'UPDATE_ITEM',
      payload: { ...item, availabilityCount: newCount },
    });
  };

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
    <div className="space-y-8">
      <div>
          <h2 className="text-3xl font-headline font-bold">Dashboard Overview</h2>
          <p className="text-muted-foreground">A quick look at your canteen's performance.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
          <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Orders Booked</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                  <div className="text-2xl font-bold">{totalOrders}</div>
                  <p className="text-xs text-muted-foreground">Total orders received today</p>
              </CardContent>
          </Card>
          <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Orders to be Delivered</CardTitle>
                  <Truck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                  <div className="text-2xl font-bold">{pendingOrders}</div>
                  <p className="text-xs text-muted-foreground">Orders pending verification and delivery</p>
              </CardContent>
          </Card>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-headline font-bold">Menu Management</h2>
            <p className="text-muted-foreground">
              Add, edit, and manage your canteen's menu items.
            </p>
          </div>
          <Button onClick={handleAddNew}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Item
          </Button>
        </div>

        <div className="rounded-lg border shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Count</TableHead>
                <TableHead>Available</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {menuItems.length > 0 ? (
                menuItems.map((item) => {
                  return (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Image
                          src={getImageUrl(item)}
                          alt={item.name}
                          width={48}
                          height={48}
                          className="rounded-md object-cover"
                          data-ai-hint={getImageHint(item)}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{item.category}</Badge>
                      </TableCell>
                      <TableCell>Rs. {item.price.toFixed(2)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => handleAdjustCount(item, -1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span>{item.availabilityCount}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => handleAdjustCount(item, 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Switch
                          checked={item.isAvailable}
                          onCheckedChange={() =>
                            handleToggleAvailability(item.id, item.isAvailable)
                          }
                          aria-label={`Toggle availability for ${item.name}`}
                        />
                      </TableCell>
                      <TableCell className="text-right">
                        <AlertDialog>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleEdit(item)}>
                                <Edit className="mr-2 h-4 w-4" /> Edit
                              </DropdownMenuItem>
                              <AlertDialogTrigger asChild>
                                <DropdownMenuItem className="text-destructive focus:text-destructive">
                                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                                </DropdownMenuItem>
                              </AlertDialogTrigger>
                            </DropdownMenuContent>
                          </DropdownMenu>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will
                                permanently delete the menu item &quot;{item.name}&quot;.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(item.id)}
                                className="bg-destructive hover:bg-destructive/90"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <AlertCircle className="h-8 w-8 text-muted-foreground" />
                      <p className="text-muted-foreground">No menu items yet.</p>
                      <Button variant="outline" size="sm" onClick={handleAddNew}>
                        Add your first item
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <EditMenuItemDialog
          isOpen={isDialogOpen}
          setIsOpen={setIsDialogOpen}
          menuItem={editingItem}
        />
      </div>
    </div>
  );
}
