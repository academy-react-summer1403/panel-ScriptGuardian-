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
import { useUpdateCommentNews } from "../../../../core/services/api/Admin/handelDetailsNews";

const ModalEditCommentNews = ({ show, setShow, data }) => {
  const queryClient = useQueryClient();
  const { mutate: UpdateProfile } = useUpdateCommentNews();
  console.log(data, "this data from course details");

  const formik = useFormik({
    initialValues: {
      id: data?.id ?? "",
      newsId: data?.newsId ?? "",
      title: data?.title ?? "",
      describe: data?.describe ?? "",
      accept: false,
    },
    enableReinitialize: true,
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      UpdateProfile(values, {
        onSuccess: (data) => {
          if (data.success == true) {
            toast.success("ویرایش با موفقیت انجام شد");
            queryClient.invalidateQueries("GetAllNewsComments");

            setShow(false);
          } else {
            toast.error("ویرایش با موفقیت انجام نشد");
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
        className="modal-dialog-centered modal-lg"
      >
        <ModalHeader
          className="bg-transparent"
          toggle={() => setShow(!show)}
        ></ModalHeader>
        <ModalBody className="px-sm-5 pt-50 pb-5">
          <div className="text-center mb-2">
            <h1 className="mb-1"> ویرایش کامنت</h1>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <Row className="gy-1 pt-75">
              {/* title */}
              <Col md={4} xs={12}>
                <Label className="form-label" for="title">
                  عنوان دوره{" "}
                </Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="عنوان دوره را وارد کنید"
                  {...formik?.getFieldProps("title")}
                />
              </Col>

              <Col xs={12}>
                <div className="d-flex align-items-center mt-1">
                  <div className="form-switch">
                    <Input
                      type="switch"
                      defaultChecked
                      id="accept"
                      name="accept"
                      checked={formik.values.accept}
                      onChange={formik.handleChange}
                    />
                    <Label className="form-check-label" htmlFor="accept">
                      <span className="switch-icon-left">
                        <Check size={14} />
                      </span>
                      <span className="switch-icon-right">
                        <X size={14} />
                      </span>
                    </Label>
                  </div>
                  <Label className="form-check-label fw-bolder" for="accept">
                    موافقت{" "}
                  </Label>
                </div>
              </Col>
              <Col xs={12} className="text-center mt-2 pt-50">
                <Button type="submit" className="me-1" color="primary">
                  ارسال
                </Button>
                {/* <Button
                  type="reset"
                  color="secondary"
                  outline
                  onClick={() => {
                    handleReset();
                    setShow(false);
                  }}
                >
                  Discard
                </Button> */}
              </Col>
            </Row>
          </form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default ModalEditCommentNews;
