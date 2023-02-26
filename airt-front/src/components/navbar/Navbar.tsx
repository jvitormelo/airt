import { useUser } from "@/hooks/use-user";
import { Routes } from "@/routes";
import {
  Box,
  Burger,
  Button,
  createStyles,
  Divider,
  Drawer,
  Group,
  Header,
  ScrollArea,
} from "@mantine/core";

import { useDisclosure } from "@mantine/hooks";
import Image from "next/image";
import Link from "next/link";
import { AirtLogo } from "../icons/airt-logo/AirtLogo";

const useStyles = createStyles((theme) => ({
  link: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    [theme.fn.smallerThan("sm")]: {
      height: 42,
      display: "flex",
      alignItems: "center",
      width: "100%",
    },

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    }),
  },

  subLink: {
    width: "100%",
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    borderRadius: theme.radius.md,

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
    }),

    "&:active": theme.activeStyles,
  },

  dropdownFooter: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
    margin: -theme.spacing.md,
    marginTop: theme.spacing.sm,
    padding: `${theme.spacing.md}px ${theme.spacing.md * 2}px`,
    paddingBottom: theme.spacing.xl,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  hiddenMobile: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
}));

const navLinks = [
  {
    title: "Home",
    href: Routes.Home,
    requireAuth: false,
  },
  {
    title: "Arts",
    href: Routes.Arts,
    requireAuth: false,
  },
  {
    title: "Favorites",
    href: Routes.Favorites,
    requireAuth: true,
  },
];

export function Navbar() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);

  const { isAuth } = useUser();

  const { classes, theme } = useStyles();

  return (
    <Box pb={24}>
      <Header height={60} px="md">
        <Group position="apart" sx={{ height: "100%" }}>
          <AirtLogo />
          <Group
            sx={{ height: "100%" }}
            spacing={0}
            className={classes.hiddenMobile}
          >
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className={classes.link}>
                {link.title}
              </Link>
            ))}
          </Group>

          <Group className={classes.hiddenMobile}>
            {isAuth ? (
              <ProfilePicture></ProfilePicture>
            ) : (
              <>
                <Link passHref href={Routes.Login}>
                  <Button variant="default">Log in</Button>
                </Link>
                <Button>Sign up</Button>
              </>
            )}
          </Group>

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            className={classes.hiddenDesktop}
          />
        </Group>
      </Header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        className={classes.hiddenDesktop}
        zIndex={1000000}
      >
        <ScrollArea sx={{ height: "calc(100vh - 60px)" }} mx="-md">
          <Divider
            my="sm"
            color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
          />

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeDrawer}
              className={classes.link}
            >
              {link.title}
            </Link>
          ))}

          <Divider
            my="sm"
            color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
          />

          <Group position="center" grow pb="xl" px="md">
            {isAuth ? (
              <>
                <div>
                  <ProfilePicture />
                </div>
              </>
            ) : (
              <>
                <Button variant="default">Log in</Button>
                <Button>Sign up</Button>
              </>
            )}
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}

function ProfilePicture() {
  const { user } = useUser();

  if (!user.picture) return null;

  return (
    <Link passHref href={Routes.Profile}>
      <Image
        src={user.picture}
        width={50}
        height={50}
        style={{
          borderRadius: "50%",
        }}
        alt={user.name}
      />
    </Link>
  );
}
