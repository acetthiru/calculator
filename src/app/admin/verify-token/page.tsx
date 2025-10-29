"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, TicketCheck } from 'lucide-react';

export default function VerifyTokenPage() {
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || token.length !== 4) {
      toast({
        title: 'Invalid Input',
        description: 'Please enter a valid 4-digit token.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    // Simulate API call for token verification
    setTimeout(() => {
      setIsLoading(false);
      // Hardcoded logic for demo purposes
      if (token === '1234' || token === '4321') {
        toast({
          title: 'Token Verified!',
          description: `Token "${token}" is valid. Order delivered.`,
          className: 'bg-accent text-accent-foreground',
        });
        setToken('');
      } else {
        toast({
          title: 'Invalid Token',
          description: `Token "${token}" was not found.`,
          variant: 'destructive',
        });
      }
    }, 1000);
  };

  return (
    <div className="flex justify-center items-start pt-10">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl font-headline">
            <TicketCheck className="h-6 w-6 text-primary" />
            Verify Customer Token
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="token">4-Digit Token</Label>
              <Input
                id="token"
                value={token}
                onChange={(e) => setToken(e.target.value.replace(/[^0-9]/g, ''))}
                placeholder="e.g., 1234"
                maxLength={4}
                required
                className="text-center text-2xl font-bold tracking-[1em] h-16"
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                'Verify & Deliver'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
