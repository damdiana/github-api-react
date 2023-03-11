import Button from './Button'
import { ComponentStory, ComponentMeta } from '@storybook/react'

export default {
  title: 'Button',
  component: Button,
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = (args) => (
  <Button {...args}>Click Me</Button>
)

export const Full = Template.bind({})
Full.args = {
  variant: 'full',
}

export const Outline = Template.bind({})
Outline.args = {
  variant: 'outline',
}
