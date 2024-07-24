import React from 'react';
import { MenuItem, ListItemText } from '@mui/material';

const MenuComponent = ({ parents, selectedMemberId, handleMenuItemClick }) => {
  const renderMenuItems = (parents) => {
    if (!parents) return null;
    return parents.map((item) => (
      <MenuItem
        key={item.memberId}
        onClick={() => handleMenuItemClick(item.memberId)}
        className={selectedMemberId === item.memberId ? 'selected' : ''}
      >
        <ListItemText primary={item.name} />
      </MenuItem>
    ));
  };

  return <>{renderMenuItems(parents)}</>;
};

export default MenuComponent;
