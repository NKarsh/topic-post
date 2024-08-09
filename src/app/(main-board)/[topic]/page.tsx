"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Post as PostInterface } from "@/types";
import Post from "@/components/app-general/Post";
import { ArrowLeft } from "lucide-react";
import usePosts from "@/hooks/usePosts";

function formatUrlPath(url: string) {
  const urlPath = decodeURIComponent(url).trim();
  const trimmedPath = urlPath.startsWith("/") ? urlPath.slice(1) : urlPath;
  const formattedPath =
    trimmedPath.charAt(0).toUpperCase() +
    trimmedPath.slice(1).toLocaleLowerCase();
  return formattedPath;
}

const TopicPage = () => {
  const topic = formatUrlPath(usePathname());
  const router = useRouter();
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const { posts, loading, error } = usePosts(topic);
  const [uploadError, setUploadError] = useState<string>("");
  const [localPosts, setLocalPosts] = useState<PostInterface[]>([]);
  const [titleKeywords, setTitleKeywords] = useState<string>("");
  const [contentKeywords, setContentKeywords] = useState<string>("");

  const handleApplauseUpdate = async (index: number) => {
    const response = await fetch("/api/applause", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId: localPosts[index]._id,
      }),
    });

    if (response.ok) {
      setLocalPosts((prevPosts) =>
        prevPosts.map((post, i) =>
          i === index ? { ...post, applause: post.applause + 1 } : post
        )
      );
    } else {
      console.error("Failed to create post");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setIsUploading(true);
    e.preventDefault();

    const response = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: titleKeywords,
        content: contentKeywords,
        topic,
      }),
    });

    if (response.ok) {
      const newPost: PostInterface = await response.json();
      setLocalPosts([...localPosts, newPost]);
      setTitleKeywords("");
      setContentKeywords("");
      setUploadError("");
    } else {
      const res = await response.json();
      setUploadError(res.message);
      console.error("Failed to create post");
    }

    setIsUploading(false);
  };

  useEffect(() => {
    if (!loading && localPosts.length === 0) {
      setLocalPosts(posts);
    }
  }, [localPosts, loading]);

  if (loading) return <div>Loading...</div>;

  if (topic.trim() === "")
    return <div className="w-[40rem]">No Topic Found</div>;

  return (
    <div className="w-[40rem]">
      <div className="text-3xl text-white font-bold">
        <Button
          className="mb-4 bg-[#FFAEEB] hover:bg-[#CC69FB]"
          onClick={() => router.push("/")}
        >
          <ArrowLeft className="text-black" />
        </Button>
        &nbsp;
        {topic}
      </div>

      <div className="bg-white p-4 rounded-lg grid gap-2 mt-3">
        <div>
          <Label>Title</Label>
          <Input
            className="focus-visible:ring-[#6F47FA]"
            value={titleKeywords}
            onChange={(v) => setTitleKeywords(v.target.value)}
            title="Title"
            placeholder="Add title for your content"
          />
        </div>

        <div>
          <Label>Content</Label>
          <Input
            className="focus-visible:ring-[#6F47FA]"
            value={contentKeywords}
            onChange={(v) => setContentKeywords(v.target.value)}
            title="Content"
            placeholder="Write anything"
          />
        </div>

        <div hidden={uploadError === ""} className="text-sm text-red-600">
          {uploadError}
        </div>

        <Button
          disabled={isUploading}
          className="bg-[#6F47FA]"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>

      <div className="mt-3 h-96">
        {localPosts.length === 0 ? (
          <div className="w-full animate-pulse text-white flex justify-center">
            No Posts In This Topic Yet
          </div>
        ) : (
          localPosts.map((post, index) => (
            <Post
              key={index}
              index={index}
              post={post}
              applauseUpdate={handleApplauseUpdate}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TopicPage;
