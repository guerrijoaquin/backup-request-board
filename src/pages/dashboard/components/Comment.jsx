/* eslint-disable react/prop-types */
import { createStyles, Text, Avatar, Group, rem, Paper } from "@mantine/core";
import { DateTime } from "luxon";

const useStyles = createStyles((theme) => ({
  body: {
    paddingLeft: rem(54),
    paddingTop: theme.spacing.sm,
  },
}));

export function Comment({ createdAt, description, user }) {
  const { classes } = useStyles();
  return (
    <Paper p="md">
      <Group>
        <Avatar radius="xl" color="indigo">
          {user?.charAt(0)?.toUpperCase()}
        </Avatar>
        <div>
          <Text size="sm">{user}</Text>
          <Text size="xs" color="dimmed">
            {DateTime.fromISO(createdAt).toRelative()}
          </Text>
        </div>
      </Group>
      <Text className={classes.body} size="sm">
        {description}
      </Text>
    </Paper>
  );
}
