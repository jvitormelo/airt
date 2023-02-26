import { ActionCard } from "@/components/action-card/ActionCard";
import { Routes } from "@/routes";
import { Group } from "@mantine/core";

const actions = [
  {
    title: "Upload new Art",
    href: Routes.UploadImage,
    color: "yellow",
  },
  {
    title: "View all Arts",
    href: Routes.Arts,
    color: "blue",
  },
];

export const HomeActionsCards = () => {
  return (
    <Group>
      {actions.map((action, index) => (
        <ActionCard {...action} key={index} />
      ))}
    </Group>
  );
};
