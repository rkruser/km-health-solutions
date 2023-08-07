import React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import RadioButtonComponent from '../react-components/summary-display';

export default {
  title: 'My App/RadioButtonComponent',
  component: RadioButtonComponent,
} as Meta;

const Template: StoryFn = (args) => <RadioButtonComponent {...args} />;

export const Default = Template.bind({});
