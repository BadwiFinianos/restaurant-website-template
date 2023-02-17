import React from 'react';
import PropTypes from 'prop-types';
// mui
import { Button, ButtonGroup } from '@mui/material';

CounterButton.propTypes = {
  quantity: PropTypes.number,
  setQuantity: PropTypes.func,
};

export default function CounterButton({ quantity = 0, setQuantity }) {
  const displayCounter = quantity > 0;

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    setQuantity(quantity - 1 > 0 ? quantity - 1 : 0);
  };

  return (
    <ButtonGroup style={{ margin: 4 }}>
      <Button size="small" style={{ padding: 0 }} onClick={handleIncrement}>
        +
      </Button>
      {displayCounter && (
        <Button style={{ padding: 0 }} disabled>
          {quantity}
        </Button>
      )}
      {displayCounter && (
        <Button style={{ padding: 0 }} onClick={handleDecrement}>
          -
        </Button>
      )}
    </ButtonGroup>
  );
}
