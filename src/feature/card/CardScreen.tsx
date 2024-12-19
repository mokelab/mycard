import { Screen } from "../../core/design/Screen";
import { Card } from "../../core/design/Card";
import { useParams, useSearchParams } from "react-router-dom";
import { List } from "../../core/design/List";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { TextField } from "../../core/design/TextField";
import QRCode from "qrcode";
import { MyDialog } from "../../core/design/Dialog";

export function CardScreen() {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const title = searchParams.get("t") ?? "Card";
  const [labels, setLabels] = useState<string[]>([]);
  const [items, setItems] = useState<{ primary: string; secondary: string }[]>(
    []
  );
  const [editTitle, setEditTitle] = useState(title);
  const [editItems, setEditItems] = useState<
    { primary: string; secondary: string }[]
  >([]);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    const f = async () => {
      const resp = await fetch(`/mycard/d/${id}.json`);
      const json = await resp.json();

      const labels = (json["labels"] as string[]) ?? [];
      setLabels(labels);
    };
    f();
  }, [id]);

  useEffect(() => {
    const f = async () => {
      setItems(
        labels.map((label, index) => {
          const value = searchParams.get(`i${index}`) ?? "???";
          return {
            primary: label,
            secondary: value,
          };
        })
      );
      generate(document.location.href);
    };
    f();
  }, [labels, document.location.href]);

  return (
    <Screen
      title={title}
      handleAction={() => {
        // copy items to editItems deeply
        setEditItems(
          items.map((item) => {
            return { primary: item.primary, secondary: item.secondary };
          })
        );
        setShowDialog(true);
      }}
    >
      <Card style={{ padding: "16px", margin: "16px" }}>
        <List items={items} />
      </Card>
      <Box sx={{ margin: "16px", display: "flex", justifyContent: "center" }}>
        <canvas id="qr-canvas" style={{ width: "256px", height: "256px" }} />
      </Box>

      <MyDialog
        open={showDialog}
        onClose={() => {
          setShowDialog(false);
        }}
        content={
          <>
            <Box>
              <TextField
                label="Title"
                value={editTitle}
                onChange={(e) => setEditTitle(e)}
              />
            </Box>
            {editItems.map((item, index) => (
              <Box key={item.primary} sx={{ marginTop: "8px" }}>
                <TextField
                  label={item.primary}
                  value={item.secondary}
                  onChange={(e) => {
                    const newItems = [...editItems];
                    newItems[index].secondary = e;
                    setEditItems(newItems);
                  }}
                />
              </Box>
            ))}
          </>
        }
        submit={() => {
          const params = new URLSearchParams();
          params.set("t", editTitle);
          editItems.forEach((item, index) => {
            params.set(`i${index}`, item.secondary);
          });
          setSearchParams(params);
          setShowDialog(false);
        }}
      ></MyDialog>
    </Screen>
  );
}

const generate = async (text: string) => {
  const canvas = document.getElementById("qr-canvas") as HTMLCanvasElement;
  QRCode.toCanvas(canvas, text, (error) => {
    console.log(error);
  });
};
