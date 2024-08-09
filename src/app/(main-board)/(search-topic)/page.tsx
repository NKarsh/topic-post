"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import useTopics from "@/hooks/useTopics";

const SearchPage = () => {
  const [keywords, setKeywords] = useState<string>("");
  const { topics, loading, error, fetchTopics } = useTopics();
  const [localTopics, setLocalTopics] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      setLocalTopics([...topics]);
    }

    fetchTopics();
  }, [loading, topics]);

  return (
    <div className="w-[40rem]">
      <div className="flex">
        <Input
          value={keywords}
          onChange={(v) => setKeywords(v.target.value)}
          className="focus-visible:ring-[#6F47FA] w-full"
        />
        <Button
          onClick={() => router.push(`/${keywords}`)}
          className="bg-[#6F47FA] ml-2"
        >
          Search
        </Button>
      </div>

      {loading ? (
        <div className="text-white flex items-center justify-center w-full mt-10">
          Loading topics &nbsp;
          <div className="w-5 h-5 rounded-full border-2 border-dotted animate-spin" />
        </div>
      ) : (
        <div className="w-full mt-5 grid gap-2 sm:gap-3 grid-cols-3">
          {localTopics.map((topic, index) => (
            <motion.div
              key={index}
              className="sm:h-44 h-24 flex justify-center 
                         items-center rounded-lg text-lg sm:text-3xl 
                         font-bold hover:cursor-pointer bg-gradient-to-tl 
                         from-[#6F47FA] via-[#FFAEEB] to-white 
                         bg-[length:300%_300%] select-none"
              onClick={() => router.push(`/${topic}`)}
              initial={{ backgroundPosition: "0% 50%" }}
              whileHover={{
                scale: 1.1,
                backgroundPosition: ["0% 50%", "100% 50%"],
              }}
            >
              {topic}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
