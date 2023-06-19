import * as React from "react";
import { Suggestion } from "../component";
import { ComponentMeta } from "@storybook/react";
import { CommandSuggestionType } from "../../../types/commands";

export default {
    title: "Components/Suggestion",
    component: Suggestion,
} as ComponentMeta<typeof Suggestion>;

const TITLE = "A title";
const DEFAULT_URL = "https://www.example.com/path?query=string";

const Wrapper = ({ children }: { children: JSX.Element | JSX.Element[] }) => (
    <div className="max-w-md bg-white">{children}</div>
);

export const Default = (): JSX.Element => (
    <Wrapper>
        <Suggestion
            suggestion={{
                key: "",
                id: "",
                title: TITLE,
                url: DEFAULT_URL,
                type: CommandSuggestionType.BOOKMARK,
            }}
        />
        <Suggestion
            suggestion={{
                key: "",
                id: "",
                title: TITLE,
                url: DEFAULT_URL,
                type: CommandSuggestionType.FOCUS_TAB,
            }}
        />
        <Suggestion
            suggestion={{
                key: "",
                id: "",
                title: TITLE,
                url: DEFAULT_URL,
                type: CommandSuggestionType.UNKNOWN,
            }}
        />
    </Wrapper>
);

export const WithFocus = (): JSX.Element => (
    <Wrapper>
        <Suggestion
            suggestion={{
                key: "",
                id: "",
                title: "When it does not have focus",
                url: DEFAULT_URL,
                type: CommandSuggestionType.FOCUS_TAB,
            }}
        />
        <Suggestion
            suggestion={{
                key: "",
                id: "",
                title: "When it has focus",
                url: DEFAULT_URL,
                type: CommandSuggestionType.BOOKMARK,
            }}
            hasFocus
        />
    </Wrapper>
);

export const WithLongTitle = (): JSX.Element => (
    <Wrapper>
        <Suggestion
            suggestion={{
                key: "",
                id: "",
                title: "With a very very long title, I mean very very very very very very very very very very long",
                url: DEFAULT_URL,
                type: CommandSuggestionType.BOOKMARK,
            }}
        />
    </Wrapper>
);

export const WithLongDescription = (): JSX.Element => (
    <Wrapper>
        <Suggestion
            suggestion={{
                key: "",
                id: "",
                title: TITLE,
                url: "https://www.example.com/path?query=I%20mean%20very%20very%20very%20very%20very%20very%20very%20very%20very%20very%20long",
                type: CommandSuggestionType.BOOKMARK,
            }}
            hasFocus
        />
    </Wrapper>
);
