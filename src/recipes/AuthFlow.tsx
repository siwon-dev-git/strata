'use client';

import { Container } from '@/components/layout/Container/Container';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from '@/components/primitives/Card/Card';
import { Input } from '@/components/primitives/Input/Input';
import { Button } from '@/components/primitives/Button/Button';
import { FormField } from '@/components/primitives/FormField/FormField';
import { Divider } from '@/components/primitives/Divider/Divider';
import { Heading } from '@/components/primitives/Heading/Heading';
import { Text } from '@/components/primitives/Text/Text';
import { Checkbox } from '@/components/primitives/Checkbox/Checkbox';
import { Label } from '@/components/primitives/Label/Label';

/**
 * AuthFlow Recipe
 *
 * Pattern: Centered Card + Form + Social Auth
 * Use case: Login, signup, password reset pages
 */
export function AuthFlow() {
  return (
    <Container className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <Heading level={3}>Welcome back</Heading>
          <Text size="sm" color="muted">
            Sign in to your account
          </Text>
        </CardHeader>
        <CardBody className="space-y-4">
          <FormField label="Email">
            <Input type="email" placeholder="you@example.com" />
          </FormField>
          <FormField label="Password">
            <Input type="password" placeholder="••••••••" />
          </FormField>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember" className="text-sm">
                Remember me
              </Label>
            </div>
            <Button variant="ghost" size="sm">
              Forgot password?
            </Button>
          </div>
          <Button fullWidth>Sign In</Button>
          <div className="relative">
            <Divider />
            <Text
              as="span"
              size="xs"
              color="muted"
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[--card-bg] px-2"
            >
              or continue with
            </Text>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline">Google</Button>
            <Button variant="outline">GitHub</Button>
          </div>
        </CardBody>
        <CardFooter className="justify-center">
          <Text size="sm" color="muted">
            Don&apos;t have an account?{' '}
            <Button variant="ghost" size="sm">
              Sign up
            </Button>
          </Text>
        </CardFooter>
      </Card>
    </Container>
  );
}
