import React, { useState, useEffect } from "react";
import {
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Collapse,
  IconButton,
  Button,
  useMediaQuery,
  useTheme,
  AppBar,
  Typography,
} from "@mui/material";
import { ExpandMore, ExpandLess, Menu } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { baseuri } from "../baseuri/baseuri";
import Cookies from "js-cookie";  // Importing js-cookie for handling cookies
import logo from "../../src/assets/logo-light.png"; // Import the logo

const drawerWidth = 240;

const MainLayout = () => {
  const navigate = useNavigate();
  const [openChapters, setOpenChapters] = useState({}); // Track which chapters are open
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedVideoId, setSelectedVideoId] = useState(null); // Track selected video

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get the token from cookies
        const token = Cookies.get("token");

        const response = await axios.get(`${baseuri}/api/courses`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in the request headers
          },
        });
        console.log(response.data);

        if (response.data.length > 0) {
          setCourseData(response.data[0]);
        } else {
          setCourseData(null);
        }
      } catch (error) {
        console.error("Error fetching course data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChapterClick = (chapterId) => {
    setOpenChapters((prev) => ({
      ...prev,
      [chapterId]: !prev[chapterId],
    }));
  };

  const handleNavigate = (videoId) => {
    setSelectedVideoId(videoId); // Set selected video

    navigate(`/video/${videoId}`);
  };

  const handleDrawerToggle = () => {
    setDrawerOpen((prev) => !prev);
  };

  const handleLogout = () => {
    // Remove the token from cookies
    Cookies.remove("token");

    // Navigate to the sign-in page
    navigate("/signin");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!courseData || !courseData.chapters) {
    return <div>Error: Course data not found.</div>;
  }

  return (
    <Box sx={{ display: "flex", backgroundColor: "black" }}>
      <CssBaseline />

      {isMobile && (
        <AppBar position="fixed" sx={{ backgroundColor: "black" }}>
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <Menu />
            </IconButton>
            <Typography variant="h6">My App</Typography>
          </Toolbar>
        </AppBar>
      )}

<Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? drawerOpen : true}
        onClose={handleDrawerToggle}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "black",
            color: "white",
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        {/* Logo in Drawer Header */}
        <Box sx={{ textAlign: "left", padding: "10px", marginTop:"5px" }}>
          <img src={logo} alt="Logo" style={{ width: "90%", height: "auto" }} />
        </Box>
        <List sx={{ padding: "0.5rem" }}>
          {courseData.chapters.map((chapter) => (
            <React.Fragment key={chapter._id}>
              <ListItem
                button
                onClick={() => handleChapterClick(chapter._id)}
                sx={{
                  borderRadius: "8px",
                  padding: "0.40rem 1rem",
                  marginBottom: "0.25rem",
                  "&:hover": {
                    backgroundColor: "white",
                    color: "black",
                  },
                }}
              >
                <ListItemText
                  primary={chapter.title}
                  primaryTypographyProps={{
                    fontWeight: "medium",
                    color: "inherit",
                  }}
                />
                <IconButton
                  sx={{ color: "inherit", "&:hover": { color: "black" } }}
                >
                  {openChapters[chapter._id] ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
              </ListItem>

              {/* Sublist for Videos */}
              <Collapse
                in={openChapters[chapter._id]}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  {chapter.videos.map((video) => (
                    <ListItem
                      button
                      key={video._id}
                      sx={{
                        pl: 4,
                        borderRadius: "8px",
                        padding: "0.75rem 1rem",
                        marginBottom: "0.25rem",
                        backgroundColor:
                          selectedVideoId === video._id
                            ? "white"
                            : "transparent",
                        color:
                          selectedVideoId === video._id ? "black" : "inherit",
                        "&:hover": {
                          backgroundColor: "white",
                          color: "black",
                        },
                      }}
                      onClick={() => handleNavigate(video._id)}
                    >
                      <ListItemText
                        primary={video.title}
                        primaryTypographyProps={{
                          fontSize: "0.875rem",
                          color: "inherit",
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </React.Fragment>
          ))}
        </List>

        <Box sx={{ marginTop: "auto", padding: "1rem" }}>
          <Button
            fullWidth
            onClick={handleLogout}
            sx={{
              borderRadius: "8px",
              padding: "0.75rem 1rem",
              textTransform: "none",
              backgroundColor: "rgb(26, 23, 23)",
              color: "white",
              fontWeight: 500,
            }}
          >
            Logout
          </Button>
        </Box>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: "#ffffff",
          color: "#333333",
          marginTop: isMobile ? "64px" : "0px",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
