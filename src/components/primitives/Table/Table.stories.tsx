import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from './Table';

const meta = {
  title: 'Primitives/Table',
  component: Table,
  tags: ['autodocs'],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

const people = [
  { name: 'Alice Park', role: 'Designer', status: 'Active' },
  { name: 'Bob Kim', role: 'Engineer', status: 'Active' },
  { name: 'Carol Lee', role: 'PM', status: 'Away' },
  { name: 'David Choi', role: 'Engineer', status: 'Active' },
  { name: 'Eve Yoon', role: 'Designer', status: 'Offline' },
];

export const Default: Story = {
  render: () => (
    <Table>
      <TableCaption>A list of team members</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {people.map((person) => (
          <TableRow key={person.name}>
            <TableCell className="font-medium">{person.name}</TableCell>
            <TableCell>{person.role}</TableCell>
            <TableCell>{person.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {people.map((person) => (
          <TableRow key={person.name}>
            <TableCell className="font-medium">{person.name}</TableCell>
            <TableCell>{person.role}</TableCell>
            <TableCell>{person.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>Total members</TableCell>
          <TableCell>{people.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
};
