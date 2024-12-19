import { useEffect, useState } from "react";
import { getTopics } from "../api";
import TopicCard from "./TopicCard"


const Topics = () => {
  const [loading, setLoading] = useState(false);
  const [topics, setTopics] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getTopics()
      .then((data) => {
        setTopics(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err)
        setLoading(false)
      });
  }, []);

  if (loading){
    return <p>Loading Topics...</p>
  }

  if (error) {
    return (
      <>
        {error.code} {error.message}
        <p>
          Can't load Topics right now
        </p>
      </>
    );
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
