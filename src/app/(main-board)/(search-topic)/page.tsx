'use client';

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import React, { useState } from 'react'

const gradientAnimation = {
    initial: {
      backgroundPosition: '0% 50%',
    },
    hover: {
      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      scale:1.1,
      transition: {
        duration: 15,
        ease: 'easeInOut',
        loop: Infinity,
      },
    },
  };
  

const SearchPage = () => {
    const [topics, setTopics] = useState<string[]>(['Food', 'Style', 'Habbits', 'Food', 'Style', 'Habbits']);
    const router = useRouter();
    const bgColors = ['#CC69FB', '']

    return (
        <div className='w-[40rem]'>
            <div className='flex'>
                <Input className='focus-visible:ring-[#6F47FA] w-full'/>
                <Button className='bg-[#6F47FA] ml-2'>Search</Button>
            </div>

            <div className='w-full mt-5 grid gap-4 grid-cols-3'>
            {topics.map((topic, index) => 
                <motion.div
                    id={`${index}`} 
                    className='h-44 flex justify-center items-center rounded-lg text-3xl font-bold hover:cursor-pointer  bg-gradient-to-tl from-[#6F47FA] via-[#FFAEEB] to-white bg-[length:300%_300%]'
                    onClick={() => router.push(`topic?topic=${topic}`)}
                    initial={{backgroundPosition: '0% 50%'}}
                    whileHover={{scale: 1.1, backgroundPosition: ['0% 50%', '100% 50%']}}
                    
                >
                    {topic}
                </motion.div>
            )}
            </div>
        </div>
    )
}

export default SearchPage