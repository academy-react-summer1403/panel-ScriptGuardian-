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

import { useAddClassRoom } from "../../../../core/services/api/Admin/handelClassRom";
import {
  useGetAllCourses,
  useGetAllUsers,
} from "../../../../core/services/api/Admin/handelUsers";
import { useAddAssistanceCourse } from "../../../../core/services/api/Admin/handelCourseAssistance";
const AddCourseAssistance = ({ setShow, show, data }) => {
  //handel options
  const { data: Mentors } = useGetAllUsers({
    currentPage: 1,
    rowsPerPage: 1000,
    debouncedSearchQuery: undefined,
    IsActiveUser: true,
    roleId: undefined,
  });
  const options =
    Mentors &&
    Mentors?.listUser
      ?.map((item) => {
        if (!item?.fname || !item?.lname) {
          return null;
        }

        return {
          value:
            item?.id && item?.id != null && item?.id != 0 ? item?.id : false,
          label:
            (item?.fname ? item?.fname : "") +
            (item?.lname ? " " + item?.lname : ""),
        };
      })
      .filter((item) => item !== null);

  const { data: Courses } = useGetAllCourses({
    currentPage: 1,
    rowsPerPage: 1000,
  });
  const options2 =
    Courses &&
    Courses?.courseDtos?.map((item) => ({
      value: item?.courseId,
      label: item?.title,
    }));

  const { mutate: UpdateProfile } = useAddAssistanceCourse();
  console.log(data, "this data from course details");
  const queryClient = useQueryClient();
  const formik = useFormik({
    initialValues: {
      userId: options?.[0]?.value || "",
      courseId: options2?.[0]?.value || "",
    },

    enableReinitialize: true,

    onSubmit: (values) => {
      UpdateProfile(values, {
        onSuccess: (data) => {
          if (data.success == true) {
            toast.success(" با موفقیت  اضافه شد");
            queryClient.invalidateQueries("GetClassRoomList");

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
            <h1 className="mb-1">افزودن کلاس </h1>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <Row className="gy-1 pt-75">
              {/* title */}
              <Col md={12} xs={12}>
                <Label className="form-label" for="capacity">
                  منتور مورد نظر{" "}
                </Label>
                <Select
                  id="userId"
                  isClearable={false}
                  className="react-select"
                  classNamePrefix="select"
                  options={options}
                  theme={selectThemeColors}
                  value={
                    options &&
                    options?.find(
                      (option) => option.value === formik.values.userId
                    )
                  }
                  onChange={(data) => {
                    formik.setFieldValue("userId", data?.value || "");
                  }}
                />
              </Col>
            </Row>

            <Row className="gy-1 pt-75">
              {/* title */}
              <Col md={12} xs={12}>
                <Label className="form-label" for="capacity">
                  دوره{" "}
                </Label>
                <Select
                  id="courseId"
                  isClearable={false}
                  className="react-select"
                  classNamePrefix="select"
                  options={options2}
                  theme={selectThemeColors}
                  value={
                    options2 &&
                    options2?.find(
                      (option) => option.value === formik.values.courseId
                    )
                  }
                  onChange={(data) => {
                    formik.setFieldValue("courseId", data?.value || "");
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

export default AddCourseAssistance;
