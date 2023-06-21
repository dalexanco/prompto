import * as React from "react";
import { PromptInput } from "../component";
import { ComponentMeta } from "@storybook/react";

export default {
  title: "Components/PromptInput",
  component: PromptInput,
} as ComponentMeta<typeof PromptInput>;

export const Render = (): JSX.Element => <PromptInput />;
