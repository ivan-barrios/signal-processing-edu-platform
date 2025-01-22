import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Signal } from "@/types/signal";

const EditButton = ({
  signal,
  onUpdate,
}: {
  signal: Signal;
  onUpdate: (updatedSignal: Signal) => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedSignal, setEditedSignal] = useState(signal);

  return (
    <Dialog open={isEditing} onOpenChange={setIsEditing}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent onClick={(e) => e.stopPropagation()}>
        <DialogHeader>
          <DialogTitle>Edit Signal</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            value={
              typeof editedSignal.function === "object"
                ? `${editedSignal.function.re}${
                    editedSignal.function.im >= 0 ? "+" : ""
                  }${editedSignal.function.im}i`
                : editedSignal.function
            }
            onChange={(e) =>
              setEditedSignal({ ...editedSignal, function: e.target.value })
            }
            placeholder="Signal function"
          />
        </div>
        <Button
          onClick={() => {
            onUpdate(editedSignal);
            setIsEditing(false);
          }}
        >
          Save Changes
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default EditButton;
