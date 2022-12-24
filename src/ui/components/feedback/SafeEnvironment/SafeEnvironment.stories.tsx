import { ComponentMeta, ComponentStory } from '@storybook/react';

import SafeEnvironment from './SafeEnvironment';

export default {
  title: 'feedback/SafeEnvironment',
  component: SafeEnvironment,
} as ComponentMeta<typeof SafeEnvironment>;

const Template: ComponentStory<typeof SafeEnvironment> = (args) => <SafeEnvironment {...args} />;

export const Default = Template.bind({});

Default.args = {};
