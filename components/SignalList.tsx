"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Signal {
  id: string;
  function: string;
  frequency?: number;
  amplitude?: number;
}

function SortableSignal({ signal }: { signal: Signal }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: signal.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white p-2 rounded shadow flex justify-between items-center mb-2 cursor-move"
    >
      <span>{signal.function}</span>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            Edit
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Signal</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              defaultValue={signal.function}
              placeholder="Signal function"
            />
            <Input
              type="number"
              defaultValue={signal.frequency}
              placeholder="Frequency"
            />
            <Input
              type="number"
              defaultValue={signal.amplitude}
              placeholder="Amplitude"
            />
          </div>
          <Button
            onClick={() => {
              // Here you would typically update the signal in your state
              console.log("Updated signal:", signal);
            }}
          >
            Save Changes
          </Button>
        </DialogContent>
      </Dialog>
    </li>
  );
}

export default function SignalList() {
  const [signals, setSignals] = useState<Signal[]>([]);
  const [newSignal, setNewSignal] = useState("");

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const addSignal = () => {
    if (newSignal) {
      setSignals([
        ...signals,
        { id: Date.now().toString(), function: newSignal },
      ]);
      setNewSignal("");
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setSignals((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <div className="w-full md:w-1/3 p-4 bg-gray-50 overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Signal Inputs</h2>
      <div className="flex mb-4">
        <Input
          type="text"
          value={newSignal}
          onChange={(e) => setNewSignal(e.target.value)}
          placeholder="Enter signal function (e.g., sin(t))"
          className="flex-grow mr-2"
        />
        <Button onClick={addSignal}>Add</Button>
      </div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={signals} strategy={verticalListSortingStrategy}>
          <ul className="space-y-2">
            {signals.map((signal) => (
              <SortableSignal key={signal.id} signal={signal} />
            ))}
          </ul>
        </SortableContext>
      </DndContext>
    </div>
  );
}
