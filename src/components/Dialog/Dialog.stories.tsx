import DialogComponent from './Dialog';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useState } from 'react';

export default {
  title: 'Dialog',
  component: DialogComponent,
} as ComponentMeta<typeof DialogComponent>;

const Template: ComponentStory<typeof DialogComponent> = () => {
  const [open, setOpen] = useState(false);
  const closeDialog = () => {
    setOpen(false);
  };
  const showDialog = () => {
    setOpen(true);
  };

  return (
    <main>
      <h1> Page Content </h1>
      <button onClick={showDialog}> open dialog </button>
      <DialogComponent open={open} onClose={closeDialog}>
        <p> Test </p>
      </DialogComponent>
    </main>
  );
};

export const Dialog = Template.bind({});
