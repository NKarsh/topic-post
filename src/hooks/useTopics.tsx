import { useState, useEffect } from "react";

const useTopics = () => {
  const [topics, setTopics] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTopics = async () => {
    try {
      const response = await fetch("/api/topics");
      if (!response.ok) {
        throw new Error("Failed to fetch topics");
      }
      const data: string[] = await response.json();
      setTopics(data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchTopics();
  }, []);

  return { topics, loading, error, fetchTopics };
};

export default useTopics;
