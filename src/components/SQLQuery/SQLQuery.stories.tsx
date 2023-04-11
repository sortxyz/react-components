import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import SQLQuery from "./SQLQuery";

export default {
  title: "Components/SQLQuery",
  component: SQLQuery
} as ComponentMeta<typeof SQLQuery>;

// Create a master template for mapping args to render the Button component
const Template: ComponentStory<typeof SQLQuery> = (args) => <SQLQuery {...args} />;

// Reuse that template for creating different stories
export const Primary = Template.bind({});
Primary.args = { query: "select function from ethereum.transaction" };
