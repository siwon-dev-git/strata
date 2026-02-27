import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  AccordionRoot,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from './Accordion';

const meta = {
  title: 'Disclosure/Accordion',
  component: AccordionRoot,
  tags: ['autodocs'],
} satisfies Meta<typeof AccordionRoot>;

export default meta;
type Story = StoryObj<typeof meta>;

const faqItems = [
  {
    value: 'q1',
    question: 'What is Strata?',
    answer:
      'Strata is a design system built with React, TypeScript, and Tailwind CSS. It provides a set of accessible, composable components.',
  },
  {
    value: 'q2',
    question: 'How do I install it?',
    answer:
      'You can install Strata by adding it as a dependency in your project. Run pnpm add strata to get started.',
  },
  {
    value: 'q3',
    question: 'Is it accessible?',
    answer:
      'Yes! All components are built on top of Radix UI primitives, which provide full WAI-ARIA compliance out of the box.',
  },
  {
    value: 'q4',
    question: 'Can I customize the styling?',
    answer:
      'Absolutely. Strata uses a three-layer token system (primitive, semantic, component) that makes theming straightforward.',
  },
];

export const Single: Story = {
  args: { type: 'single', collapsible: true },
  render: (args) => (
    <AccordionRoot {...args} className="w-full max-w-md">
      {faqItems.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </AccordionRoot>
  ),
};

export const Multiple: Story = {
  args: { type: 'multiple' },
  render: (args) => (
    <AccordionRoot {...args} className="w-full max-w-md">
      {faqItems.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </AccordionRoot>
  ),
};
