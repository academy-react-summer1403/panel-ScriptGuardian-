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
import {
  useAddBuilding,
  useGetBuildingList,
} from "../../../core/services/api/Admin/handelBulding";
import Select from "react-select";
import { selectThemeColors } from "@utils";
import { useAddDepartment } from "../../../core/services/api/Admin/Departmenthandel";
const AddNewDepart = ({ setShow, show, data }) => {
  //get builds
  const { data: Builds } = useGetBuildingList();

  const options =
    Builds &&
    Builds?.map((item) => ({
      value: item?.id,
      label: item?.buildingName,
    }));

  //
  const { mutate: UpdateProfile } = useAddDepartment();
  console.log(data, "this data from course details");
  const queryClient = useQueryClient();
  const formik = useFormik({
    initialValues: {
      id: "1",
      depName: "",
      buildingId: options?.[0]?.value || "",
    },
    enableReinitialize: true,

    onSubmit: (values) => {
      UpdateProfile(values, {
        onSuccess: (data) => {
          if (data.success == true) {
            toast.success(" با موفقیت  اضافه شد");
            queryClient.invalidateQueries("GetDepartList");

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
            <h1 className="mb-1">افزودن منتور برای دوره </h1>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <Row className="gy-1 pt-75">
              {/* title */}
              <Col md={12} xs={12}>
                <Label className="form-label" for="depName">
                  نام دپارتمان{" "}
                </Label>
                <Input
                  id="depName"
                  name="depName"
                  placeholder="نام دپارتمان را وارد کنید"
                  {...formik?.getFieldProps("depName")}
                />
              </Col>
            </Row>

            <Row className="gy-1 pt-75">
              {/* title */}
              <Col md={12} xs={12}>
                <Label className="form-label" for="floor">
                  ساختمان{" "}
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

export default AddNewDepart;
