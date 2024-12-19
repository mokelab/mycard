import { Dialog, DialogActions, DialogContent, Button } from "@mui/material";

export function MyDialog(props: {
  open: boolean;
  onClose: () => void;
  content: React.ReactNode;
  submit: () => void;
}) {
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogContent>{props.content}</DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Cancel</Button>
        <Button onClick={props.submit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
