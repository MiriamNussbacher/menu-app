import { useState } from 'react'
import './App.css'
import { AppBar, Typography, MenuList, MenuItem, ListItemText } from '@mui/material';
import { useQuery, QueryClient } from 'react-query';
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


  const { data: parents, error: parentsError } = useQuery('parents', fetchRoot,{
    staleTime: import.meta.env.VITE_QUERY_CACHE_TIME, 
    cacheTime: import.meta.env.VITE_QUERY_CACHE_TIME, 
    refetchOnWindowFocus: false,
  });



  return (
    
    <div className="container">
       <AppBar position="fixed">
         
            <Typography variant="h6">
              Members Hierarchy
            </Typography>
    
        </AppBar>
        {parentsError && <h1>Error fetching root data.</h1>}
      <MenuList className="menu">
        {renderMenuItems(parents, selectedMemberId,handleMenuItemClick)}
      </MenuList>
      {selectedMemberId && <Hierarchy memberId={selectedMemberId} />}
    </div>
  )
}

const renderMenuItems = (parents,selectedMemberId,handleMenuItemClick) => {
  if (!parents) return null;
  return parents.map((item) => {
    return (
      <MenuItem key={item.memberId} onClick={() => handleMenuItemClick(item.memberId)}
        className={selectedMemberId === item.memberId ? 'selected' : ''}>
        <ListItemText primary={item.name} />
      </MenuItem>
    );

  });
};

function Hierarchy({ memberId }) {
  const { data: hierarchy, error:hierarchyError } = useQuery(['hierarchy', memberId], () => fetchHierarchy(memberId), {
    enabled: !!memberId, 
    staleTime: import.meta.env.VITE_QUERY_CACHE_TIME, 
    cacheTime: import.meta.env.VITE_QUERY_CACHE_TIME, 
    refetchOnWindowFocus: false,
  });
  
  if (!hierarchy) return null;
  if (hierarchyError) return <h3>Error fetching children data.</h3>;
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
