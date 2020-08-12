import React from "react";

const ListGroup = (props) => {
  const { list, selectedItem, onClick } = props;

  //   return null;
  return (
    <ul className="list-group">
      {list.map((item) => (
        <li
          key={item}
          className={
            selectedItem === item ? "list-group-item active" : "list-group-item"
          }
          onClick={() => onClick(item)}
          style={{ cursor: "pointer" }}
        >
          {item}
        </li>
      ))}
    </ul>
  );
};

export default ListGroup;
