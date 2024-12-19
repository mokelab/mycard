import { TextField as MUITextField } from "@mui/material";

export function TextField(props: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <MUITextField
      label={props.label}
      value={props.value}
      onChange={(e) => props.onChange(e.target.value)}
    />
  );
}
