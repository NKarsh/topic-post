'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Post as PostInterface } from '@/types';
import Post from '@/components/app-general/Post';
import { ArrowLeft } from 'lucide-react';



const TopicPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [topic, setTopic] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const [titleKeywords, setTitleKeywords] = useState<string>('');
  const [contentKeywords, setContentKeywords] = useState<string>('');

  const updateApplause = (index: number) => {
    setPosts((prevPosts) =>
      prevPosts.map((post, i) =>
        i === index ? { ...post, applause: post.applause + 1 } : post
      )
    );
  };

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
        

        <div className='text-3xl text-white font-bold'>
            <Button className='mb-4 bg-[#FFAEEB] hover:bg-[#CC69FB]' onClick={() => router.push('/')}>
                <ArrowLeft className='text-black'/>
            </Button>
            &nbsp;
            {topic}
        </div>

        <div className='bg-white p-4 rounded-lg grid gap-2 mt-3'>
            <div>
                <Label>Title</Label>
                <Input 
                    className='focus-visible:ring-[#6F47FA]' 
                    value={titleKeywords}
                    onChange={(v) => setTitleKeywords(v.target.value)}
                    title='Title' 
                    placeholder='Add title for your content'/>
            </div>
            
            <div>
                <Label>Content</Label>
                <Input 
                    className='focus-visible:ring-[#6F47FA]'
                    value={contentKeywords}
                    onChange={(v) => setContentKeywords(v.target.value)}
                    title='Content' 
                    placeholder='Write anything'/>
            </div>
            
            <Button className='bg-[#6F47FA]'>
                Submit
            </Button>
        </div>

        <div className='mt-3 h-96'>
            {posts.length === 0 ? 
            <div className='w-full animate-pulse text-white flex justify-center'>
                No Posts In This Topic Yet
            </div>:            
            posts.map((post, index) => 
                <Post index={index} post={post} applauseUpdate={updateApplause}/>
            )}
        </div>
    </div>
  );
};

export default TopicPage;