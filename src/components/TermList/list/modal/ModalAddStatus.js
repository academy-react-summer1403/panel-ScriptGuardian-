import { useFormik } from "formik";
import {
  Button,
  Col,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import { useGetBuildingList } from "../../../../core/services/api/Admin/handelBulding";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import Select from "react-select";
import { selectThemeColors } from "@utils";
import { useAddTech } from "../../../../core/services/api/Admin/TechnologyHandel";
import { useGetDepartList } from "../../../../core/services/api/Admin/Departmenthandel";
import { useEffect, useRef, useState } from "react";
import {
  convertIsoToJalali,
  convertJalaliToIso,
} from "../../../../core/utils/dateUtils";
import { Calendar } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import persian_en from "react-date-object/locales/persian_en";
import { useAddTerm } from "../../../../core/services/api/Admin/TermHandel";
const ModalAddStatus = ({ setShow, show, data }) => {
  //AddTerm
  const { mutate: UpdateProfile } = useAddTerm();

  const { data: Builds } = useGetDepartList();

  const options =
    Builds &&
    Builds?.map((item) => ({
      value: item?.id,
      label: item?.depName,
    }));

  const queryClient = useQueryClient();
  const formik = useFormik({
    initialValues: {
      id: "1",
      termName: "",
      departmentId: options?.[0]?.value || "",
      startDate: "",
      endDate: "",
    },
    enableReinitialize: true,

    onSubmit: (values) => {
      UpdateProfile(values, {
        onSuccess: (data) => {
          if (data.success == true) {
            toast.success(" با موفقیت  اضافه شد");
            queryClient.invalidateQueries("GetTermList");
            formik.resetForm();
            setShow(false);
          } else {
            toast.error("خطا در اضافه کردن");
          }
        },
      });
    },
  });

  //calender
  const [calendar, setCalendar] = useState(false);
  const [calendar2, setCalendar2] = useState(false);
  const CalenderRef = useRef(null);
  const CalenderRef2 = useRef(null);

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

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        CalenderRef2.current &&
        !CalenderRef2.current.contains(event.target)
      ) {
        setCalendar2(false);
      }
    };

    if (calendar2) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [calendar2]);

  const handelChangeData = (dateOfDatePiker) => {
    const convert = `${
      dateOfDatePiker
        ? dateOfDatePiker.convert(persian, persian_en).format()
        : ""
    }`;

    const Iso = convertJalaliToIso(convert);

    //set value
    formik.setFieldValue("startDate", Iso);
    setCalendar(false);
  };

  const handelChangeData2 = (dateOfDatePiker2) => {
    const convert = `${
      dateOfDatePiker2
        ? dateOfDatePiker2.convert(persian, persian_en).format()
        : ""
    }`;

    const Iso = convertJalaliToIso(convert);

    //set value
    formik.setFieldValue("endDate", Iso);
    setCalendar2(false);
  };

  return (
    <>
      <Modal
        isOpen={show}
        toggle={() => setShow(!show)}
        className="modal-dialog-centered modal-sm"
      >
        <ModalHeader
          className="bg-transparent"
          toggle={() => setShow(!show)}
        ></ModalHeader>
        <ModalBody className="px-sm-5 pt-50 pb-5">
          <div className="text-center mb-2">
            <h1 className="mb-1">افزودن ترم </h1>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <Row className="gy-1 pt-75">
              <Col md={12} xs={12}>
                <Label className="form-label" for="termName">
                  نام ترم{" "}
                </Label>
                <Input
                  id="termName"
                  name="termName"
                  placeholder="نام ترم را وارد کنید"
                  {...formik?.getFieldProps("termName")}
                />
              </Col>
            </Row>

            <Row className="gy-1 pt-75">
              {/* title */}
              <Col md={12} xs={12}>
                <Label className="form-label" for="capacity">
                  دپارتمان برگزاری{" "}
                </Label>
                <Select
                  id="departmentId"
                  isClearable={false}
                  className="react-select"
                  classNamePrefix="select"
                  options={options}
                  theme={selectThemeColors}
                  value={
                    options &&
                    options?.find(
                      (option) => option.value === formik.values.departmentId
                    )
                  }
                  onChange={(data) => {
                    formik.setFieldValue("departmentId", data?.value || "");
                  }}
                />
              </Col>
            </Row>

            <Row>
              <Col sm="12" className="text-start">
                <Label htmlFor="">تاریخ شروع </Label>
                <Input
                  id="startDate"
                  type="text"
                  readOnly
                  placeholder="   تاریخ شروع  را وارد کنید"
                  className="text-center"
                  onFocus={() => {
                    setCalendar(true);
                  }}
                  value={
                    formik.values.startDate
                      ? convertIsoToJalali(formik.values.startDate)
                      : ""
                  }
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
                    style={{
                      top: "0",
                      left: "50%",
                      transform: "translateX(-50%)",
                    }}
                  />
                )}
              </Col>
            </Row>

            <Row>
              <Col sm="12" className="text-start">
                <Label htmlFor="">تاریخ پایان </Label>
                <Input
                  id="endDate"
                  type="text"
                  readOnly
                  placeholder="   تاریخ پایان  را وارد کنید"
                  className="text-center"
                  onFocus={() => {
                    setCalendar2(true);
                  }}
                  value={
                    formik.values.endDate
                      ? convertIsoToJalali(formik.values.endDate)
                      : ""
                  }
                />

                {calendar2 && (
                  <Calendar
                    ref={CalenderRef2}
                    onChange={handelChangeData2}
                    calendar={persian}
                    locale={persian_fa}
                    className="position-absolute"
                    style={{
                      top: "0",
                      left: "50%",
                      transform: "translateX(-50%)",
                    }}
                  />
                )}
              </Col>
            </Row>

            <Row>
              <Col xs={12} className="text-center mt-2 pt-50">
                <Button type="submit" className="me-1" color="primary">
                  ارسال
                </Button>
              </Col>
            </Row>
          </form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default ModalAddStatus;
