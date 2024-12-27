"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { GripVertical } from "lucide-react";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";

interface Signal {
  id: string;
  function: string;
  frequency?: number;
  amplitude?: number;
}

function SortableSignal({
  signal,
  onUpdate,
  onDelete,
}: {
  signal: Signal;
  onUpdate: (updatedSignal: Signal) => void;
  onDelete: (signalId: string) => void;
}) {
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
      className="bg-white p-2 rounded shadow flex items-center mb-2"
    >
      <div {...attributes} {...listeners} className="cursor-move mr-2">
        <GripVertical size={20} />
      </div>
      <span className="flex-grow">{signal.function}</span>
      <EditButton signal={signal} onUpdate={onUpdate} />
      <DeleteButton signal={signal} onDelete={onDelete} />
    </li>
  );
}

export default function SignalList({
  signals,
  setSignals,
}: {
  signals: Signal[];
  setSignals: (signals: Signal[]) => void;
}) {
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
      const oldIndex = signals.findIndex(
        (item: Signal) => item.id === active.id
      );
      const newIndex = signals.findIndex(
        (item: Signal) => item.id === over?.id
      );

      setSignals(arrayMove(signals, oldIndex, newIndex));
    }
  };

  const updateSignal = (updatedSignal: Signal) => {
    setSignals(
      signals.map((signal) =>
        signal.id === updatedSignal.id ? updatedSignal : signal
      )
    );
  };

  const deleteSignal = (deletedSignalId: string) => {
    setSignals(signals.filter((signal) => signal.id !== deletedSignalId));
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
              <SortableSignal
                key={signal.id}
                signal={signal}
                onUpdate={updateSignal}
                onDelete={deleteSignal}
              />
            ))}
          </ul>
        </SortableContext>
      </DndContext>
    </div>
  );
}
