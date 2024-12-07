// ** React Imports
import { Fragment, useState } from "react";

// ** Reactstrap Imports
import {
  Modal,
  ModalBody,
  ModalHeader,
  Button,
  Input,
  Label,
  Row,
  Col,
} from "reactstrap";
import { convertIsoToJalali } from "../../../../core/utils/dateUtils";
import {
  useAcceptUserPayment,
  useDeleteUserPayment,
} from "../../../../core/services/api/Admin/handelUsers";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { useAddPaymentAdminForUserStepTwo } from "../../../../core/services/api/Admin/payment/handelAddPayMentAdmin";

const AddFishModalInUser = ({
  isOpenModal,
  toggleAcceptModal,
  id,
  isPending,
}) => {
  const queryClient = useQueryClient();

  const {
    data,
    mutate: StepTwo,
    isPending: pend,
  } = useAddPaymentAdminForUserStepTwo();
  const formik = useFormik({
    initialValues: {
      PaymentId: id,
      Image: "",
    },
    enableReinitialize: true,
    onSubmit: (data) => {
      const formData = new FormData();
      for (const key in data) {
        formData.append(key, data[key]);
      }

      StepTwo(formData, {
        onSuccess: (data) => {
          if (data.success === true) {
            toast.success(data.message);
            queryClient.invalidateQueries(
              "MyPaymentCourses",
              "GetAllListUsersPayment"
            );
            toggleAcceptModal();
          } else {
            toast.error("خطا در بارگزاری");
          }
        },
      });
    },
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    formik.setFieldValue("Image", file);
  };

  return (
    <Modal
      isOpen={isOpenModal}
      toggle={toggleAcceptModal}
      className="modal-dialog-centered modal-sm"
    >
      <ModalHeader toggle={toggleAcceptModal} className="bg-primary text-white">
        <h5 className="modal-title text-white">آپلود فیش پرداخت </h5>
      </ModalHeader>
      <ModalBody className="text-center py-4">
        <form onSubmit={formik.handleSubmit}>
          <Row className="mb-3">
            <Col sm="12">
              <Label htmlFor="" className="text-capitalize fw-bold">
                لطفا فیش پرداختی را وارد کنید
              </Label>
            </Col>
            <Col sm="12">
              <Input
                type="file"
                onChange={handleFileChange}
                className="form-control my-3"
              ></Input>
            </Col>
          </Row>
          <div className="d-flex justify-content-center">
            <Button type="submit" color="primary" className="px-4">
              ارسال فیش
            </Button>
          </div>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default AddFishModalInUser;
