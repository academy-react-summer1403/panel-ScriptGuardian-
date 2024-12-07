import StateManagedSelect from "react-select";
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
import { selectThemeColors } from "@utils";
import { Check, X } from "react-feather";
import { useFormik } from "formik";
import {
  useUpdateCourse,
  useUpdateNews,
  useUpdateUser,
} from "../../../../core/services/api/Admin/handelChangeProfileUser";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useUpdateAssistanceWork } from "../../../../core/services/api/Admin/HandelAssistanceWork";
import { useEffect, useRef, useState } from "react";
import {
  convertIsoToJalali,
  convertJalaliToIso,
} from "../../../../core/utils/dateUtils";
import { Calendar } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import persian_en from "react-date-object/locales/persian_en";
const ModalCustom = ({ show, setShow, data, ID }) => {
  const queryClient = useQueryClient();

  const { mutate: UpdateProfile } = useUpdateAssistanceWork();
  console.log(data, "this data from course details");

  const formik = useFormik({
    initialValues: {
      worktitle: data?.worktitle,
      workDescribe: data?.workDescribe,
      workDate: data?.workDate,
      id: ID,//Params
      assistanceId: data?.id,
    },
    enableReinitialize: true,
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      UpdateProfile(values, {
        onSuccess: (data) => {
          if (data.success == true) {
            toast.success("ویرایش با موفقیت انجام شد");
            queryClient.invalidateQueries("GetAssistanceWorkDetails");

            setShow(false);
          } else {
            toast.error("خطا در ویرایش");
          }
        },
      });
    },
  });

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
    formik.setFieldValue("workDate", Iso);
    setCalendar(false);
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
            <h1 className="mb-1">تغییر اطلاعات دوره </h1>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <Row className="gy-1 pt-75">
              {/* title */}
              <Col md={12} xs={12}>
                <Label className="form-label" for="worktitle">
                  عنوان کار{" "}
                </Label>
                <Input
                  id="worktitle"
                  name="worktitle"
                  placeholder="عنوان کار را وارد کنید"
                  {...formik?.getFieldProps("worktitle")}
                />
              </Col>
            </Row>

            <Row className="gy-1 pt-75">
              {/* title */}
              <Col md={12} xs={12}>
                <Label className="form-label" for="workDescribe">
                  توضیحات شغل{" "}
                </Label>
                <Input
                  id="workDescribe"
                  name="workDescribe"
                  placeholder="توضیحات شغل  را وارد کنید"
                  {...formik?.getFieldProps("workDescribe")}
                />
              </Col>
            </Row>
            <Row>
              <Col sm="12" className="text-start">
                <Label htmlFor="">تاریخ شغل </Label>
                <Input
                  id="workDate"
                  type="text"
                  readOnly
                  placeholder="   تاریخ پرداخت  را وارد کنید"
                  className="text-center"
                  onFocus={() => {
                    setCalendar(true);
                  }}
                  value={
                    formik.values.workDate
                      ? convertIsoToJalali(formik.values.workDate)
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
                      top: "-38px",
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

export default ModalCustom;
