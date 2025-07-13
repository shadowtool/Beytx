import { HeartEmptyIcon, HeartFilledIcon } from "@/imports/icons";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

const LikeButton = ({ isLiked, onClick }) => {
  return (
    <div onClick={onClick} className="cursor-pointer">
      <AnimatePresence mode="wait">
        {isLiked ? (
          <motion.div
            key="filled"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1.2, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.1 }}
          >
            <HeartFilledIcon size={18} color="#e63946" />
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1.2, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.1 }}
          >
            <HeartEmptyIcon size={18} color="#000000" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LikeButton;
