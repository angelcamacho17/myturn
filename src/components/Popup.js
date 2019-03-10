import React from "react";
import Popup from "reactjs-popup";

export default () => (
  <Popup trigger={<button>Trigger</button>} position="top left">
    {close => (
      <div>
        Content here
        <button className="close" onClick={close}>
          &times;
        </button>
      </div>
    )}
  </Popup>
);