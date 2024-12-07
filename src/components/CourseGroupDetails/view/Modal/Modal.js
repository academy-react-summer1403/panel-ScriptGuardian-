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
  useUpdateUser,
} from "../../../../core/services/api/Admin/handelChangeProfileUser";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useCreateCourseStepOne } from "../../../../core/services/api/Admin/handelAddCourse";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEditCourseGroup } from "../../../../core/services/api/Admin/handelUsers";

const ModalCustom = ({ show, setShow, data }) => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const { mutate: edit } = useEditCourseGroup();
  const formik = useFormik({
    initialValues: {
      Id: id,
      GroupName: data?.groupName,
      CourseId: data?.courseId,
      GroupCapacity: data?.groupCapacity,
    },
    enableReinitialize: true,

    onSubmit: (values) => {
      const formData = new FormData();
      for (const key in values) {
        formData.append(key, values[key]);
      }
      edit(formData, {
        onSuccess: (data) => {
          if (data.success == true) {
            toast.success("گروه با موفقیت ویرایش شد");
            setShow(false);
            queryClient.invalidateQueries("GetAllCourseGroupDetails");
          } else {
            toast.error("خطا در ویرایش گروه دوره نامعبتر میباشد ");
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
            <h1 className="mb-1">تغییر اطلاعات گروه </h1>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <Row>
              <Col xs={12} className="text-center mt-2 pt-50">
                <Label>نام گروه</Label>
                <Input
                  type=""
                  placeholder="نام گروه را وارد کنید"
                  {...formik?.getFieldProps("GroupName")}
                />
              </Col>

              <Col xs={12} className="text-center mt-2 pt-50">
                <Label>ظرفیت گروه</Label>
                <Input
                  type=""
                  placeholder="ظرفیت  گروه را وارد کنید"
                  {...formik?.getFieldProps("GroupCapacity")}
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

export default ModalCustom;
