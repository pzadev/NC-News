import {
  getSingleArticle,
  updateArticleVotes,
  commentsFromArticle,
} from "../api";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import CommentPost from "./CommentPost";
import CommentCard from "./CommentCard";
import Lottie from "lottie-react";
import loadingAnimation from "../assets/loadingAnimation.json";
import { Box, Button, Typography, Divider } from "@mui/material";

const SingleArticle = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [voteChange, setVoteChange] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    commentsFromArticle(article_id)
      .then((comments) => {
        setComments(comments);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false)
      });
  }, [article_id]);

  useEffect(() => {
    setLoading(true);
    getSingleArticle(article_id)
      .then((article) => {
        setArticle(article);
      })
      .catch((err) => {
        setError(err)
      })
      .finally(() => {
        setLoading(false);
      });
  }, [article_id]);

  const voteUpdater = (change) => {
    if (!hasVoted) {
      setVoteChange((prev) => prev + change);
      setHasVoted(true);
      updateArticleVotes(article.article_id, change)
        .then(() => {})
        .catch((err) => {
          setVoteChange((prev) => prev - change);
          alert("Vote failed, please try again later.");
        });
    }
  };

  if (loading) {
    return (
      <>
        {" "}
        <h2>Loading Article Content...</h2>
        <div className="lottie-container">
          <Lottie animationData={loadingAnimation} />
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        {error.code} {error.message}
        <p>
          An article with this id doesn't exist... yet!
        </p>
      </>
    );
  }

  return (
    <Box sx={{ display: "flex", alignItems: "flex-start", maxWidth: "800px", margin: "auto", mt: 4, boxShadow: 3, borderRadius: 2 }}>
      {/* Left-hand voting section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
          backgroundColor: "#f9f9f9",
          borderRight: "1px solid #e0e0e0",
        }}
      >
        <Button
          size="small"
          variant="contained"
          color="success"
          onClick={() => voteUpdater(1)}
          disabled={hasVoted}
          sx={{ minWidth: "40px", mb: 1 }}
        >
          ⬆️
        </Button>
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          {article.votes + voteChange}
        </Typography>
        <Button
          size="small"
          variant="contained"
          color="error"
          onClick={() => voteUpdater(-1)}
          disabled={hasVoted}
          sx={{ minWidth: "40px", mt: 1 }}
        >
          ⬇️
        </Button>
      </Box>

      {/* Main content section */}
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          {article.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          By {article.author} on {new Date(article.created_at).toLocaleDateString()} at {new Date(article.created_at).toLocaleTimeString()}
        </Typography>
        <Divider sx={{ my: 2 }} />
        <img
          src={article.article_img_url}
          alt={article.title}
          style={{ width: "100%", borderRadius: "8px", marginBottom: "16px" }}
        />
        <Typography variant="body1" sx={{ mb: 2 }}>
          {article.body}
        </Typography>
        <Divider sx={{ my: 2 }} />
        <CommentPost setComments={setComments} />
        <Typography variant="h6" sx={{ mt: 4 }}>
          Comments ({article.comment_count})
        </Typography>
        <Box sx={{ mt: 2 }}>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <CommentCard key={comment.comment_id} comments={comment} setComments={setComments} />
            ))
          ) : (
            <Typography variant="body2" color="text.secondary">
              No comments yet. Be the first to add one!
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default SingleArticle;
