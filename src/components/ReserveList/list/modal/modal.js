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
  useGetGroupCourse,
} from "../../../../core/services/api/Admin/handelreserve";
import { toast } from "react-toastify";
import { useGetAllCourseDetailsAdmin } from "../../../../core/services/api/Admin/handelUsers";

const CustomModal = ({ isOpenModal, toggleAcceptModal, Id }) => {
  // const queryClient = useQueryClient();
  // const { data: CourseDetails } = useGetAllCourseDetailsAdmin(Id);
  // const { data: AllGroup } = useGetGroupCourse({
  //   teacherId: CourseDetails?.teacherId,
  //   courseId: CourseDetails?.courseId,
  // });
  // console.log(AllGroup , "AllGroup");
  const { mutate: Accept } = useAcceptCourseReserve();
  const handelAccept = (value) => {
    Accept(value.reserveId, value.courseId, value.studentId, {
      onSuccess: (data) => {
        if (data.success == true) {
          toast.success("با موفقیت رزرو پذیرفته شد");
          queryClient.invalidateQueries("GetAllCourseReserves");
        } else {
          toast.error("    خطا در رزرو");
        }
      },
    });
  };
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
              //   value={selectedGroup}
              //   onChange={(e) => setSelectedGroup(e.target.value)}
            >
              <option value="" disabled>
                لطفا گروه دوره را انتخاب کنید
              </option>
              {/* {courseGroups?.map((group) => (
            <option key={group.groupId} value={group.groupId}>
              {group.groupName}
            </option>
          ))} */}

              {/* {AllGroup &&
                AllGroup?.map((group) => (
                  <option key={group.groupId} value={group.groupId}>
                    {group.groupName}
                  </option>
                ))} */}
            </Input>
          </FormGroup>
          <Button
            color="link"
            //   onClick={toggleAccordion}
          >
            افزودن گروه جدید
          </Button>
          <Collapse
          //    isOpen={isAccordionOpen}
          >
            <Card>
              <CardBody>
                <form
                //  onSubmit={formik.handleSubmit}
                >
                  <FormGroup>
                    <Label for="newGroupName">نام گروه</Label>
                    <Input
                      type="text"
                      id="newGroupName"
                      name="GroupName"
                      //   value={formik.values.GroupName}
                      //   onChange={formik.handleChange}
                      //   onBlur={formik.handleBlur}
                      //   invalid={
                      //     formik.touched.GroupName && !!formik.errors.GroupName
                      //   }
                    />
                    {/* {formik.touched.GroupName && formik.errors.GroupName && (
                  <div className="text-danger">{formik.errors.GroupName}</div>
                )} */}
                  </FormGroup>
                  <FormGroup>
                    <Label for="newGroupCapacity">ظرفیت گروه</Label>
                    <Input
                      type="number"
                      id="newGroupCapacity"
                      name="GroupCapacity"
                      //   value={formik.values.GroupCapacity}
                      //   onChange={formik.handleChange}
                      //   onBlur={formik.handleBlur}
                      //   invalid={
                      //     formik.touched.GroupCapacity &&
                      //     !!formik.errors.GroupCapacity
                      //   }
                    />
                    {/* {formik.touched.GroupCapacity &&
                  formik.errors.GroupCapacity && (
                    <div className="text-danger">
                      {formik.errors.GroupCapacity}
                    </div>
                  )} */}
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
            //    onClick={handleAcceptCourseReserve}
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
export default CustomModal;
