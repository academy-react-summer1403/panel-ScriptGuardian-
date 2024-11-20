// ** React Imports
import { Fragment } from "react";

// ** Icons Imports
import { ArrowLeft, ArrowRight } from "react-feather";

// ** Reactstrap Imports
import { Label, Row, Col, Input, Form, Button } from "reactstrap";
import Select from "react-select";

import { selectThemeColors } from "@utils";

const AccountFeature = ({ stepper, type, data }) => {
  const courseTypeDtos =
    (data &&
      data?.courseTypeDtos?.map((item) => ({
        value: item.id,
        label: item.typeName,
      }))) ||
    [];

  const courseLevelDtos =
    (data &&
      data?.courseLevelDtos?.map((item) => ({
        value: item.id,
        label: item.levelName,
      }))) ||
    [];

  const statusDtos =
    (data &&
      data?.statusDtos?.map((item) => ({
        value: item.id,
        label: item.statusName,
      }))) ||
    [];

  const classRoomDtos =
    (data &&
      data?.classRoomDtos?.map((item) => ({
        value: item.id,
        label: item.classRoomName,
      }))) ||
    [];

  const teachers =
    (data &&
      data?.teachers?.map((item) => ({
        value: item.teacherId,
        label: item.fullName,
      }))) ||
    [];

  const termDtos =
    (data &&
      data?.termDtos?.map((item) => ({
        value: item.id,
        label: item.termName,
      }))) ||
    [];

  const technologyDtos =
    (data &&
      data?.technologyDtos?.map((item) => ({
        value: item.id,
        label: item.techName,
      }))) ||
    [];
  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0">ویژگی های دوره</h5>
        <small className="text-muted">ویژگی های دوره ی خود را وارد کنید</small>
      </div>
      <Form onSubmit={(e) => e.preventDefault()}>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for={`country-${type}`}>
              نوع دوره
            </Label>
            <Select
              theme={selectThemeColors}
              isClearable={false}
              id={`country-${type}`}
              className="react-select"
              classNamePrefix="select"
              options={courseTypeDtos}
              defaultValue={courseTypeDtos[0]}
            />
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for={`country-${type}`}>
              سطح دوره{" "}
            </Label>
            <Select
              theme={selectThemeColors}
              isClearable={false}
              id={`country-${type}`}
              className="react-select"
              classNamePrefix="select"
              options={courseLevelDtos}
              defaultValue={courseLevelDtos[0]}
            />
          </Col>
        </Row>

        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for={`country-${type}`}>
              وضعیت دوره{" "}
            </Label>
            <Select
              theme={selectThemeColors}
              isClearable={false}
              id={`country-${type}`}
              className="react-select"
              classNamePrefix="select"
              options={statusDtos}
              defaultValue={statusDtos[0]}
            />
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for={`country-${type}`}>
              کلاس دوره{" "}
            </Label>
            <Select
              theme={selectThemeColors}
              isClearable={false}
              id={`country-${type}`}
              className="react-select"
              classNamePrefix="select"
              options={classRoomDtos}
              defaultValue={classRoomDtos[0]}
            />
          </Col>
        </Row>

        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for={`country-${type}`}>
              معلم دوره{" "}
            </Label>
            <Select
              theme={selectThemeColors}
              isClearable={false}
              id={`country-${type}`}
              className="react-select"
              classNamePrefix="select"
              options={teachers}
              defaultValue={teachers[0]}
            />
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for={`country-${type}`}>
              ترم دوره{" "}
            </Label>
            <Select
              theme={selectThemeColors}
              isClearable={false}
              id={`country-${type}`}
              className="react-select"
              classNamePrefix="select"
              options={termDtos}
              defaultValue={termDtos[0]}
            />
          </Col>
        </Row>

        <Row>
          <Col md="12" className="mb-1">
            <Label className="form-label" for={`country-${type}`}>
              درس دوره{" "}
            </Label>
            <Select
              theme={selectThemeColors}
              isClearable={false}
              id={`country-${type}`}
              className="react-select"
              classNamePrefix="select"
              options={technologyDtos}
              defaultValue={technologyDtos[0]}
            />
          </Col>
        </Row>

        <Row></Row>
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
            <span className="align-middle d-sm-inline-block d-none">بعدی</span>
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
