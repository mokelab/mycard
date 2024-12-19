import { Card as MUICard } from "@mui/material";

export function Card(props: {
  style?: React.CSSProperties;
  children?: React.ReactNode;
}) {
  return <MUICard style={props.style}>{props.children}</MUICard>;
}
