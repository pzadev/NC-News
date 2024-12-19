import { Link } from "react-router";
import { useState } from "react";
import { updateArticleVotes } from "../api";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
} from "@mui/material";

const ArticleCard = ({ article }) => {
  const [voteChange, setVoteChange] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);

  const voteUpdater = (change) => {
    if (!hasVoted) {
      setVoteChange((prev) => prev + change);
      setHasVoted(true);
      updateArticleVotes(article.article_id, change).catch(() => {
        setVoteChange((prev) => prev - change);
        alert("Vote failed, please try again later.");
      });
    }
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        maxWidth: 600,
        margin: "auto",
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "#fff",
        transition: "transform 0.3s ease-in-out",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: 6,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
          backgroundColor: "#f9f9f9",
          borderRadius: 2,
          width: "80px",
        }}
      >
        <Button
          size="small"
          variant="contained"
          color="success"
          onClick={() => voteUpdater(1)}
          disabled={hasVoted}
          sx={{
            minWidth: "40px",
            mb: 0.5,
            backgroundColor: "#4CAF50",
            "&:hover": {
              backgroundColor: "#388E3C",
            },
          }}
        >
          ⬆️
        </Button>
        <Typography
          variant="body1"
          sx={{ fontWeight: "bold", fontSize: "16px" }}
        >
          {article.votes + voteChange}
        </Typography>
        <Button
          size="small"
          variant="contained"
          color="error"
          onClick={() => voteUpdater(-1)}
          disabled={hasVoted}
          sx={{
            minWidth: "40px",
            mt: 1,
            backgroundColor: "#F44336",
            "&:hover": {
              backgroundColor: "#D32F2F",
            },
          }}
        >
          ⬇️
        </Button>
      </Box>

      <Box sx={{ flexGrow: 1, p: 2 }}>
        <Link
          to={`/articles/${article.article_id}`}
          style={{ textDecoration: "none" }}
        >
          <CardMedia
            component="img"
            height="200"
            image={article.article_img_url}
            alt={article.title}
            sx={{
              borderRadius: 1,
              objectFit: "cover",
              marginBottom: 2,
            }}
          />
        </Link>

        <CardContent>
          <Link
            to={`/articles/${article.article_id}`}
            style={{ textDecoration: "none" }}
          >
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              color="primary"
              sx={{
                fontWeight: "bold",
                fontSize: "20px",
                lineHeight: "1.2",
                color: "#333",
                textTransform: "capitalize",
              }}
            >
              {article.title}
            </Typography>
          </Link>

          <Box
            sx={{ display: "flex", flexDirection: "column", textAlign: "left" }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mt: 1,
                fontSize: "14px",
                color: "#6c757d",
                textTransform: "capitalize",
              }}
            >
             <strong> Topic: {article.topic.charAt(0).toUpperCase() + article.topic.slice(1)}</strong>
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mt: 1,
                fontSize: "12px",
                color: "#6c757d",
                fontStyle: "italic",
              }}
            >
              Authored by <strong>{article.author}</strong> on {''}  
              <strong>{new Date(article.created_at).toLocaleDateString()}</strong> at {" "} 
              <strong>{new Date(article.created_at).toLocaleTimeString()}</strong>
            </Typography>

            <Typography
              variant="body1"
              color="text.primary"
              sx={{
                mt: 2,
                fontWeight: "medium",
                fontSize: "12px",
                color: "#495057",
              }}
            >
              Comments: <strong>{article.comment_count}</strong>
            </Typography>
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
};

export default ArticleCard;
