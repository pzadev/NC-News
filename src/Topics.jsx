import { useEffect, useState } from "react";
import { getTopics } from "./api";
import TopicCard from "./TopicCard";

const Topics = () => {
  const [loading, setLoading] = useState(false);
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    setLoading(true);
    getTopics()
      .then((data) => {
        setTopics(data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false)
        console.log(err);
      });
  }, []);

  if (loading){
    return <p>Loading Topics...</p>
  }

  return  (
  <div className="topic-grid">
  {topics.length > 0 ? (
    topics.map((topic, index) => (
      <div key={index}>
         <TopicCard topics={topic}/>
      </div>
    ))
  ) : (
    <p>No topics yet.</p>
  )}
</div>
  )
};

export default Topics;
