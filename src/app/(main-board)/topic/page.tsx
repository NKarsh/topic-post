'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Post as PostInterface } from '@/types';
import Post from '@/components/app-general/Post';



const TopicPage = () => {
  const searchParams = useSearchParams();
  const [topic, setTopic] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState<PostInterface[]>([{title: "FOOD SOMETHING", content: "Something", applause:100}]);

  useEffect(() => {
    const topicParam = searchParams.get('topic');

    if (topicParam) {
      setTopic(topicParam);
    }

    setIsLoading(false);

  }, [searchParams]);

  if(isLoading)
    return (
        <div>

        </div>
    )

  if(topic.trim() === '')
    return (
        <div className='w-[40rem]'>
            No Topic Found
        </div>
    );

  return (
    <div className='w-[40rem]'>
        <div className='text-2xl text-white font-bold'>
            {topic}
        </div>

        <div className='bg-white p-4 rounded-lg grid gap-2 mt-3'>
            <div>
                <Label>Title</Label>
                <Input title='Title' placeholder='Add title for your content'/>
            </div>
            
            <div>
                <Label>Content</Label>
                <Input title='Content' placeholder='Write anything'/>
            </div>
            
            <Button>
                Submit
            </Button>
        </div>

        <div className='mt-3'>
            {posts.map((post, index) => 
                <Post index={index} post={post}/>
            )}
        </div>
    </div>
  );
};

export default TopicPage;