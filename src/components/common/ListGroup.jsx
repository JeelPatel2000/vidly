import React from "react";

const ListGroup = (props) => {
  const {
    list,
    valueProperty,
    textProperty,
    onItemSelect,
    selectedItem,
  } = props;

  //   return null;
  return (
    <ul className="list-group">
      {list.map((item) => (
        <li
          key={item[valueProperty]}
          className={
            selectedItem === item ? "list-group-item active" : "list-group-item"
          }
          onClick={() => onItemSelect(item)}
          style={{ cursor: "pointer" }}
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default ListGroup;
