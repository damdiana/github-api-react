import Button from './Button';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => (
  <Button {...args}>Click Me</Button>
);

export const Text = Template.bind({});
Text.args = {
  variant: 'text',
  color: 'navy',
  type: 'button',
  onClick: () => console.log('Clicked button'),
};

export const Outline = Template.bind({});
Outline.args = {
  variant: 'outline',
  color: 'navy',
  type: 'button',
  onClick: () => console.log('Clicked button'),
};
