"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/shared/Logo';
import { ArrowRight, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth, useFirebase } from '@/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


interface AuthFormProps {
  userType: 'admin' | 'customer';
  formType: 'login' | 'register';
}

export function AuthForm({ userType, formType }: AuthFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState<'student' | 'staff' | ''>('');
  const [year, setYear] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const auth = useAuth();
  const { firestore } = useFirebase();

  const title = `${formType === 'login' ? 'Login' : 'Register'} as ${
    userType === 'admin' ? 'Admin' : 'Customer'
  }`;
  const description =
    formType === 'login'
      ? 'Enter your credentials to access your account.'
      : 'Create a new account to get started.';

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    if (formType === 'register' && password !== confirmPassword) {
      toast({
        title: 'Passwords do not match',
        description: 'Please make sure your passwords match.',
        variant: 'destructive',
      });
      setIsLoading(false);
      return;
    }
    
    if (formType === 'register' && (!name || !role)) {
      toast({
        title: 'Missing Information',
        description: 'Please fill out all required fields.',
        variant: 'destructive',
      });
      setIsLoading(false);
      return;
    }

    // Use mobile number as email for Firebase Auth
    const email = `${mobile}@achariya.app`;

    try {
      let userCredential;
      if (formType === 'login') {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
        toast({
          title: 'Login Successful',
          description: `Welcome back! Redirecting you...`,
        });
      } else {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const collectionName = userType === 'admin' ? 'admins' : 'customers';
        
        const userData: any = {
          id: user.uid,
          mobileNumber: mobile,
          name: name,
          role: role,
        };

        if (role === 'student') {
            userData.year = year;
        }

        await setDoc(doc(firestore, collectionName, user.uid), userData);

        toast({
          title: 'Registration Successful',
          description: `Welcome! Your account has been created.`,
        });
      }
      
      const destination =
        userType === 'admin' ? '/admin/dashboard' : '/dashboard';
      router.push(destination);

    } catch (error: any) {
      console.error('Authentication Error:', error);
      let errorMessage = 'An unexpected error occurred.';
      if (error.code) {
        switch (error.code) {
            case 'auth/invalid-email':
                errorMessage = 'The mobile number format is invalid. Please enter a 10-digit number.';
                break;
            case 'auth/user-not-found':
            case 'auth/wrong-password':
                errorMessage = 'Invalid credentials. Please check your mobile number and password.';
                break;
            case 'auth/email-already-in-use':
                errorMessage = 'An account with this mobile number already exists.';
                break;
            case 'auth/weak-password':
                errorMessage = 'The password is too weak. It should be at least 6 characters long.';
                break;
            default:
                errorMessage = error.message;
        }
      }
      toast({
        title: 'Authentication Failed',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const switchFormLink =
    formType === 'login' ? (
      <p>
        Don&apos;t have an account?{' '}
        <Link
          href={userType === 'admin' ? '/admin/register' : '/register'}
          className="font-medium text-primary hover:underline"
        >
          Register
        </Link>
      </p>
    ) : (
      <p>
        Already have an account?{' '}
        <Link
          href={userType === 'admin' ? '/admin/login' : '/login'}
          className="font-medium text-primary hover:underline"
        >
          Login
        </Link>
      </p>
    );

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="mb-6 flex justify-center">
          <Link href="/">
            <Logo size="lg" />
          </Link>
        </div>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-headline">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {formType === 'register' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="Enter your full name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select onValueChange={(value) => setRole(value as any)} value={role} required>
                        <SelectTrigger id="role">
                            <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="student">Student</SelectItem>
                            <SelectItem value="staff">Staff</SelectItem>
                        </SelectContent>
                    </Select>
                  </div>
                  {role === 'student' && (
                    <div className="space-y-2">
                      <Label htmlFor="year">Year</Label>
                      <Input
                        id="year"
                        placeholder="e.g., 1st, 2nd, 3rd, 4th"
                        required={role === 'student'}
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                      />
                    </div>
                  )}
                </>
              )}
              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile Number</Label>
                <Input
                  id="mobile"
                  type="tel"
                  placeholder="Enter your 10-digit mobile number"
                  required
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/[^0-9]/g, ''))}
                  maxLength={10}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {formType === 'register' && (
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="Confirm your password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              )}
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : formType === 'login' ? (
                  'Login'
                ) : (
                  'Register'
                )}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <div className="text-sm text-muted-foreground">
                {switchFormLink}
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
