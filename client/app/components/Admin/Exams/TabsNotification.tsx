import { Box, Tab, Tabs } from '@mui/material';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const TabsNotification = ({
  tabs,
  activeTab,
  setActiveTab,
}: {
  tabs: any;
  activeTab: any;
  setActiveTab: any;
}) => {
  const [value, setValue] = useState(activeTab);

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
    setActiveTab(newValue);
  };

  return (
    <>
      <div className='dark:!text-white'>
        <Tabs
          value={value}
          onChange={handleChange}
          sx={{
            background: '#f8d2b3',
          }}
        >
          {tabs.map((tab: any, index: number) => (
            <Tab key={index} label={tab.name} />
          ))}
        </Tabs>
        {tabs.map((tab: any, i: number) => (
          <Box
            sx={{
              marginTop: '2rem',
            }}
            key={i}
            hidden={value !== i}
          >
            {tab.component}
          </Box>
        ))}
      </div>
    </>
  );
};

TabsNotification.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      component: PropTypes.element.isRequired,
    })
  ).isRequired,
  activeTab: PropTypes.number.isRequired,
  setActiveTab: PropTypes.func.isRequired,
};

export default TabsNotification;
