import React, { Fragment } from "react";
import TaxForm from "../../components/tax-form/tax-form";
import { useParams } from "react-router-dom";
const EditTax = () => {
  let { id } = useParams();
  return (
    <Fragment>
      <TaxForm status={`edit`} id={id}></TaxForm>
    </Fragment>
  );
};

export default EditTax;
