// ** React Imports
import { Fragment, useState } from "react";

// ** Icons Imports
import { ArrowLeft, ArrowRight } from "react-feather";

// ** Reactstrap Imports
import { Label, Row, Col, Input, Form, Button } from "reactstrap";
import Select from "react-select";

import { selectThemeColors } from "@utils";
import { current } from "@reduxjs/toolkit";
import * as yup from "yup";

const AccountFeature = ({ stepper, type, data, setCurrentValue }) => {
  //1
  const courseTypeDtos =
    (data &&
      data?.courseTypeDtos?.map((item) => ({
        value: item.id,
        label: item.typeName,
      }))) ||
    [];
  //2
  const courseLevelDtos =
    (data &&
      data?.courseLevelDtos?.map((item) => ({
        value: item.id,
        label: item.levelName,
      }))) ||
    [];
  //3
  const statusDtos =
    (data &&
      data?.statusDtos?.map((item) => ({
        value: item.id,
        label: item.statusName,
      }))) ||
    [];
  //4
  const classRoomDtos =
    (data &&
      data?.classRoomDtos?.map((item) => ({
        value: item.id,
        label: item.classRoomName,
      }))) ||
    [];
  //5
  const teachers =
    (data &&
      data?.teachers?.map((item) => ({
        value: item.teacherId,
        label: item.fullName,
      }))) ||
    [];
  //6
  const termDtos =
    (data &&
      data?.termDtos?.map((item) => ({
        value: item.id,
        label: item.termName,
      }))) ||
    [];
  //7
  // const technologyDtos =
  //   (data &&
  //     data?.technologyDtos?.map((item) => ({
  //       value: item.id,
  //       label: item.techName,
  //     }))) ||
  //   [];

  const handleChange = (key, data) => {
    setCurrentValue((prev) => ({
      ...prev,
      [key]: data,
    }));
  };

  //handel validation

  const validationSchema = yup.object().shape({
    currentCourseType: yup
      .object()
      .nullable()
      .required("لطفاً نوع دوره را انتخاب کنید."),
    currentCourseLevel: yup
      .object()
      .nullable()
      .required("لطفاً سطح دوره را انتخاب کنید."),
  });
  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0">ویژگی های دوره</h5>
        <small className="text-muted">ویژگی های دوره ی خود را وارد کنید</small>
      </div>
      <Form onSubmit={(e) => e.preventDefault()}>
        <Row className="">
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
              onChange={(data) => handleChange("currentCourseType", data)}
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
              onChange={(data) => handleChange("currentCourseLevelDtos", data)}
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
              onChange={(data) => handleChange("currentStatusDtos", data)}
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
              onChange={(data) => handleChange("currentClassRoomDtos", data)}
            />
          </Col>
        </Row>

        <Row className="mb-5">
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
              onChange={(data) => handleChange("currentTeachers", data)}
            />
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for={`country-${type}`}>
              ترم دوره{" "}
            </Label>
            <Select
              onChange={(data) => handleChange("currentTermDtos", data)}
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

        {/* <Row>
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
              onChange={(data) => handleChange("currentTechnologyDtos", data)}
            />
          </Col>
        </Row> */}

        {/* <Row></Row> */}
        <div className="d-flex justify-content-between">
          <Button color="secondary" className="btn-prev" outline disabled>
            <ArrowLeft
              size={14}
              className="align-middle me-sm-25 me-0"
            ></ArrowLeft>
            <span className="align-middle d-sm-inline-block d-none">قبلی</span>
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
