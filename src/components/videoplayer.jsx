import React from "react";
import { Box, Typography } from "@mui/material";

const VideoPlayer = ({ videoUrl, caption }) => {
  return (
    <Box
      sx={{
        maxWidth: "850px", // Increased max width to make the video player larger
        width: "100%", // Ensure it scales responsively
        margin: "0 auto",
        textAlign: "center",
        backgroundColor: "white",
        height: "100%",
      }}
    >
      {/* Video Player Box */}
      <Box
        sx={{
          aspectRatio: "16/9", // Aspect ratio for video
          backgroundColor: "black",
          borderRadius: "8px",
          overflow: "hidden",
          width: "100%", // Ensure it takes full width
          position: "relative",
        }}
      >
        <iframe
          src={videoUrl}
          title="Video Player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            border: "none",
          }}
        />
      </Box>

      {/* Video Caption Below the Video */}
      <Typography
        variant="body1"
        sx={{
          marginTop: "1rem", // Space above the caption
          color: "black",
          fontSize: "1.2rem",
          fontWeight: 600,
          justifySelf:"flex-start"
        }}
      >
        {caption}
      </Typography>
    </Box>
  );
};

export default VideoPlayer;
