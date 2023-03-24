import TabComponent from './Tab';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useState } from 'react';

export default {
  title: 'Tab',
  component: TabComponent,
} as ComponentMeta<typeof TabComponent>;

const Template: ComponentStory<typeof TabComponent> = (args) => {
  const [selectedTabId, setSelectedTabId] = useState(args.selectedTabId);

  const onSelected = (tabId: string) => {
    setSelectedTabId(tabId);
  };

  return (
    <TabComponent
      {...args}
      selectedTabId={selectedTabId}
      onSelected={onSelected}
    />
  );
};

export const Tab = Template.bind({});
Tab.args = {
  selectedTabId: 'issues',
  tabs: [
    {
      id: 'issues',
      label: 'Issues',
    },
    {
      id: 'commits',
      label: 'Commits',
    },
  ],
};
