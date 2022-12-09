import React, { useState } from "react";
import {
  Dropdown,
  Example,
  Header,
  ImageUpload,
  UnsplashModal,
} from "./components";
import "./index.css";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };
  return (
    <div className="bg-slate-900">
      <Header />
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-40">
          <div className="px-4 py-6 sm:px-0">
            <div className="rounded-lg group">
              <ImageUpload />
              <Dropdown openModal={openModal} />
            </div>
          </div>
        </div>
      </main>
      <Example />
      <UnsplashModal isOpen={isOpen} closeModal={closeModal} />
    </div>
  );
}

export default App;
