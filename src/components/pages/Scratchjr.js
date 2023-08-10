import React from 'react';
import Sidebars from '../menu/sidebar';
const ScratchJrComponent = () => {
  return (
    <div className='w-100'>
        <Sidebars/>
        <div className='containerchat h-100'>
            <div className='margin-left-sidebar h-100'>
      <iframe
        src="https://www.scratchjr.org/"
        title="ScratchJr"
        width="100%"
        height="100%"
      ></iframe>
      </div>
    </div>
    </div>
  );
};

export default ScratchJrComponent;
