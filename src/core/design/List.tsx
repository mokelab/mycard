import MUIList from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

export function List(props: {
  items: { primary: string; secondary: string }[];
}) {
  return (
    <MUIList sx={{ width: "100%", bgcolor: "background.paper" }}>
      {props.items.map((item) => (
        <ListItem key={item.primary}>
          <ListItemText primary={item.primary} secondary={item.secondary} />
        </ListItem>
      ))}
    </MUIList>
  );
}
