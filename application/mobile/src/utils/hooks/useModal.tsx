import * as React from "react";

export const useModal = (initialMode = false) => {
  const [isOpen, setIsOpen] = React.useState(initialMode);
  const toggle = () => setIsOpen(!isOpen);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  return { isOpen, setIsOpen, toggle, openModal, closeModal };
};
