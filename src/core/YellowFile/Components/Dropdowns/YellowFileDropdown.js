import React from 'react';


const YellowFileDropdown = ({ titleName, cateList, selected, value }) => {
    // console.log(value);
    // console.log(cateList);

    const selectedValue = (event) => {
        event.preventDefault()
        selected(event.target.value)
        // console.log(event.target.value)
    }
    
  return (
    <div class="form-group">
        <label for="category-dropdown">{ titleName }</label>

        <select class="form-control" id="category-dropdown" onChange={ selectedValue } value={ value } > 
            <option value="-">-</option>
            { cateList?.map(choice => (
                <option value={ choice.id }>{ choice.name }</option>
            ))}
        </select>
    </div>
  )
}

export default YellowFileDropdown;
