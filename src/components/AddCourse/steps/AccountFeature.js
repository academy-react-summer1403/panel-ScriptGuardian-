// ** React Imports
import { Fragment } from "react";

// ** Icons Imports
import { ArrowLeft, ArrowRight } from "react-feather";

// ** Reactstrap Imports
import { Label, Row, Col, Input, Form, Button } from "reactstrap";
import Select from "react-select";

import { selectThemeColors } from "@utils";

const AccountFeature = ({ stepper, type }) => {
  const countryOptions = [
    { value: "UK", label: "UK" },
    { value: "USA", label: "USA" },
    { value: "Spain", label: "Spain" },
    { value: "France", label: "France" },
    { value: "Italy", label: "Italy" },
    { value: "Australia", label: "Australia" },
  ];

  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0">ویژگی های دوره</h5>
        <small className="text-muted">ویژگی های دوره ی خود را وارد کنید</small>
      </div>
      <Form onSubmit={(e) => e.preventDefault()}>
        <Row>
          <Col md="6" className="mb-1">
            <Col md="6" className="mb-1">
              <Label className="form-label" for={`country-${type}`}>
                Country
              </Label>
              <Select
                theme={selectThemeColors}
                isClearable={false}
                id={`country-${type}`}
                className="react-select"
                classNamePrefix="select"
                options={countryOptions}
                defaultValue={countryOptions[0]}
              />
            </Col>
            <Label className="form-label" for={`username-${type}`}>
              Username
            </Label>
            <Input
              type="text"
              name={`username-${type}`}
              id={`username-${type}`}
              placeholder="johndoe"
            />
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for={`email-${type}`}>
              Email
            </Label>
            <Input
              type="email"
              name={`email-${type}`}
              id={`email-${type}`}
              placeholder="john.doe@email.com"
              aria-label="john.doe"
            />
          </Col>
        </Row>
        <Row>
          <div className="form-password-toggle col-md-6 mb-1">
            <Label className="form-label" for={`password-${type}`}>
              Password
            </Label>
            <Input type="password" id={`password-${type}`} />
          </div>
          <div className="form-password-toggle col-md-6 mb-1">
            <Label className="form-label" for={`confirm-password-${type}`}>
              Confirm Password
            </Label>
            <Input type="password" id={`confirm-password-${type}`} />
          </div>
        </Row>
        <div className="d-flex justify-content-between">
          <Button color="secondary" className="btn-prev" outline disabled>
            <ArrowLeft
              size={14}
              className="align-middle me-sm-25 me-0"
            ></ArrowLeft>
            <span className="align-middle d-sm-inline-block d-none">
              Previous
            </span>
          </Button>
          <Button
            color="primary"
            className="btn-next"
            onClick={() => stepper.next()}
          >
            <span className="align-middle d-sm-inline-block d-none">Next</span>
            <ArrowRight
              size={14}
              className="align-middle ms-sm-25 ms-0"
            ></ArrowRight>
          </Button>
        </div>
      </Form>
    </Fragment>
  );
};

export default AccountFeature;
