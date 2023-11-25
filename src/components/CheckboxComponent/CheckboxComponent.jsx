import React, { useEffect } from 'react';
import * as Checkbox from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';
import './checkbox.css';

const CheckboxComponent = ({ id }) => {
  const localStorageKey = `checkbox_${id}`;
  const initiallyChecked = localStorage.getItem(localStorageKey) === 'true';

  useEffect(() => {
    // Clean up local storage on component unmount
    return () => {
      localStorage.removeItem(localStorageKey);
    };
  }, [localStorageKey]);

  return (
    <form>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Checkbox.Root
          className="CheckboxRoot"
          defaultChecked={initiallyChecked}
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

export default CheckboxComponent;
