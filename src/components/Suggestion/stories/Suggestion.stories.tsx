import * as React from "react";
import { Suggestion } from "../component";
import { ComponentMeta } from "@storybook/react";
import { PromptCommandType } from "../../../types/commands";

export default {
    title: "Components/Suggestion",
    component: Suggestion,
} as ComponentMeta<typeof Suggestion>;

const TITLE = "A title";
const DESCRIPTION = "A description";

const Wrapper = ({ children }: { children: JSX.Element }) => (
    <div className="max-w-md">{children}</div>
);

export const Default = (): JSX.Element => (
    <Wrapper>
        <Suggestion
            title={TITLE}
            description={DESCRIPTION}
            type={PromptCommandType.BOOKMARK}
        />
    </Wrapper>
);

export const WithFocus = (): JSX.Element => (
    <Wrapper>
        <Suggestion
            title={TITLE}
            description={DESCRIPTION}
            hasFocus
            type={PromptCommandType.BOOKMARK}
        />
    </Wrapper>
);

export const WithLongTitle = (): JSX.Element => (
    <Wrapper>
        <Suggestion
            title={
                "With a very very long title, I mean very very very very very very very very very very long"
            }
            description={DESCRIPTION}
            type={PromptCommandType.BOOKMARK}
        />
    </Wrapper>
);

export const WithLongDescription = (): JSX.Element => (
    <Wrapper>
        <Suggestion
            title={TITLE}
            hasFocus
            description="With a very very long description, I mean very very very very very very very very very very long"
            type={PromptCommandType.BOOKMARK}
        />
    </Wrapper>
);
