import { Fragment } from "react";
import BreadCrumbs from "@components/breadcrumbs";
import { Col, Row } from "reactstrap";
import WizardModern from "./WizardModern.js";

const AddCourse = () => {
  return (
    <>
      <Fragment>
        {/* <BreadCrumbs
          title="Form Wizard"
          data={[{ title: "Form" }, { title: "Form Wizard" }]}
        /> */}
        <Row>
          <Col sm="12">
            <WizardModern />
          </Col>
        </Row>
      </Fragment>
    </>
  );
};

export default AddCourse;
