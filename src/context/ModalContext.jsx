"use client";
import { createContext, useContext, useState, useCallback } from "react";
import ConfirmDeletePropertyModal from "@/components/Modals/ConfirmDeletePropertyModal";
import AgentInfoModal from "@/components/Modals/AgentInfoModal";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modal, setModal] = useState(null);
  const [modalProps, setModalProps] = useState({});

  const openModal = useCallback((name, props = {}) => {
    setModal(name);
    setModalProps(props);
  }, []);

  const closeModal = useCallback(() => {
    setModal(null);
    setModalProps({});
  }, []);

  return (
    <ModalContext.Provider value={{ modalProps, openModal, closeModal }}>
      {children}
      <ConfirmDeletePropertyModal
        open={modal === "deleteConfirmation"}
        handleClose={closeModal}
      />
      <AgentInfoModal open={modal === "agentInfo"} handleClose={closeModal} />
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
