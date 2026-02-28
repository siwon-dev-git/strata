import { useState } from 'react';

import {
  Button,
  Text,
  Heading,
  Badge,
  Divider,
  Spinner,
  Input,
  InputGroup,
  Code,
  Switch,
  Slider,
  ProgressBar,
  Checkbox,
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  FormField,
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
  RadioGroupRoot,
  RadioGroupItem,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  ScrollAreaRoot,
  ScrollAreaViewport,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  Toggle,
  Label,
  Textarea,
  Avatar,
  AvatarGroup,
  PaginationRoot,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  ToolbarRoot,
  ToolbarButton,
  ToolbarSeparator,
  Kbd,
  StatusDot,
  DataListRoot,
  DataListItem,
  DataListLabel,
  DataListValue,
  ToggleGroupRoot,
  ToggleGroupItem,
  Truncate,
  VisuallyHidden,
  IconSearch,
  IconSettings,
  IconStar,
} from '@/components/primitives';

import {
  AccordionRoot,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  DialogRoot,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DropdownMenuRoot,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  PopoverRoot,
  PopoverTrigger,
  PopoverContent,
  SheetRoot,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetDescription,
  TabsRoot,
  TabsList,
  TabsTrigger,
  TabsContent,
  AlertDialogRoot,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
  ContextMenuRoot,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  HoverCardRoot,
  HoverCardTrigger,
  HoverCardContent,
  MenubarRoot,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  NavigationMenuRoot,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  TooltipProvider,
  SimpleTooltip,
} from '@/components/disclosure';

import {
  Alert,
  Callout,
  EmptyState,
  Skeleton,
  ToastProvider,
  ToastRoot,
  ToastTitle,
  ToastDescription,
  ToastViewport,
} from '@/components/feedback';

import { Container, Stack, TopBar } from '@/components/layout';

/* ── Section wrapper ────────────────────────────────────────── */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-8">
      <Heading level={3} className="mb-3">
        {title}
      </Heading>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

/* ── Component ──────────────────────────────────────────────── */

export function ShowcaseDemo() {
  const [switchOn, setSwitchOn] = useState(false);
  const [sliderVal, setSliderVal] = useState([50]);
  const [checked, setChecked] = useState(false);
  const [radio, setRadio] = useState('a');
  const [toggleOn, setToggleOn] = useState(false);

  return (
    <TooltipProvider>
      <div className="h-full overflow-y-auto bg-surface-base">
        <TopBar>
          <Text weight="semibold">Strata Showcase</Text>
          <div className="flex-1" />
          <Badge variant="interactive">v0.1.0</Badge>
        </TopBar>
        <Container className="max-w-4xl py-8">
          <Stack gap={2}>
            <Heading level={1}>Component Showcase</Heading>
            <Text className="text-fg-muted mb-4">
              Demonstrating all Strata components in a single reference page.
            </Text>
          </Stack>

          {/* ── Feedback ────────────────────────────────── */}
          <Section title="Feedback">
            <Alert variant="info" title="Info alert">
              This is an informational alert message.
            </Alert>
            <Alert variant="danger" title="Error alert">
              Something went wrong. Please try again.
            </Alert>
            <Callout variant="warning">This action cannot be undone.</Callout>
            <div className="flex gap-4">
              <Skeleton width={120} height={20} />
              <Skeleton width={80} height={20} />
              <Skeleton width={200} height={20} />
            </div>
            <EmptyState
              title="No results"
              description="Try adjusting your search criteria."
            />
            <ToastProvider>
              <ToastRoot open>
                <ToastTitle>Changes saved</ToastTitle>
                <ToastDescription>
                  Your settings have been updated.
                </ToastDescription>
              </ToastRoot>
              <ToastViewport />
            </ToastProvider>
          </Section>

          <Divider className="my-6" />

          {/* ── Form Controls ───────────────────────────── */}
          <Section title="Form Controls">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                label="Username"
                description="Choose a unique username."
              >
                {({ inputId, describedBy }) => (
                  <Input
                    id={inputId}
                    aria-describedby={describedBy}
                    placeholder="Enter username"
                  />
                )}
              </FormField>
              <FormField label="Bio" description="Brief description.">
                {({ inputId, describedBy }) => (
                  <Textarea
                    id={inputId}
                    aria-describedby={describedBy}
                    placeholder="Tell us about yourself"
                    className="min-h-15"
                  />
                )}
              </FormField>
            </div>

            <InputGroup prefix={<IconSearch size="sm" />}>
              <Input placeholder="Search components..." className="pl-9" />
            </InputGroup>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Label htmlFor="switch-demo">Dark mode</Label>
                <Switch
                  id="switch-demo"
                  checked={switchOn}
                  onCheckedChange={setSwitchOn}
                />
              </div>

              <div className="flex items-center gap-2">
                <Checkbox
                  id="checkbox-demo"
                  checked={checked}
                  onCheckedChange={(v) => setChecked(v === true)}
                />
                <Label htmlFor="checkbox-demo">Accept terms</Label>
              </div>

              <Toggle pressed={toggleOn} onPressedChange={setToggleOn}>
                <IconStar size="sm" />
              </Toggle>

              <ToggleGroupRoot type="single" defaultValue="list">
                <ToggleGroupItem value="list" size="sm">
                  List
                </ToggleGroupItem>
                <ToggleGroupItem value="grid" size="sm">
                  Grid
                </ToggleGroupItem>
              </ToggleGroupRoot>
            </div>

            <div className="max-w-xs">
              <Text size="sm" className="mb-1">
                Volume
              </Text>
              <Slider value={sliderVal} onValueChange={setSliderVal} />
            </div>

            <RadioGroupRoot value={radio} onValueChange={setRadio}>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="a" id="radio-a" />
                  <Label htmlFor="radio-a">Option A</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="b" id="radio-b" />
                  <Label htmlFor="radio-b">Option B</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="c" id="radio-c" />
                  <Label htmlFor="radio-c">Option C</Label>
                </div>
              </div>
            </RadioGroupRoot>

            <SelectRoot>
              <SelectTrigger className="max-w-xs">
                <SelectValue placeholder="Select a framework" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="react">React</SelectItem>
                <SelectItem value="vue">Vue</SelectItem>
                <SelectItem value="svelte">Svelte</SelectItem>
              </SelectContent>
            </SelectRoot>
          </Section>

          <Divider className="my-6" />

          {/* ── Data Display ────────────────────────────── */}
          <Section title="Data Display">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Role</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Alice</TableCell>
                  <TableCell>
                    <StatusDot status="online" /> Active
                  </TableCell>
                  <TableCell>Admin</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Bob</TableCell>
                  <TableCell>
                    <StatusDot status="idle" /> Away
                  </TableCell>
                  <TableCell>Editor</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Charlie</TableCell>
                  <TableCell>
                    <StatusDot status="offline" /> Offline
                  </TableCell>
                  <TableCell>Viewer</TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <DataListRoot>
              <DataListItem>
                <DataListLabel>Version</DataListLabel>
                <DataListValue>
                  <Code>0.1.0</Code>
                </DataListValue>
              </DataListItem>
              <DataListItem>
                <DataListLabel>License</DataListLabel>
                <DataListValue>MIT</DataListValue>
              </DataListItem>
              <DataListItem>
                <DataListLabel>Description</DataListLabel>
                <DataListValue>
                  <Truncate>
                    A comprehensive design system built with React, TypeScript,
                    and Tailwind CSS
                  </Truncate>
                </DataListValue>
              </DataListItem>
            </DataListRoot>

            <div className="flex items-center gap-3">
              <AvatarGroup>
                <Avatar name="Alice" alt="Alice" />
                <Avatar name="Bob" alt="Bob" />
                <Avatar name="Charlie" alt="Charlie" />
              </AvatarGroup>
              <Text size="sm" className="text-fg-muted">
                3 contributors
              </Text>
            </div>

            <div className="flex items-center gap-2">
              <Badge variant="default">Default</Badge>
              <Badge variant="interactive">Interactive</Badge>
              <Badge variant="success">Success</Badge>
              <Spinner size="sm" />
              <Kbd>Ctrl+K</Kbd>
            </div>

            <ProgressBar value={72} />

            <div className="flex items-center gap-2">
              <Button size="sm">
                Save
                <VisuallyHidden> current document</VisuallyHidden>
              </Button>
              <Text size="xs" className="text-fg-muted">
                (VisuallyHidden text for screen readers)
              </Text>
            </div>
          </Section>

          <Divider className="my-6" />

          {/* ── Navigation ──────────────────────────────── */}
          <Section title="Navigation">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Components</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Showcase</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <PaginationRoot>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink isActive>1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink>2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink>3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext />
                </PaginationItem>
              </PaginationContent>
            </PaginationRoot>

            <ToolbarRoot>
              <SimpleTooltip content="Bold">
                <ToolbarButton>B</ToolbarButton>
              </SimpleTooltip>
              <SimpleTooltip content="Italic">
                <ToolbarButton>I</ToolbarButton>
              </SimpleTooltip>
              <ToolbarSeparator />
              <SimpleTooltip content="Settings">
                <ToolbarButton>
                  <IconSettings size="sm" />
                </ToolbarButton>
              </SimpleTooltip>
            </ToolbarRoot>
          </Section>

          <Divider className="my-6" />

          {/* ── Disclosure ──────────────────────────────── */}
          <Section title="Disclosure">
            <AccordionRoot type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>What is Strata?</AccordionTrigger>
                <AccordionContent>
                  Strata is a design system built with React 19, TypeScript 5.9,
                  Tailwind CSS v4.2, and Radix UI headless primitives.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>How are tokens organized?</AccordionTrigger>
                <AccordionContent>
                  Three layers: OKLch primitives → semantic → component.
                  Components only reference Layer 2 semantic tokens.
                </AccordionContent>
              </AccordionItem>
            </AccordionRoot>

            <div className="flex flex-wrap gap-3">
              <DialogRoot>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    Open Dialog
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirm action</DialogTitle>
                  </DialogHeader>
                  <DialogBody>
                    <DialogDescription>
                      Are you sure you want to proceed?
                    </DialogDescription>
                  </DialogBody>
                  <DialogFooter>
                    <Button variant="ghost" size="sm">
                      Cancel
                    </Button>
                    <Button size="sm">Confirm</Button>
                  </DialogFooter>
                </DialogContent>
              </DialogRoot>

              <AlertDialogRoot>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    Alert Dialog
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogTitle>Delete item?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone.
                  </AlertDialogDescription>
                  <div className="flex justify-end gap-2 mt-4">
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Delete</AlertDialogAction>
                  </div>
                </AlertDialogContent>
              </AlertDialogRoot>

              <SheetRoot>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm">
                    Open Sheet
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetTitle>Settings</SheetTitle>
                  <SheetDescription>
                    Configure your preferences.
                  </SheetDescription>
                </SheetContent>
              </SheetRoot>

              <DropdownMenuRoot>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    Menu
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Sign out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenuRoot>

              <PopoverRoot>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm">
                    Popover
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Text size="sm">Popover content goes here.</Text>
                </PopoverContent>
              </PopoverRoot>
            </div>

            <HoverCardRoot>
              <HoverCardTrigger asChild>
                <Text
                  size="sm"
                  className="text-fg-link underline cursor-pointer inline-block"
                >
                  Hover for details
                </Text>
              </HoverCardTrigger>
              <HoverCardContent>
                <div className="space-y-1">
                  <Text size="sm" weight="semibold">
                    @strata-ds
                  </Text>
                  <Text size="xs" className="text-fg-muted">
                    A design system built with React 19 and Radix UI.
                  </Text>
                </div>
              </HoverCardContent>
            </HoverCardRoot>

            <ContextMenuRoot>
              <ContextMenuTrigger asChild>
                <div className="border border-dashed border-border-subtle rounded-md p-4 text-center">
                  <Text size="sm" className="text-fg-muted">
                    Right-click for context menu
                  </Text>
                </div>
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem>Copy</ContextMenuItem>
                <ContextMenuItem>Paste</ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem>Delete</ContextMenuItem>
              </ContextMenuContent>
            </ContextMenuRoot>

            <MenubarRoot>
              <MenubarMenu>
                <MenubarTrigger>File</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem shortcut="⌘N">New</MenubarItem>
                  <MenubarItem shortcut="⌘O">Open</MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem shortcut="⌘S">Save</MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger>Edit</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem shortcut="⌘Z">Undo</MenubarItem>
                  <MenubarItem shortcut="⌘Y">Redo</MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </MenubarRoot>

            <NavigationMenuRoot>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink>Home</NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Products</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="p-4 w-48">
                      <Text size="sm">Product navigation content</Text>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink>About</NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenuRoot>

            <TabsRoot defaultValue="tab1">
              <TabsList>
                <TabsTrigger value="tab1">Overview</TabsTrigger>
                <TabsTrigger value="tab2">Details</TabsTrigger>
                <TabsTrigger value="tab3">Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="tab1">
                <Text size="sm" className="mt-2">
                  Overview content with a ScrollArea demo below.
                </Text>
                <ScrollAreaRoot className="h-24 mt-2 rounded border border-border-subtle">
                  <ScrollAreaViewport className="p-2">
                    {Array.from({ length: 20 }, (_, i) => (
                      <Text key={i} size="xs" className="text-fg-muted">
                        Scrollable item {i + 1}
                      </Text>
                    ))}
                  </ScrollAreaViewport>
                  <ScrollAreaScrollbar>
                    <ScrollAreaThumb />
                  </ScrollAreaScrollbar>
                </ScrollAreaRoot>
              </TabsContent>
              <TabsContent value="tab2">
                <Text size="sm" className="mt-2">
                  Details tab content.
                </Text>
              </TabsContent>
              <TabsContent value="tab3">
                <Text size="sm" className="mt-2">
                  Settings tab content.
                </Text>
              </TabsContent>
            </TabsRoot>
          </Section>
        </Container>
      </div>
    </TooltipProvider>
  );
}
