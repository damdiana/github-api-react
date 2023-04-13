import SkeletonScreenComponent from './SkeletonScreen';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'SkeletonScreen',
  component: SkeletonScreenComponent,
} as ComponentMeta<typeof SkeletonScreenComponent>;

const Template: ComponentStory<typeof SkeletonScreenComponent> = () => (
  <SkeletonScreenComponent />
);

export const SkeletonScreen = Template.bind({});
SkeletonScreen.args = {};
