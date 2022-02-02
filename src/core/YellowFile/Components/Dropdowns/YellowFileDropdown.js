import React, { useState } from 'react';


const YellowFileDropdown = ({ titleName, cateList, selected }) => {

    const selectedValue = (event) => {
        event.preventDefault()
        selected(event.target.value)
    }
    
  return (
    <div class="form-group">
        <label for="category-dropdown">{ titleName }</label>

        <select class="form-control" id="category-dropdown" onChange={ selectedValue }> 
            { cateList?.map(choice => (
                <option value={ choice.id }>{ choice.name }</option>
            ))}
        </select>
    </div>
  )
}

export default YellowFileDropdown;
