import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import PushNotifications from "./PushNotifications";

export default {
  title: "Components/PushNotifications",
  component: PushNotifications
} as ComponentMeta<typeof PushNotifications>;

// Create a master template for mapping args to render the Button component
const Template: ComponentStory<typeof PushNotifications> = (args) => <PushNotifications {...args} />;

// Reuse that template for creating different stories
export const Primary = Template.bind({});
Primary.args = { contract_address: "0xdac17f958d2ee523a2206206994597c13d831ec7" };
