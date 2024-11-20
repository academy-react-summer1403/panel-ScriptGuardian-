// ** React Imports
import { Fragment } from "react";

// ** Third Party Components
import Select from "react-select";
import { ArrowLeft, ArrowRight } from "react-feather";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Reactstrap Imports
import { Label, Row, Col, Form, Input, Button } from "reactstrap";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";

const PersonalInfo = ({ stepper, type }) => {
  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0"> توضیحات کامل</h5>
        <small>توضیحات را کامل کنید</small>
      </div>
      <Form onSubmit={(e) => e.preventDefault()}>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for={`first-name-${type}`}>
              عنوان دوره{" "}
            </Label>
            <Input
              type="text"
              name="first-name"
              id={`first-name-${type}`}
              placeholder="عنوان دوره را وارد کنید"
            />
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for={`last-name-${type}`}>
              Last Name
            </Label>
            <Input
              type="text"
              name="last-name"
              id={`last-name-${type}`}
              placeholder="Doe"
            />
          </Col>
        </Row>
      </Form>
    </Fragment>
  );
};

export default PersonalInfo;
