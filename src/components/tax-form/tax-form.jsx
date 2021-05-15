import "./tax-form.scss";
import React, { useState, useEffect } from "react";
import categories from "./cat";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useHistory } from "react-router-dom";

const TaxForm = ({ status = "add", id }) => {
  const history = useHistory();
  id = Number(id);
  let taxs = JSON.parse(localStorage.getItem("taxs"));
  if (!taxs) {
    localStorage.setItem("taxs", JSON.stringify([]));
    taxs = [];
  }

  const [filCategories, setFilCategories] = useState([]);

  let formValues = {
    name: "",
    rate: 0,
    applied_to: "some",
    applicable_items: [],
  };

  if (status === "edit") {
    let taxResult = taxs.find((tax) => tax.id === id);
    if (taxResult) {
      taxResult.rate *= 100;
      formValues = taxResult;
    }
  }

  function searchCategory() {
    let keyword = "";
    if (document.querySelector("#searchCat")) {
      keyword = document.querySelector("#searchCat").value;
    }
    keyword = keyword.toLowerCase();
    setFilCategories(
      categories.filter((cat) => cat.name.toLowerCase().search(keyword) !== -1)
    );
  }
  useEffect(() => {
    searchCategory();
  }, []);

  return (
    <div>
      <Formik
        initialValues={formValues}
        validate={(values) => {
          const errors = {};
          if (!values.name) {
            errors.name = "Required";
          }

          if (values.rate === "") {
            errors.rate = "Required";
          } else if (values.rate < 0) {
            errors.rate = "Negative value not acceptable!";
          }

          if (!values.applied_to) {
            errors.applied_to = "Required";
          } else {
            // if(values.applied_to === "all"){
            //   document.querySelectorAll('[name="applicable_items"]').forEach(cat => {
            //       cat.checked=true
            //   })
            //   values.applicable_items = filCategories.map(c => c.id).map(String);
            // } else {
            //   document.querySelectorAll('[name="applicable_items"]').forEach(cat => {
            //       cat.checked=false
            //   })
            //   values.applicable_items = [];
            // }
          }

          if (values.applicable_items.length === 0) {
            errors.applicable_items = "Select atleast one!";
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          // alert(JSON.stringify(values, null, 2));
          id = id ? id : taxs.length + 1;

          let tax = {
            id: id,
            name: values.name,
            rate: values.rate / 100,
            applied_to: values.applied_to,
            applicable_items: values.applicable_items,
          };

          taxs = taxs.filter((taxItem) => taxItem.id !== id);

          taxs.push(tax);

          taxs = taxs.sort((a, b) => a.id - b.id);

          localStorage.setItem("taxs", JSON.stringify(taxs));

          alert("Saved successfully!");

          history.push("/");

          setSubmitting(false);
        }}
      >
        {({ isSubmitting, setFieldValue, handleChange }) => (
          <Form>
            <fieldset>
              <legend>
                <span style={{ textTransform: "capitalize" }}>{status}</span>{" "}
                Tax
              </legend>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <Field type="text" name="name" id="name" placeholder="Name" />
                <ErrorMessage name="name" component="div" className="error" />
              </div>

              <div className="form-group">
                <label htmlFor="rate">Rate (%)</label>

                <Field type="number" name="rate" id="rate" placeholder="Rate" />
                <ErrorMessage name="rate" component="div" className="error" />
              </div>
              <div className="form-group">
                <label>
                  <Field
                    type="radio"
                    name="applied_to"
                    value="all"
                    onChange={(event) => {
                      handleChange(event);
                      setFieldValue(
                        "applicable_items",
                        filCategories.map((c) => c.id).map(String)
                      );
                    }}
                  />{" "}
                  Apply to all items in collection
                </label>
                <label>
                  <Field
                    type="radio"
                    name="applied_to"
                    value="some"
                    onChange={(event) => {
                      handleChange(event);
                      setFieldValue("applicable_items", []);
                    }}
                  />
                  Apply specific items
                </label>
                <ErrorMessage
                  name="applied_to"
                  component="div"
                  className="error"
                />
              </div>
              <hr />
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Search Category"
                  id="searchCat"
                  onChange={searchCategory}
                  autoComplete="nope"
                />
              </div>
              <div className="form-group">
                {filCategories.map(({ id, name }) => {
                  return (
                    <label htmlFor={"cat" + id} key={id}>
                      <Field
                        type="checkbox"
                        name="applicable_items"
                        value={"" + id}
                        id={"cat" + id}
                      />
                      {name}
                    </label>
                  );
                })}
                <ErrorMessage
                  name="applicable_items"
                  component="div"
                  className="error"
                />
              </div>

              <div className="form-group">
                <button type="submit" disabled={isSubmitting}>
                  {status === "add" ? "Add" : "Update"}
                </button>
              </div>
            </fieldset>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default TaxForm;
