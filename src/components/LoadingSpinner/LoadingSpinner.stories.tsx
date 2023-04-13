import LoadingSpinnerComponent from './LoadingSpinner';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'LoadingSpinner',
  component: LoadingSpinnerComponent,
} as ComponentMeta<typeof LoadingSpinnerComponent>;

const Template: ComponentStory<typeof LoadingSpinnerComponent> = () => (
  <LoadingSpinnerComponent />
);

export const LoadingSpinner = Template.bind({});
LoadingSpinner.args = {};
