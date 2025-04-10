"use client";
import React from "react";
import { Dialog, Transition, TransitionChild } from "@headlessui/react";
import { Fragment } from "react";

const ModalWrapper = ({ handleClose, open, children }) => {
  return (
    <>
      <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className="relative z-[1000]" onClose={handleClose}>
          <div className="fixed inset-0 overflow-y-auto z-[1000] bg-black/50">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              {children}
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ModalWrapper;
