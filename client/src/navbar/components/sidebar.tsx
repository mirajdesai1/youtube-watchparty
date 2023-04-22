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

const drawerWidth = 240;

const service = new YTWatchPartyService();

export default function PermanentDrawerLeft() {
  const [friends, setFriends] = useState<IUserPublicProfile[]>([]);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchFriends = async () => {
      const token = await getAccessTokenSilently();
      const friendsProfiles = await service.getFriends(token);
      setFriends(friendsProfiles);
    };

    fetchFriends().catch((e) => console.log(e));
  }, [getAccessTokenSilently]);

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
        <List>
            <Typography variant='h6' textAlign={'left'} marginLeft={2}>Friends</Typography>
          {friends.map((friend, index) => (
            <Link to={`/profile/${friend.username}`}>
            <ListItem key={friend.username} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <img style={{borderRadius: '50%'}} width={50} height={50} src={friend.picture} alt='profile'></img>
                </ListItemIcon>
                <ListItemText primary={friend.username} />
              </ListItemButton>
            </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
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
          <Route path="/profile" Component={withAuthenticationRequired(() => UserProfile({active:'featured'}))} />
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
