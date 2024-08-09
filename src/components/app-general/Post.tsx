import { cn } from "@/lib/utils";
import { Post as PostInterface } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { HeartHandshake } from "lucide-react";
import React, { useState } from "react";

const Post = ({
  post,
  index,
  applauseUpdate,
}: {
  post: PostInterface;
  index: number;
  applauseUpdate: Function;
}) => {
  const [applause, setApplause] = useState<boolean>(false);
  const [showHeart, setShowHeart] = useState<boolean>(false);

  const handleButtonClick = () => {
    setShowHeart(true);
    setTimeout(() => setShowHeart(false), 2000); // Hide heart after 2 seconds
  };
  return (
    <motion.div
      key={index}
      className="bg-white rounded-lg p-4 my-2"
      whileHover={{ scale: 1.05 }}
    >
      <div className="flex w-full justify-center">
        <div className="font-bold text-lg w-full">{post.title}</div>
        <div className="text-sm flex justify-end w-full">
          {new Date(post.date).toDateString()}
        </div>
      </div>
      <div className="mt-2">{post.content}</div>
      <div
        className={cn(
          "flex mt-3 hover:cursor-pointer w-fit select-none items-center",
          applause ? "text-red-500" : "text-black"
        )}
        onClick={() => {
          setApplause(true);
          applauseUpdate(index);
          handleButtonClick();
        }}
      >
        <HeartHandshake />
        &nbsp;
        {post.applause}
        &nbsp;
        <AnimatePresence>
          {showHeart && (
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className=""
            >
              ❤️
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Post;
