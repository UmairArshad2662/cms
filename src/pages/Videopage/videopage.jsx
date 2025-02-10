import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, CircularProgress, Alert } from "@mui/material";
import VideoPlayer from "../../components/videoplayer";
import axios from "axios";
import { baseuri } from "../../baseuri/baseuri";
import Cookies from "js-cookie"; // Importing js-cookie for handling cookies

const VideoPage = () => {
  const { videoId } = useParams(); // Get videoId from URL
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        // Get the token from cookies
        const token = Cookies.get("token");

        const response = await axios.get(`${baseuri}/api/courses/videos/${videoId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to the headers
          },
        });
        setVideo(response.data);
      } catch (error) {
        console.error("Error fetching video:", error);
        setError("Failed to load video. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (videoId) {
      fetchVideo();
    }
  }, [videoId]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!video) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Typography variant="h5">Video not found.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: "white", minHeight: "100vh", paddingBottom: "" }}>
      {/* Video Title */}
      <Box sx={{ padding: "1rem", borderBottom: "1px solid #ddd" }}>
        <Typography variant="h4" sx={{ color: "black", fontWeight: 700 }}>
          {video.title}
        </Typography>
      </Box>

      {/* Video Player */}
      <Box sx={{ padding: "2rem" }}>
        <VideoPlayer videoUrl={video.url} caption={video.description} sx={{ width: "100%", height: "auto" }} />
      </Box>
    </Box>
  );
};

export default VideoPage;
