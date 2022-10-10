import React from "react"
import RoundedButton from "./RoundedButton"
import { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
    title: 'inputs/RoundedButton',
    component: RoundedButton
} as ComponentMeta<typeof RoundedButton>;

const Template: ComponentStory<typeof RoundedButton> = (args) => (
    <RoundedButton {...args}>Clique</RoundedButton>
);

export const Default = Template.bind({});

Default.args = {
    variant: 'contained'
}