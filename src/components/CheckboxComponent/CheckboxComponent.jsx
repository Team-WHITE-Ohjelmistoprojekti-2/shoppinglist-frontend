import { useState } from "react";
import * as Checkbox from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';
import './checkbox.css';
import PropTypes from "prop-types";



const CheckboxComponent = ({ id }) => {
  const localStorageKey = `checkbox_${id}`;
  const storedValue = localStorage.getItem(localStorageKey);
  const [isChecked, setIsChecked] = useState(storedValue ? JSON.parse(storedValue) : false);

  const handleChange = () => {
    const newChecked = !isChecked;
    console.log(newChecked)
    setIsChecked(newChecked);
    localStorage.setItem(localStorageKey, JSON.stringify(newChecked));
  };

 /*  useEffect(() => {
   console.log(`Checkbox ${id} - Checked: ${isChecked}`);
 
    // Clean up local storage on component unmount
    return () => {
/*       localStorage.removeItem(localStorageKey);
 */    
/*   }, [isChecked, localStorageKey]);
 */ 
  return (
    <form>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Checkbox.Root
          className="CheckboxRoot"
          checked={isChecked}
          onCheckedChange={handleChange}
          id={`c${id}`}
        >
          <Checkbox.Indicator className="CheckboxIndicator">
            <CheckIcon />
          </Checkbox.Indicator>
        </Checkbox.Root>
      </div>
    </form>
  );
};


CheckboxComponent.propTypes = {
  id: PropTypes.bool.isRequired,
}
export default CheckboxComponent;
