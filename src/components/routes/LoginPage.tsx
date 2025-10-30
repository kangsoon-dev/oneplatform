import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '@refinedev/core';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Alert, AlertDescription } from '../ui/alert';
import { AlertCircle } from 'lucide-react';

export function LoginPage() {
  const [email, setEmail] = useState('demo@bwlpg.com');
  const [password, setPassword] = useState('x');
  const { mutate: login, isPending, error } = useLogin();
  const navigate = useNavigate();

  const handleSubmit = (e: any) => {
    e.preventDefault();

    login(
      { email, password },
      {
        onSuccess: () => {
          navigate('/');
        },
      }
    );
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#1e3a5f] to-[#2c5282]">
      <Card className="w-[420px] mx-4">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-6">
            <img
              src="https://www.bwlpg.com/wp-content/uploads/2021/08/bwlpg-brand-2x-320x129.png"
              alt="BW LPG"
              className="h-12 invert"
            />
          </div>
          <CardTitle className="text-2xl text-center">Welcome to ONE Platform</CardTitle>
          <CardDescription className="text-center">
            Sign in to access your unified digital ecosystem
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {(error as any)?.message || 'Invalid credentials. Please try again.'}
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.name@bwlpg.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isPending}
                autoComplete="email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isPending}
                autoComplete="current-password"
              />
            </div>

            <div className="text-sm text-slate-500">
              <p className="mb-2">Demo credentials:</p>
              <p className="font-mono text-xs">Email: demo@bwlpg.com</p>
              <p className="font-mono text-xs">Password: demo123</p>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              className="w-full bg-[#1e3a5f] hover:bg-[#2c5282]"
              disabled={isPending}
            >
              {isPending ? 'Signing in...' : 'Sign In'}
            </Button>

            <p className="text-xs text-center text-slate-500">
              This is a temporary login. Azure AD authentication will be implemented soon.
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
