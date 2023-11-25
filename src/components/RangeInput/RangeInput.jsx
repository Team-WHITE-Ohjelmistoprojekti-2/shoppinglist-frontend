import { useEffect } from 'react';
import PropTypes from 'prop-types';
import './RangeInput.css';
import * as SliderPrimitive from '@radix-ui/react-slider';

const RangeInput = (props) => {
  const localStorageKey = 'sliderValue';

  useEffect(() => {
    // Load the slider value from local storage when the component mounts
    const savedValue = localStorage.getItem(localStorageKey);
    if (savedValue) {
      // Set a default value for props.value if it's not defined
      const newValue = [parseFloat(savedValue), props.value ? props.value[1] : 0];
      props.onValueChange(newValue);
    }
  }, []);

  // Update local storage whenever the slider value changes
  const handleValueChange = (newValue) => {
    props.onValueChange(newValue);

    // Save the new slider value to local storage
    localStorage.setItem(localStorageKey, newValue[0].toString());
  };

  return (
    <SliderPrimitive.Root
      className="rootSlider"
      value={props.value}
      onValueChange={handleValueChange}
    >
      <SliderPrimitive.Track className="trackSlider">
        <SliderPrimitive.Range className="rangeSlider" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="thumbSlider" aria-label={props.label} />
    </SliderPrimitive.Root>
  );
};

export default RangeInput;

RangeInput.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.arrayOf(PropTypes.number).isRequired,
  onValueChange: PropTypes.func.isRequired,
};