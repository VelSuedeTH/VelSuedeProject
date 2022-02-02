import React from 'react';

const DropdownChoice = ({id, name}) => {
  return <div>
      <option id={id}>{ name }</option>;
  </div>
}

export default DropdownChoice;
