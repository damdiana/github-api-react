import RepoCardComponent from './RepoCard';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'RepoCard',
  component: RepoCardComponent,
} as ComponentMeta<typeof RepoCardComponent>;

const Template: ComponentStory<typeof RepoCardComponent> = (args) => (
  <RepoCardComponent {...args} />
);

export const RepoCard = Template.bind({});
RepoCard.args = {
  repo: {
    private: false,
    html_url: 'https://github.com/damdiana/github-api',
    name: 'github-api',
    language: 'JavaScript',
    owner: {
      login: 'damdiana',
    },
    stargazers_count: 3,
    forks_count: 4,
  },
};
