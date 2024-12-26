import GraphArea from "@/components/GraphArea";
import SignalList from "@/components/SignalList";
import Toolbar from "@/components/ToolBar";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Toolbar />
      <div className="flex-grow flex flex-col md:flex-row">
        <SignalList />
        <GraphArea />
      </div>
    </main>
  );
}
