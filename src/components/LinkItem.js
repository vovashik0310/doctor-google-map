import React from "react";
import "../App.css"

const LinkItem = ({name, color, isDefaultChecked, onItemClick, onCheckboxClick}) => {
  return (
    <div
      className="sidebar-list-item"
      style={{ color: color }}
      onClick={onItemClick}
    >
      <input
        className="list-item-check"
        type="checkbox"
        onClick={onCheckboxClick}
        defaultChecked={isDefaultChecked}
      />
      {name}
    </div>
  );
};

export default LinkItem;
