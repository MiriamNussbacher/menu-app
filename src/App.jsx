import { useState } from 'react'
import './App.css'
import { AppBar, Toolbar, Typography, Container, MenuList, MenuItem, ListItemText, Paper } from '@mui/material';
import { useQuery, QueryClient, QueryClientProvider } from 'react-query';
import axios from 'axios';

const queryClient = new QueryClient();


const fetchHierarchy = async (memberId) => {
  const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/members/${memberId}`);
  return response.data;
};

const fetchRoot = async () => {
  const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/members`);
  return response.data;
}

function App() {
  const [selectedMemberId, setSelectedMemberId] = useState(null);

  const handleMenuItemClick = (memberId) => {
    setSelectedMemberId(memberId);
  };

  const { data: parents } = useQuery('parents', fetchRoot,{
    staleTime: import.meta.env.VITE_QUERY_CACHE_TIME, 
    cacheTime: import.meta.env.VITE_QUERY_CACHE_TIME, 
    refetchOnWindowFocus: false,
  });

  const renderMenuItems = (parents) => {
    debugger
    if (!parents) return null;
    return parents.map((item) => {
      return (
        <MenuItem key={item.memberId} onClick={() => handleMenuItemClick(item.memberId)}
          className={selectedMemberId === item.memberId ? 'selected' : ''}>
          <ListItemText primary={item.name} />
          <MenuList className='MuiMenuItem-root'>
            {renderMenuItems(item.children)}
          </MenuList>
        </MenuItem>
      );

    });
  };

  return (
    
    <div className="container">
       <AppBar position="fixed">
         
            <Typography variant="h6">
              Members Hierarchy
            </Typography>
    
        </AppBar>
      <MenuList className="menu">
        {renderMenuItems(parents)}
      </MenuList>
      {selectedMemberId && <Hierarchy memberId={selectedMemberId} />}
    </div>
  )
}

function Hierarchy({ memberId }) {
  const { data: hierarchy } = useQuery(['hierarchy', memberId], () => fetchHierarchy(memberId), {
    enabled: !!memberId, 
    staleTime: import.meta.env.VITE_QUERY_CACHE_TIME, 
    cacheTime: import.meta.env.VITE_QUERY_CACHE_TIME, 
    refetchOnWindowFocus: false,
  });
  
  if (!hierarchy) return null;
  return (
    <MenuList className="hierarchy">
      {hierarchy.map((member) => (
        <MenuItem key={member.memberId}>
          <ListItemText primary={member.name} />
        </MenuItem>
      ))}
    </MenuList>
  );
}

export default App
