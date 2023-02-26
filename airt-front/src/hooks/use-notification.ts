import { showNotification } from "@mantine/notifications";

interface openNotificationParams {
  message: string;
  title?: string;
  type?: "success" | "error" | "warning" | "info";
}

export const useNotification = () => {
  const openNotification = ({
    message,
    title,
    type,
  }: openNotificationParams) => {
    showNotification({
      message,
      title,
      bg: "dark.7",
      styles: (theme) => ({
        title: { color: type === "error" ? "red " : "gold" },

        description: { color: theme.white },
        root: {
          paddingBlock: theme.spacing.md,
          "&::before": {
            backgroundColor:
              type === "error" ? theme.colors.red : theme.primaryColor,
          },
        },
      }),
    });
  };

  return {
    openNotification,
  };
};
