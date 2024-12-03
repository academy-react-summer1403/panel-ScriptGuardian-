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
import {
  useGetBuildingList,
  useUpdateBuilding,
} from "../../../../core/services/api/Admin/handelBulding";
import { toast } from "react-toastify";
import Select from "react-select";
import { selectThemeColors } from "@utils";
import { useUpdateClassRoom } from "../../../../core/services/api/Admin/handelClassRom";
import { useQueryClient } from "@tanstack/react-query";
const ModalEditClass = ({ setShow, show, data }) => {
  const { mutate: UpdateProfile } = useUpdateClassRoom();
  console.log(data, "this data from course details");
  const queryClient = useQueryClient();
  const formik = useFormik({
    initialValues: {
      id: data?.id,
      classRoomName: data?.classRoomName,
      capacity: data?.capacity,
      buildingId: data?.buildingId,
    },
    enableReinitialize: true,
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      UpdateProfile(values, {
        onSuccess: (data) => {
          if (data.success == true) {
            toast.success("ویرایش با موفقیت انجام شد");
            queryClient.invalidateQueries("GetClassRoomList");

            setShow(false);
          } else {
            toast.error("خطا در ویرایش");
          }
        },
      });
    },
  });

  //handel options
  const { data: Builds } = useGetBuildingList();

  const options =
    Builds &&
    Builds?.map((item) => ({
      value: item?.id,
      label: item?.buildingName,
    }));

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
            <h1 className="mb-1">تغییر اطلاعات کلاس </h1>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <Row className="gy-1 pt-75">
              {/* title */}
              <Col md={12} xs={12}>
                <Label className="form-label" for="classRoomName">
                  نام کلاس{" "}
                </Label>
                <Input
                  id="classRoomName"
                  name="classRoomName"
                  placeholder="نام کلاس   را وارد کنید"
                  {...formik?.getFieldProps("classRoomName")}
                />
              </Col>
            </Row>

            <Row className="gy-1 pt-75">
              {/* title */}
              <Col md={12} xs={12}>
                <Label className="form-label" for="capacity">
                  ظرفیت{" "}
                </Label>
                <Input
                  id="capacity"
                  name="capacity"
                  placeholder=" تعداد طبقه ساختمان  را وارد کنید"
                  {...formik?.getFieldProps("capacity")}
                />
              </Col>
            </Row>

            <Row className="gy-1 pt-75">
              {/* title */}
              <Col md={12} xs={12}>
                <Label className="form-label" for="capacity">
                  ساختمان برگزاری{" "}
                </Label>
                <Select
                  id="buildingId"
                  isClearable={false}
                  className="react-select"
                  classNamePrefix="select"
                  options={options}
                  theme={selectThemeColors}
                  value={
                    options &&
                    options?.find(
                      (option) => option.value === formik.values.buildingId
                    )
                  }
                  onChange={(data) => {
                    formik.setFieldValue("buildingId", data?.value || "");
                  }}
                />
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

export default ModalEditClass;
