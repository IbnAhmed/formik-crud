import React from "react";
import { Link } from "react-router-dom";
const TaxRow = ({ name, rate, id, deleteItem }) => {
  return (
    <tr className="tax-row">
      <td className="name">{name}</td>
      <td className="rate">{rate}</td>
      <td className="actions">
        <Link to={`/edit-tax/${id}`} className="btn">
          Edit
        </Link>
        <button className="btn" onClick={deleteItem}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default TaxRow;
