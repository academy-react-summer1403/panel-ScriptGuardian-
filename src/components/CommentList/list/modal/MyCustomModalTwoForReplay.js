// ** React Imports
import { Fragment, useState } from "react";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Modal,
  Label,
  Input,
  Button,
  CardBody,
  CardText,
  CardTitle,
  ModalBody,
  InputGroup,
  ModalHeader,
  FormFeedback,
  InputGroupText,
} from "reactstrap";

import { useFormik } from "formik";

import { useAddReplayCommentCourse } from "../../../../core/services/api/DetailCourses/handelCommentCourses";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

const MyCustomModalTwoForReplay = ({ show, setShow, courseId, commentId }) => {
  // ** States
  const queryClient = useQueryClient();
  const [cardType, setCardType] = useState("");

  //API

  const { mutate: AddReplayComment } = useAddReplayCommentCourse();
  const formik = useFormik({
    initialValues: {
      CommentId: commentId,
      CourseId: courseId,
      Title: "",
      Describe: "",
    },
    onSubmit: (values, { resetForm }) => {
      const formData = new FormData();
      for (const key in values) {
        formData.append(key, values[key]);
      }
      AddReplayComment(formData, {
        onSuccess: (data) => {
          if (data.success === true) {
            setShow(false);
            toast.success("ریپلای  با موفقیت ارسال شد");
            queryClient.invalidateQueries("GetAllCommentsList");
            resetForm();
          } else {
            toast.error("خطا در ارسال ریپلای");
          }
        },
      });
    },
  });

  return (
    <Fragment>
      <Modal
        isOpen={show}
        toggle={() => setShow(!show)}
        className="modal-dialog-centered"
        // onClosed={() => setCardType("")}
      >
        <ModalHeader
          className="bg-transparent"
          toggle={() => setShow(!show)}
        ></ModalHeader>
        <ModalBody className="px-sm-5 mx-50 pb-5">
          <h1 className="text-center mb-1"> پاسخ </h1>
          <p className="text-center">پاسخ خود را برای کاربر بنویسید</p>
          <form onSubmit={formik.handleSubmit}>
            <Row tag="form" className="gy-1 gx-2 mt-75">
              <Col xs={12}>
                <Label className="form-label" for="Title">
                  عنوان پاسخ
                </Label>

                <Input
                  type="text"
                  id="Title"
                  placeholder="عنوان پاسخ خود را وارد کنید"
                  name="Title"
                  {...formik.getFieldProps("Title")}
                />
              </Col>

              <Col xs={12}>
                <Label className="form-label" for="Describe">
                  توضیحات پاسخ
                </Label>

                <Input
                  type="textarea"
                  id="Describe"
                  name="Describe"
                  placeholder="توضیحات پاسخ خود را وارد کنید"
                  {...formik.getFieldProps("Describe")}
                />
              </Col>
            </Row>
            <Row>
              <Col className="text-center mt-1" xs={12}>
                <Button type="submit" className="me-1" color="primary">
                  ارسال
                </Button>
                <Button
                  color="secondary"
                  outline
                  onClick={() => {
                    setShow(!show);
                  }}
                >
                  لغو
                </Button>
              </Col>
            </Row>
          </form>
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default MyCustomModalTwoForReplay;
