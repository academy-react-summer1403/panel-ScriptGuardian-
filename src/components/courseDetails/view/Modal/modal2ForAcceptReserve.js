import { useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Card,
  CardBody,
  Collapse,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";

import {
  useAcceptCourseReserve,
  useAddNewGroupForCourses,
  useGetGroupCourse,
} from "../../../../core/services/api/Admin/handelreserve";
import { toast } from "react-toastify";
import { useGetAllCourseDetailsAdmin } from "../../../../core/services/api/Admin/handelUsers";
import { useEffect, useState } from "react";
import { useFormik } from "formik";

const Modal2ForAcceptReserve = ({
  isOpenModal,
  toggleAcceptModal,
  courseId,
  teacherId,
  studentId,
  setIsOpenModal,
}) => {
  const queryClient = useQueryClient();
  const [addNewGroupIsOpen, setAddNewGroupIsOpen] = useState(false);
  const [showNot, setShowNot] = useState(false);

  const ToggelIsOpen = () => {
    setAddNewGroupIsOpen(!addNewGroupIsOpen);
  };

  const { data: AllGroup } = useGetGroupCourse({
    teacherId: teacherId,
    courseId: courseId,
  });

  useEffect(() => {
    if (isOpenModal && AllGroup?.length === 0 && showNot === false) {
      toast.info("گروهی برای رزرو وجود ندارد لطفا ایجاد کنید");
      setShowNot(true);
    }

    if (!isOpenModal) {
      setShowNot(false);
    }
  }, [isOpenModal, AllGroup, showNot]);
  const { mutate: Accept } = useAcceptCourseReserve();
  const [selectedGroup, setSelectedGroup] = useState("");

  const handelAccept = ({ courseId, studentId, selectedGroup }) => {
    if (selectedGroup !== "") {
      Accept(
        { studentId, courseId, selectedGroup },
        {
          onSuccess: (data) => {
            if (data.success == true) {
              setIsOpenModal(false);
              toast.success("با موفقیت رزرو پذیرفته شد");
              queryClient.invalidateQueries("GetAllCourseDetailsReserves");
            } else {
              toast.error("    خطا در رزرو");
            }
          },
        }
      );
    } else if (selectedGroup === "") {
      toast.error("انتخاب گروه اجباریست");
    } else {
      toast.error("  خطا در قبول کردن رزرو");
    }
  };

  //handel Add New Group

  const { mutate: AddNewsGroup } = useAddNewGroupForCourses();

  const formik = useFormik({
    initialValues: {
      GroupName: "",
      CourseId: courseId,
      GroupCapacity: "",
    },
    enableReinitialize: true,

    // validationSchema: validationSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      for (const key in values) {
        formData.append(key, values[key]);
      }
      AddNewsGroup(formData, {
        onSuccess: (data) => {
          if (data.success) {
            toast.success("با موفقیت گروه اضافه شد ");
            setAddNewGroupIsOpen(false);
            queryClient.invalidateQueries("GetGroupCourse");
          } else {
            toast.error("خطا در اضافه کردن گروه");
          }
        },
        // onError: (error) => {

        // },
      });
    },
  });

  return (
    <>
      <Modal isOpen={isOpenModal} toggle={toggleAcceptModal}>
        <ModalHeader
        //  toggle={toggleAcceptModal}
        >
          تایید پذیرفتن رزرو
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="courseGroup">گروه دوره</Label>
            <Input
              type="select"
              name="courseGroup"
              id="courseGroup"
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
            >
              <option value="" disabled>
                لطفا گروه دوره را انتخاب کنید
              </option>
              {/* {courseGroups?.map((group) => (
            <option key={group.groupId} value={group.groupId}>
              {group.groupName}
            </option>
          ))} */}

              {AllGroup &&
                AllGroup?.map((group) => (
                  <option key={group.groupId} value={group.groupId}>
                    {group.groupName}
                  </option>
                ))}
            </Input>
          </FormGroup>
          <Button color="link" onClick={ToggelIsOpen}>
            افزودن گروه جدید
          </Button>
          <Collapse isOpen={addNewGroupIsOpen}>
            <Card>
              <CardBody>
                <form onSubmit={formik.handleSubmit}>
                  <FormGroup>
                    <Label for="GroupName">نام گروه</Label>
                    <Input
                      type="text"
                      id="GroupName"
                      name="GroupName"
                      {...formik.getFieldProps("GroupName")}
                    />
                    {/* {formik.touched.GroupName && formik.errors.GroupName && (
                  <div className="text-danger">{formik.errors.GroupName}</div>
                )} */}
                  </FormGroup>
                  <FormGroup>
                    <Label for="GroupCapacity">ظرفیت گروه</Label>
                    <Input
                      type="text"
                      id="GroupCapacity"
                      name="GroupCapacity"
                      {...formik.getFieldProps("GroupCapacity")}
                    />
                  </FormGroup>
                  <Button color="primary" type="submit" className="mt-2">
                    اضافه کردن گروه جدید{" "}
                  </Button>
                </form>
              </CardBody>
            </Card>
          </Collapse>
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            onClick={() => {
              handelAccept({ courseId, studentId, selectedGroup });
            }}
          >
            موافقت
          </Button>
          <Button color="secondary" onClick={toggleAcceptModal}>
            لغو
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
export default Modal2ForAcceptReserve;
