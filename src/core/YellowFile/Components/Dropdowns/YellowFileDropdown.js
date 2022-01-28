import React from 'react';

const YellowFileDropdown = ({ title, list }) => {
    
  return (
    <div class="form-group">
        <label for="category-dropdown">{ title }</label>
        <select class="form-control" id="category-dropdown">
            {list.map(choice => (
                <option>{ choice }</option>
            ))}
        </select>
    </div>
  )
}

export default YellowFileDropdown;
