import * as React from "react";
import { PromptInput } from "../component";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { within, userEvent } from "@storybook/testing-library";
import { action } from "@storybook/addon-actions";

// // // //

export default {
    title: "Components/PromptInput",
    component: PromptInput,
    args: {},
} as ComponentMeta<typeof PromptInput>;

const Template: ComponentStory<typeof PromptInput> = (args) => (
    <PromptInput {...args} />
);

// // // //

export const Render = Template.bind({});

export const ScrollTop = Template.bind({});
ScrollTop.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByTestId("scroll-to-top"));
};

export const ScrollBottom = Template.bind({});
ScrollBottom.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByTestId("scroll-to-bottom"));
};
