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

interface Signal {
  id: string;
  function: string;
  frequency?: number;
  amplitude?: number;
}

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
            value={editedSignal.function}
            onChange={(e) =>
              setEditedSignal({ ...editedSignal, function: e.target.value })
            }
            placeholder="Signal function"
          />
          <Input
            type="number"
            value={editedSignal.frequency || ""}
            onChange={(e) =>
              setEditedSignal({
                ...editedSignal,
                frequency: parseFloat(e.target.value) || undefined,
              })
            }
            placeholder="Frequency"
          />
          <Input
            type="number"
            value={editedSignal.amplitude || ""}
            onChange={(e) =>
              setEditedSignal({
                ...editedSignal,
                amplitude: parseFloat(e.target.value) || undefined,
              })
            }
            placeholder="Amplitude"
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
