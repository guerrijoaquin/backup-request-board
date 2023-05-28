/* eslint-disable react/prop-types */
import {
  createStyles,
  Text,
  Avatar,
  Group,
  rem,
  Paper,
  CloseButton,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  body: {
    paddingLeft: rem(54),
    paddingTop: theme.spacing.sm,
  },
}));

export function Comment({
  description,
  user,
  dateString,
  userContextId,
  commentId,
  handleDelete,
}) {
  const { classes } = useStyles();
  return (
    <Paper p="md" sx={{ position: "relative" }}>
      <Group>
        <Avatar radius="xl" color="indigo">
          {user?.charAt(0)?.toUpperCase()}
        </Avatar>
        <div>
          <Text size="sm">{user}</Text>
          <Text size="xs" color="dimmed">
            {dateString}
          </Text>
        </div>
      </Group>
      <Text className={classes.body} size="sm">
        {description}
      </Text>
      {user === userContextId && (
        <CloseButton
          onClick={() => handleDelete(commentId)}
          sx={{ position: "absolute", right: 16, top: 16 }}
          title="Delete comment"
        />
      )}
    </Paper>
  );
}
