import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { MenuList, MenuItem, ListItemText } from '@mui/material';
import { useQuery, QueryClient, QueryClientProvider } from 'react-query';
import axios from 'axios';


function App() {
  const [count, setCount] = useState(0)

  const queryClient = new QueryClient();

  
  const fetchHierarchy = async (memberId) => {
    const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/members/${memberId}`);
    return response.data;
  };

  const fetchRoot = async() =>{
    const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/members`);
    return response.data;
  }

  const handleMenuItemClick = (memberId) => {
    setSelectedMemberId(memberId);
  };

  const { data: parents } = useQuery('parents', fetchRoot);

//old working code!!!
  const renderMenuItems = (parents) => {
    if (!parents) return null;
    return parents.map((item) => {
      if (item.children) {
        return (
          <MenuItem key={item.memberId}>
            <ListItemText primary={item.name} />
            <MenuList className='MuiMenuItem-root'>
              {renderMenuItems(item.children)}
            </MenuList>
          </MenuItem>
        );
      }

   

      return (
        <MenuItem key={item.memberId}>
          <ListItemText primary={item.name} />
        </MenuItem>
      );
    });
  };

  return (
    <div>
    <MenuList>
      {renderMenuItems(parents)}
    </MenuList>
  </div>
  )
}

export default App
