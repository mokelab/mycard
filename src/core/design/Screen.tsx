import { Edit } from "@mui/icons-material";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";

export function Screen(props: {
  title: string;
  handleAction?: () => void;
  children?: React.ReactNode;
}) {
  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {props.title}
          </Typography>
          {props.handleAction ? (
            <IconButton
              size="large"
              aria-label="edit"
              aria-controls="action"
              aria-haspopup="false"
              onClick={props.handleAction}
              color="inherit"
            >
              <Edit />
            </IconButton>
          ) : undefined}
        </Toolbar>
      </AppBar>
      {props.children}
    </>
  );
}
