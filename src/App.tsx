import React from "react";
import { Example, Header, ImageUpload } from "./components";
// import "./styles/output.css";
import "./index.css";

function App() {
  return (
    <div className="bg-slate-900">
      <Header />
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-40">
          <div className="px-4 py-6 sm:px-0">
            {/* <div className="rounded-lg border-4 border-dashed border-gray-200"> */}
            <div className="rounded-lg">
              <ImageUpload />
            </div>
          </div>
        </div>
      </main>
      <Example />
    </div>
  );
}

export default App;
