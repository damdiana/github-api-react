import InfoCardComponent from './InfoCard';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'InfoCard',
  component: InfoCardComponent,
} as ComponentMeta<typeof InfoCardComponent>;

const Template: ComponentStory<typeof InfoCardComponent> = (args) => (
  <InfoCardComponent {...args} />
);

export const InfoCard = Template.bind({});
InfoCard.args = {
  title: {
    content: 'Style history screen (#34)',
    href: 'https://github.com/damdiana/calculator-practice/pull/35',
  },
  pairs: {
    '🚀 Type': 'Pull Request',
    '📅 Created at': '01/04/2023, 19:28',
    '🛠️ State': 'closed',
    '👨🏻‍💻 Assignee': 'dianadam',
    '🕥 Last updated': '01/04/2023, 20:32',
    '✅ Closed at': '01/04/2023, 20:32',
  },
};
