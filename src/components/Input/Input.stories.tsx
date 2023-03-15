import InputComponent from './Input'
import { ComponentStory, ComponentMeta } from '@storybook/react'

export default {
  title: 'Input',
  component: InputComponent,
} as ComponentMeta<typeof InputComponent>

const Template: ComponentStory<typeof InputComponent> = (args) => (
  <InputComponent {...args} />
)

export const Input = Template.bind({})
Input.args = {
  name: 'username',
  type: 'search',
  placeholder: 'Insert username...',
}
