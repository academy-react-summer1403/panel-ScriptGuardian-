import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
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
import {
  convertIsoToJalali,
  convertJalaliToIso,
} from "../../../../core/utils/dateUtils";
// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";

import { Calendar } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import persian_en from "react-date-object/locales/persian_en";
import { useQueryClient } from "@tanstack/react-query";
import { useAddPaymentAdminForUserStepOne } from "../../../../core/services/api/Admin/payment/handelAddPayMentAdmin";
import { useFormik } from "formik";
import { toast } from "react-toastify";

const ModalForBuying = ({ isOpen, toggleShow, courseId, setShowBuyCourse }) => {
  const { id } = useParams();

  //API

  const queryClient = useQueryClient();

  const {
    data,
    mutate: StepOne,
    isPending,
  } = useAddPaymentAdminForUserStepOne();
  const formik = useFormik({
    initialValues: {
      CourseId: courseId,
      StudentId: id,
      PeymentDate: "2024/04/12",
      Paid: "",
      PaymentInvoiceNumber: "",
    },
    enableReinitialize: true,
    onSubmit: (data) => {
      const formData = new FormData();
      for (const key in data) {
        formData.append(key, data[key]);
      }

      StepOne(formData, {
        onSuccess: (data) => {
          if (data.success === true) {
            toast.success(data.message);
            // setPaymentId(data.id);
            queryClient.invalidateQueries("GetAllUsersDetailsAdmin");
            setShowBuyCourse(false);
          } else {
            // toast.error(data.ErrorMessage?.[0]);
            // toast.error(data.ErrorMessage);
            toast.error("دانشجو پرداخت تایید نشده دارد");
            console.log(!!data, "this log of data");
            setShowBuyCourse(false);
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
    formik.setFieldValue("PeymentDate", Iso);
    setCalendar(false);
  };
  return (
    <Modal
      isOpen={isOpen}
      toggle={() => {
        setShowBuyCourse(false);
      }}
      className="modal-dialog-centered modal-sm"
    >
      <ModalHeader
        toggle={() => {
          setShowBuyCourse(false);
        }}
        className="bg-primary text-white"
      >
        <h5 className="modal-title text-white">جزئیات پرداخت</h5>
      </ModalHeader>
      <ModalBody className="text-center py-4">
        <form onSubmit={formik.handleSubmit}>
          <Row className="mb-4 justify-content-center">
            <Col sm="12" className="mb-3 ">
              <h2 htmlFor="paymentInfo" className="fw-bold">
                اطلاعات پرداخت
              </h2>
            </Col>
            <Col sm="10" className="text-start">
              <Label htmlFor="">مقدار پرداخت شده را وارد کنید</Label>
              <Input
                id="Paid"
                type="number"
                placeholder="مقدار پرداخت شده"
                className="text-center"
                {...formik.getFieldProps("Paid")}
              />
            </Col>

            <Col sm="10" className="text-start">
              <Label htmlFor="">شماره فاکتور </Label>
              <Input
                id="PaymentInvoiceNumber"
                type="number"
                placeholder="شماره فاکتور پرداخت را وارد کنید"
                className="text-center"
                {...formik.getFieldProps("PaymentInvoiceNumber")}
              />
            </Col>

            <Col sm="10" className="text-start">
              <Label htmlFor="">تاریخ پرداخت </Label>
              <Input
                id="PeymentDate"
                type="text"
                readOnly
                placeholder="   تاریخ پرداخت  را وارد کنید"
                className="text-center"
                onFocus={() => {
                  setCalendar(true);
                }}
                value={
                  formik.values.PeymentDate
                    ? convertIsoToJalali(formik.values.PeymentDate)
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
                />
              )}
            </Col>
          </Row>
          <div className="d-flex justify-content-center">
            <Button type="submit" color="primary" className="px-5 py-2">
              ارسال فیش
            </Button>
          </div>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default ModalForBuying;
