import { Link } from "react-router";

const TopicCard = ({ topics }) => {

    const capitalizedTopic = topics.slug.charAt(0).toUpperCase() + topics.slug.slice(1);

    return (
      <div className="topic-card">
        <h2 className="topic-title">
          <Link to={`/articles?topic=${topics.slug}`}>{capitalizedTopic}</Link>
        </h2>
        <p className="topic-description">{topics.description}</p>
      </div>
    );
  };

export default TopicCard;
