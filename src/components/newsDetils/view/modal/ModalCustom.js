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

const ModalCustom = ({ show, setShow, data }) => {
  const queryClient = useQueryClient();
  const countryOptions = [
    { value: "uk", label: "UK" },
    { value: "usa", label: "USA" },
    { value: "france", label: "France" },
    { value: "russia", label: "Russia" },
    { value: "canada", label: "Canada" },
  ];

  const { mutate: UpdateProfile } = useUpdateNews();
  console.log(data, "this data from course details");

  const formik = useFormik({
    initialValues: {
      Id: data?.id ?? "",
      SlideNumber: "0", //?
      CurrentImageAddress: data?.currentImageAddress ?? null,
      CurrentImageAddressTumb: data?.currentImageAddressTumb ?? null,
      Active: data?.active,
      Title: data?.title ?? "",
      GoogleTitle: data?.googleTitle ?? "",
      GoogleDescribe: data?.googleDescribe ?? "",
      MiniDescribe: data?.miniDescribe ?? "",
      Describe: data?.describe ?? "",
      Keyword: data?.keyword ?? "",
      IsSlider: data?.isSlider ?? "",
      NewsCatregoryId: data?.newsCatregoryId ?? "",
      Image: data?.currentImageAddress ?? "",
    },
    enableReinitialize: true,
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      for (const key in values) {
        formData.append(key, values[key]);
      }
      UpdateProfile(formData, {
        onSuccess: (data) => {
          if (data.success == true) {
            toast.success("ویرایش با موفقیت انجام شد");
            queryClient.invalidateQueries("GetAllNewsDetailsAdmin");

            setShow(false);
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
            <h1 className="mb-1">تغییر اطلاعات دوره </h1>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <Row className="gy-1 pt-75">
              {/* title */}
              <Col md={6} xs={12}>
                <Label className="form-label" for="Title">
                  عنوان خبر{" "}
                </Label>
                <Input
                  id="Title"
                  name="Title"
                  placeholder="عنوان خبر را وارد کنید"
                  {...formik?.getFieldProps("Title")}
                />
              </Col>

              <Col md={6} xs={12}>
                <Label className="form-label" for="Keyword">
                  کلمات کلیدی خبر{" "}
                </Label>
                <Input
                  id="Keyword"
                  name="Keyword"
                  placeholder="کلمات کلیدی  خبر را وارد کنید"
                  {...formik?.getFieldProps("Keyword")}
                />
              </Col>
            </Row>

            <Row className="gy-1 pt-75">
              {/* title */}
              <Col md={6} xs={12}>
                <Label className="form-label" for="GoogleTitle">
                  عنوان گوگل{" "}
                </Label>
                <Input
                  id="GoogleTitle"
                  name="GoogleTitle"
                  placeholder="عنوان گوگل  را وارد کنید"
                  {...formik?.getFieldProps("GoogleTitle")}
                />
              </Col>

              <Col md={6} xs={12}>
                <Label className="form-label" for="GoogleDescribe">
                  توضیحات گوگل
                </Label>
                <Input
                  id="GoogleDescribe"
                  name="GoogleDescribe"
                  placeholder="   توضیحات گوگل را وارد کنید"
                  {...formik?.getFieldProps("GoogleDescribe")}
                />
              </Col>

              <Col md={12} xs={12}>
                <Label className="form-label" for="Describe">
                  توضیحات
                </Label>
                <Input
                  type="textarea"
                  id="Describe"
                  name="Describe"
                  placeholder="   توضیحات  را وارد کنید"
                  {...formik?.getFieldProps("Describe")}
                />
              </Col>
            </Row>
            <Row>
              <Col md="12" sm="12">
                <Label className="form-label" for="CurrentImageAddress">
                  <h5> عکس خبر را میخاهید ویرایش کنید؟ </h5>{" "}
                </Label>
                <Input
                  type="file"
                  id="CurrentImageAddress"
                  name="CurrentImageAddress"
                  onChange={(event) => {
                    formik.setFieldValue(
                      "CurrentImageAddress",
                      event.target.files[0]
                    );
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

export default ModalCustom;
