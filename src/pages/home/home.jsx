import "./home.scss";
import React, { Fragment, useState, useEffect } from "react";
import TaxRow from "../../components/tax-row/tax-row";
import { Link } from "react-router-dom";
const Home = () => {
  const [taxs, setTexs] = useState([]);

  useEffect(() => {
    let taxItems = JSON.parse(localStorage.getItem("taxs"));
    if (!taxItems) {
      localStorage.setItem("taxs", JSON.stringify([]));
      taxItems = [];
    }
    setTexs(taxItems);
  }, []);

  function deleteItem(id){
    let taxItems = JSON.parse(localStorage.getItem("taxs"));
    
    if(window.confirm("Are you sure to delete this item?")){
      taxItems = taxItems.filter(tax => tax.id !== id);
      localStorage.setItem("taxs", JSON.stringify(taxItems));
      setTexs(taxItems);
    }
  }
  return (
    <Fragment>
      <div className="main-layout">
        <div>
          <h2 className="text-center">Tax Data</h2>
          <div className="text-right">
            <Link to={`/add-tax`} className={`btn`}>
              Add
            </Link>
          </div>
          <table className="tax-fields">
            <thead>
              <tr>
                <th>Name</th>
                <th>Rate</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {taxs.map(({name, rate, id}) => {
                return <TaxRow key={id} id={id} name={name} rate={rate} deleteItem={() => {
                  deleteItem(id)
                }}></TaxRow>;
              })}
              {(() => {
                if (taxs.length === 0) {
                  return (
                    <tr>
                      <td colSpan="3">No item</td>
                    </tr>
                  );
                }
              })()}
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
