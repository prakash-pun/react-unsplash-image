import React, { useState } from "react";
import {
  Dropdown,
  Example,
  Header,
  ImageUpload,
  UnsplashModal,
} from "./components";
import "./index.css";
import "simplebar-react/dist/simplebar.min.css";

export const App: React.FC = () => {
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
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-40">
        <div className="px-4 pt-6 sm:px-0">
          <div className="rounded-lg group">
            <ImageUpload />
            <Dropdown openModal={openModal} />
          </div>
        </div>
      </div>
      <Example />
      <UnsplashModal isOpen={isOpen} closeModal={closeModal} />
    </div>
  );
};

export default App;
