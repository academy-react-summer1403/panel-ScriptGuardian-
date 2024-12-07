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
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import {
  convertIsoToJalali,
  convertJalaliToIso,
} from "../../../core/utils/dateUtils";
import { Calendar } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import persian_en from "react-date-object/locales/persian_en";
import { useAddAssistanceWork } from "../../../core/services/api/Admin/HandelAssistanceWork";
import { useAddBuilding } from "../../../core/services/api/Admin/handelBulding";
import CustomMap from "../../common/CustomMap";
const AddNewBuild = ({ setShow, show, data }) => {
  //handel options
  // const [markerPosition, setMarkerPosition] = useState({
  //   initialLongitude: 53.06319236755372,
  //   initialLatitude: 36.559284394359835,
  // });

  const [markerPosition, setMarkerPosition] = useState({
    initialLongitude: 53.060789,
    initialLatitude: 36.564139,
  });

  // useEffect(() => {
  //   if (data?.latitude && data?.longitude) {
  //     setMarkerPosition({
  //       initialLongitude: parseFloat(data.longitude),
  //       initialLatitude: parseFloat(data.latitude),
  //     });
  //   }
  // }, [data]);
  //
  const { mutate: UpdateProfile } = useAddBuilding();
  console.log(data, "this data from course details");
  const queryClient = useQueryClient();
  const formik = useFormik({
    initialValues: {
      id: "1",
      buildingName: "",
      workDate: "",
      floor: "",
      latitude: "36.564139",
      longitude: " 53.060789",
    },
    enableReinitialize: true,

    onSubmit: (values) => {
      UpdateProfile(values, {
        onSuccess: (data) => {
          if (data.success == true) {
            toast.success(" با موفقیت  اضافه شد");
            queryClient.invalidateQueries("GetAssistanceWorkList");

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
            <h1 className="mb-1">افزودن ساختمان </h1>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <Row className="gy-1 pt-75">
              {/* title */}
              <Col md={12} xs={12}>
                <Label className="form-label" for="buildingName">
                  عنوان ساختمان{" "}
                </Label>
                <Input
                  id="buildingName"
                  name="buildingName"
                  placeholder="نام ساختمان را وارد کنید"
                  {...formik?.getFieldProps("buildingName")}
                />
              </Col>
            </Row>

            <Row className="gy-1 pt-75">
              {/* title */}
              <Col md={12} xs={12}>
                <Label className="form-label" for="floor">
                  تعداد طبقه{" "}
                </Label>
                <Input
                  id="floor"
                  type="number"
                  name="floor"
                  placeholder="   تعداد طبقه ساختمان  را وارد کنید"
                  {...formik?.getFieldProps("floor")}
                />
              </Col>
            </Row>

            <Row>
              <Col sm="12" className="text-start">
                <Label htmlFor="">تاریخ ساخت </Label>
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
                      top: "0",
                      left: "50%",
                      transform: "translateX(-50%)",
                    }}
                  />
                )}
              </Col>
            </Row>

            {/* <Row className="gy-1 pt-75">
              <Col xs={12}>
                <Label className="form-label" for="floor">
                  مکان ساختمان{" "}
                </Label>
                <CustomMap
                  markerPosition={markerPosition}
                  setMarkerPosition={setMarkerPosition}
                />
              </Col>
            </Row> */}

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

export default AddNewBuild;
