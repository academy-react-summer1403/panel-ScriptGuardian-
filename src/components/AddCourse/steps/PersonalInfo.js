// ** React Imports
import { Fragment, useEffect, useRef, useState } from "react";

// ** Third Party Components
import Select from "react-select";
import { ArrowLeft, ArrowRight } from "react-feather";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Reactstrap Imports
import { Label, Row, Col, Form, Input, Button } from "reactstrap";
import {
  convertIsoToJalali,
  convertJalaliToIso,
} from "../../../core/utils/dateUtils";
// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";

import { Calendar } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import persian_en from "react-date-object/locales/persian_en";

const PersonalInfo = ({ stepper, type, setCurrentValue, currentValue }) => {
  const handleChange = (key, value) => {
    setCurrentValue((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  //calender
  const [calendar, setCalendar] = useState(false);
  const CalenderRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (CalenderRef.current && !CalenderRef.current.contains(event.target)) {
        setCalendar(false);
      }
    };

    if (calendar) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [calendar]);

  const handelChangeData = (dateOfDatePiker) => {
    const convert = `${
      dateOfDatePiker
        ? dateOfDatePiker.convert(persian, persian_en).format()
        : ""
    }`;

    const Iso = convertJalaliToIso(convert);

    //set value
    handleChange("StartTime", Iso);
    setCalendar(false);
  };

  const [calendarEnd, setCalendarEnd] = useState(false);
  const CalenderRefEnd = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        CalenderRefEnd.current &&
        !CalenderRefEnd.current.contains(event.target)
      ) {
        setCalendarEnd(false);
      }
    };

    if (calendarEnd) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [calendarEnd]);

  const handelChangeDataOfCalenderEnd = (dateOfDatePiker) => {
    const convert = `${
      dateOfDatePiker
        ? dateOfDatePiker.convert(persian, persian_en).format()
        : ""
    }`;

    const Iso = convertJalaliToIso(convert);

    //set value
    handleChange("EndTime", Iso);
    setCalendarEnd(false);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    handleChange("ImageAddress", file);
  };
  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0"> اطلاعات اولیه</h5>
        <small>اطلاعات اولیه را کامل کنید</small>
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
              value={currentValue.Title}
              onChange={(e) => handleChange("Title", e.target.value)}
            />
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for={`first-name-${type}`}>
              قیمت دوره{" "}
            </Label>
            <Input
              type="Number"
              name="first-name"
              id={`first-name-${type}`}
              placeholder="قیمت دوره را وارد کنید"
              value={currentValue.Cost}
              onChange={(e) => handleChange("Cost", e.target.value)}
            />
          </Col>
        </Row>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for={`first-name-${type}`}>
              ظرفیت دوره{" "}
            </Label>
            <Input
              type="text"
              name="first-name"
              id={`first-name-${type}`}
              placeholder="ظرفیت دوره را وارد کنید"
              value={currentValue.Capacity}
              onChange={(e) => handleChange("Capacity", e.target.value)}
            />
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for={`first-name-${type}`}>
              تعداد جلسات دوره{" "}
            </Label>
            <Input
              type="Number"
              name="first-name"
              id={`first-name-${type}`}
              placeholder="تعداد جلسات دوره را وارد کنید"
              value={currentValue.SessionNumber}
              onChange={(e) => handleChange("SessionNumber", e.target.value)}
            />
          </Col>
        </Row>

        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for={`first-name-${type}`}>
              توضیحات کوتاه دوره{" "}
            </Label>
            <Input
              type="text"
              name="first-name"
              id={`first-name-${type}`}
              placeholder="توضیحات کوتاه دوره را وارد کنید"
              value={currentValue.miniDescribe}
              onChange={(e) => handleChange("miniDescribe", e.target.value)}
            />
          </Col>
          <Col md="3" className="mb-1">
            <Label className="form-label" for={`first-name-${type}`}>
              تاریخ شروع دوره{" "}
            </Label>
            <Input
              type="text"
              name="first-name"
              id={`first-name-${type}`}
              placeholder=" تاریخ شروع دوره را وارد کنید"
              value={
                currentValue.StartTime
                  ? convertIsoToJalali(currentValue.StartTime)
                  : ""
              }
              onChange={(e) => handleChange("StartTime", e.target.value)}
              onFocus={() => {
                setCalendar(true);
              }}
            />

            {calendar && (
              <Calendar
                ref={CalenderRef}
                // value={
                //   formik.values.birthDay &&
                //   convertIsoToJalali(formik?.values?.birthDay)
                // }
                onChange={handelChangeData}
                calendar={persian}
                locale={persian_fa}
                className="position-absolute"
              />
            )}
          </Col>
          <Col md="3" className="mb-1">
            <Label className="form-label" for={`first-name-${type}`}>
              تاریخ پایان دوره{" "}
            </Label>
            <Input
              type="text"
              name="first-name"
              id={`first-name-${type}`}
              placeholder=" تاریخ پایان دوره را وارد کنید"
              value={
                currentValue.EndTime
                  ? convertIsoToJalali(currentValue.EndTime)
                  : ""
              }
              onChange={(e) => handleChange("EndTime", e.target.value)}
              onFocus={() => {
                setCalendarEnd(true);
              }}
            />

            {calendarEnd && (
              <Calendar
                ref={CalenderRefEnd}
                // value={
                //   formik.values.birthDay &&
                //   convertIsoToJalali(formik?.values?.birthDay)
                // }
                onChange={handelChangeDataOfCalenderEnd}
                calendar={persian}
                locale={persian_fa}
                className="position-absolute"
              />
            )}
          </Col>
        </Row>

        <Row>
          <Col md="12" className="mb-1">
            <Label className="form-label" for={`first-name-${type}`}>
              توضیحات دوره{" "}
            </Label>
            <Input
              type="textarea"
              name="first-name"
              id={`first-name-${type}`}
              placeholder="توضیحات دوره را وارد کنید"
              value={currentValue.Describe}
              onChange={(e) => handleChange("Describe", e.target.value)}
            />
          </Col>
        </Row>

        <Col md="12" sm="12" className="mb-5">
          <Label className="form-label" for="inputFile">
            تصویر دوره{" "}
          </Label>
          <Input
            type="file"
            id="inputFile"
            name="fileInput"
            // onChange={(e) => handleChange("ImageAddress", e.target.value)}
            onChange={handleFileChange}
          />
        </Col>
        <div className="d-flex justify-content-between">
          <Button
            color="primary"
            className="btn-prev"
            onClick={() => stepper.previous()}
          >
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

export default PersonalInfo;
