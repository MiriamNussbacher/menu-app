import { useState } from 'react'
import './App.css'
import { AppBar, Typography, MenuList, MenuItem, ListItemText } from '@mui/material';
import { useQuery, QueryClient } from 'react-query';
import axios from 'axios';
import MenuComponent from './MenuComponent';
import HierarchyComponent from './HierarchyComponent';


const fetchRoot = async () => {
  const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/members`);
  return response.data;
}

function App() {
  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const handleMenuItemClick = (memberId) => {
    setSelectedMemberId(memberId);
  };


  const { data: parents, error: parentsError } = useQuery('parents', fetchRoot, {
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
        <MenuComponent
          parents={parents}
          selectedMemberId={selectedMemberId}
          handleMenuItemClick={handleMenuItemClick}
        />
      </MenuList>
      {selectedMemberId && <HierarchyComponent memberId={selectedMemberId} />}
    </div>
  )
}



export default App
