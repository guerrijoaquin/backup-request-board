/* eslint-disable react/prop-types */
import { createStyles, Card, Avatar, Text, Group, Button } from "@mantine/core";
import { DateTime } from "luxon";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  title: {
    fontWeight: 500,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1.2,
  },

  body: {
    padding: theme.spacing.md,
  },
}));

export function CardArticle({ lane, description, dateString, user }) {
  console.log('DATE STRING', dateString)
  const { classes } = useStyles();
  return (
    <Card withBorder radius="md" p={0} className={classes.card}>
      <Group noWrap spacing={0}>
        <div className={classes.body}>
          <Text transform="uppercase" color="dimmed" weight={700} size="xs">
            {lane.title}
          </Text>
          <Text className={classes.title} mt="xs" mb="md">
            {description}
          </Text>
          <Group noWrap spacing="xs">
            <Group spacing="xs" noWrap>
              <Avatar color="indigo" size={20}>
                {user.username.charAt(0).toUpperCase()}
              </Avatar>
              <Text size="xs">{user.username}</Text>
            </Group>
            <Text size="xs" color="dimmed">
              •
            </Text>
            <Text size="xs" color="dimmed">
              {dateString}
            </Text>
          </Group>
        </div>
      </Group>
    </Card>
  );
}
