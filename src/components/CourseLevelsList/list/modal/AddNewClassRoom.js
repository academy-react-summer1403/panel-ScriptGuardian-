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
import Select from "react-select";
import { selectThemeColors } from "@utils";

import { useQueryClient } from "@tanstack/react-query";

import { convertIsoToJalali } from "../../../../core/utils/dateUtils";
import { useAddAssistanceWork } from "../../../../core/services/api/Admin/HandelAssistanceWork";
import { useAddClassRoom } from "../../../../core/services/api/Admin/handelClassRom";
import { useAddLevel } from "../../../../core/services/api/Admin/CourseLevelHandel";
const AddNewClassRoom = ({ setShow, show, data }) => {
  const { mutate: UpdateProfile } = useAddLevel();
  console.log(data, "this data from course details");
  const queryClient = useQueryClient();
  const formik = useFormik({
    initialValues: {
      id: "1",
      levelName: "",
    },
    enableReinitialize: true,

    onSubmit: (values) => {
      UpdateProfile(values, {
        onSuccess: (data) => {
          if (data.success == true) {
            toast.success(" سطح جدید با موفقیت  اضافه شد ");
            queryClient.invalidateQueries("GetCourseLevelList");

            setShow(false);
          } else {
            toast.error("خطا در اضافه کردن");
          }
        },
      });
    },
  });

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
            <h1 className="mb-1">افزودن سطح </h1>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <Row className="gy-1 pt-75">
              {/* title */}
              <Col md={12} xs={12}>
                <Label className="form-label" for="levelName">
                  نام سطح{" "}
                </Label>
                <Input
                  id="levelName"
                  name="levelName"
                  placeholder="نام سطح را وارد کنید"
                  {...formik?.getFieldProps("levelName")}
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

export default AddNewClassRoom;
