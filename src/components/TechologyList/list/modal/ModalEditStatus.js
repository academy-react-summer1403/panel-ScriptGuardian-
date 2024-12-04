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

import { useEditTech } from "../../../../core/services/api/Admin/TechnologyHandel";
const ModalEditStatus = ({ setShow, show, data }) => {
  //Edit TechNology
  const { mutate: UpdateProfile } = useEditTech();

  const queryClient = useQueryClient();
  const formik = useFormik({
    initialValues: {
      techName: data?.techName,
      parentId: data?.parentId,
      describe: data?.describe,
      iconAddress: data?.iconAddress,
      id: data?.id,
    },
    enableReinitialize: true,

    onSubmit: (values) => {
      UpdateProfile(values, {
        onSuccess: (data) => {
          if (data.success == true) {
            toast.success(" با موفقیت  ویرایش شد");
            queryClient.invalidateQueries("GetTechList");
            formik.resetForm();
            setShow(false);
          } else {
            toast.error("خطا در ویرایش کردن");
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
            <h1 className="mb-1">ویرایش تکنولوژی </h1>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <Row className="gy-1 pt-75">
              {/* title */}
              <Col md={12} xs={12}>
                <Label className="form-label" for="techName">
                  نام تکنولوژی{" "}
                </Label>
                <Input
                  id="techName"
                  name="techName"
                  placeholder="نام تکنولوژی را وارد کنید"
                  {...formik?.getFieldProps("techName")}
                />
              </Col>
            </Row>

            <Row className="gy-1 pt-75">
              {/* title */}
              <Col md={12} xs={12}>
                <Label className="form-label" for="describe">
                  توضیحات تکنولوژی{" "}
                </Label>
                <Input
                  id="describe"
                  name="describe"
                  placeholder="توضیحات  تکنولوژی  را وارد کنید"
                  {...formik?.getFieldProps("describe")}
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

export default ModalEditStatus;
