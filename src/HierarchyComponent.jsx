import React from 'react';
import { MenuList, MenuItem, ListItemText } from '@mui/material';
import { useQuery } from 'react-query';
import axios from 'axios';

const fetchHierarchy = async (memberId) => {
  const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/members/${memberId}`);
  return response.data;
};

const HierarchyComponent = ({ memberId }) => {
  const { data: hierarchy, error: hierarchyError } = useQuery(
    ['hierarchy', memberId],
    () => fetchHierarchy(memberId),
    {
      enabled: !!memberId,
      staleTime: import.meta.env.VITE_QUERY_CACHE_TIME,
      cacheTime: import.meta.env.VITE_QUERY_CACHE_TIME,
      refetchOnWindowFocus: false,
    }
  );

  if (hierarchyError) return <h3>Error fetching hierarchy data.</h3>;
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
};

export default HierarchyComponent;
