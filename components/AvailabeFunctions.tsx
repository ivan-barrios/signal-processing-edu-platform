import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Info } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  signalFunctions,
  mathConstants,
  functionExamples,
} from "../utils/signalFunctions";
import { useState } from "react";

const AvailabeFunctions = () => {
  const [showFunctionInfo, setShowFunctionInfo] = useState(false);

  return (
    <Dialog open={showFunctionInfo} onOpenChange={setShowFunctionInfo}>
      <DialogTrigger asChild>
        <Button variant="outline" size="lg">
          <Info className="h-4 w-4 mr-2" />
          Defined Functions
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Available Functions and Constants</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-6">
            <section>
              <h3 className="font-semibold mb-2">Functions:</h3>
              <ul className="space-y-1">
                {signalFunctions.map((func, index) => (
                  <li key={index}>
                    <code className="text-sm bg-gray-100 p-1 rounded">
                      {func.name}
                    </code>{" "}
                    - {func.description}
                  </li>
                ))}
              </ul>
            </section>
            <section>
              <h3 className="font-semibold mb-2">Constants:</h3>
              <ul className="space-y-1">
                {mathConstants.map((constant, index) => (
                  <li key={index}>
                    <code className="text-sm bg-gray-100 p-1 rounded">
                      {constant.name}
                    </code>{" "}
                    - {constant.value}
                  </li>
                ))}
              </ul>
            </section>
            <section>
              <h3 className="font-semibold mb-2">Examples:</h3>
              <ul className="space-y-1">
                {functionExamples.map((example, index) => (
                  <li key={index}>
                    <code className="text-sm bg-gray-100 p-1 rounded">
                      {example.expression}
                    </code>
                    <p className="text-sm text-gray-600 mt-1">
                      {example.description}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default AvailabeFunctions;
