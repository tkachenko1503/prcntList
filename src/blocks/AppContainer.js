import React from 'react';

const AppContainer = (props) => (
  <div>
    <button onClick={() => props.switchList(12)}>
      Test Me
    </button>
    {props.children}
  </div>
);

export default AppContainer;
