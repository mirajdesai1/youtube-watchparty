import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import PrimarySearchAppBar from './navbar';
import { Routes, Route } from 'react-router';
import VideoDetail from '../../videoDetails/components/videoDetail';
import SearchResult from '../../search/components/searchResult';
import Home from '../../home/components/Home';
import PublicProfile from '../../components/PublicProfile';
import UserProfile from '../../components/UserProfile';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import YTWatchPartyService, {
  IUserPublicProfile,
} from '../../api/YTWatchPartyService';
import { Link } from 'react-router-dom';
import useFetchFriends from '../../hooks/useFetchFriends';
import FriendSection from './friendsSection';
import {
  MusicNote,
  Pets,
  SentimentVerySatisfied,
  SportsCricket,
  SportsEsports,
} from '@mui/icons-material';
import { useMediaQuery, useTheme } from '@mui/material';



const service = new YTWatchPartyService();

export default function PermanentDrawerLeft() {
  const { isAuthenticated } = useAuth0();
  const theme = useTheme();

  const matches = useMediaQuery('(min-width:600px)');

  const drawerWidth = matches ? 240 : 100;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <PrimarySearchAppBar />
        {/* <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Permanent drawer
          </Typography>
        </Toolbar> */}
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        {isAuthenticated && <FriendSection />}
        <Divider />
        <List>
          {[
            { name: 'Hip hop music', id: '0glt670', icon: <MusicNote /> },
            {
              name: 'Role-playing video game',
              id: '0403l3g',
              icon: <SportsEsports />,
            },
            { name: 'Cricket', id: '09xp_', icon: <SportsCricket /> },
            { name: 'Humor', id: '09kqc', icon: <SentimentVerySatisfied /> },
            { name: 'Pets', id: '068hy', icon: <Pets /> },
          ].map((category, index) => (
            <Link
              className="text-decoration-none"
              to={`/search/categories/${category.name}`}
              style={{ color: 'black' }}
            >
              <ListItem key={category.id} disablePadding>
                <ListItemButton>
                  {category.icon}
                  {matches &&
                  <ListItemText className="ms-2" primary={category.name} />}
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        <Routes>
          <Route index path="/*" element={<Home />} />
          <Route path="/video/:videoID" element={<VideoDetail />} />
          <Route path="/search/:searchTerm" element={<SearchResult />} />
          <Route
            path="/search/categories/:category"
            element={<SearchResult />}
          />
          <Route
            path="/profile"
            Component={withAuthenticationRequired(() =>
              UserProfile({ active: 'featured' })
            )}
          />
          <Route path="/profile/:username" element={<PublicProfile />} />
          <Route
            path="/profile/:username/pending"
            element={<UserProfile active="pending" />}
          />
          <Route
            path="/profile/:username/featured"
            element={<UserProfile active="featured" />}
          />
        </Routes>
      </Box>
    </Box>
  );
}
