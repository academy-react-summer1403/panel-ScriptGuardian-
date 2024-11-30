// ** React Imports
import { useRef, useState } from "react";

// ** Custom Components
import Wizard from "@components/wizard";

// ** Steps
import Address from "./steps/PostCourse";
import SocialLinks from "./steps/SocialLinks";
import PersonalInfo from "./steps/PersonalInfo";

// ** Icons Imports
import {
  FileText,
  User,
  MapPin,
  Link,
  Settings,
  Info,
  Layers,
  Cpu,
} from "react-feather";
import AccountFeature from "./steps/AccountFeature";
import { useCreateCourseStepOne } from "../../core/services/api/Admin/handelAddCourse";
import PostCourse from "./steps/PostCourse";

const WizardModern = () => {
  //API
  //Step one

  const { data: GetCourseStepOne } = useCreateCourseStepOne();
  // ** Ref
  const ref = useRef(null);

  // ** State
  const [stepper, setStepper] = useState(null);

  const [currentValue, setCurrentValue] = useState({
    currentCourseType: null, //1
    currentCourseLevelDtos: null, //2
    currentStatusDtos: null, //3
    currentClassRoomDtos: null, //4
    currentTeachers: null, //5
    currentTermDtos: null, //6
    currentTechnologyDtos: null, //7
    Title: "", //8
    Cost: "", //9
    Capacity: "", //10
    SessionNumber: "", //11
    miniDescribe: "", //12
    StartTime: "", //13
    EndTime: "", //14
    ImageAddress: "Not-set", //15
    TumbImageAddress: "Not-set", //16
    GoogleTitle: "", //17
    GoogleSchema: "", //18
    uniqeUrlString: "", //19
    shortLink: "", //20
    CoursePrerequisiteId: "", //21
    CurrentCoursePaymentNumber: "0", //22
  });

  console.log(currentValue, "this is best value for ever never bever");

  const [getId, setGetId] = useState(null);

  const steps = [
    {
      id: "account-details",
      title: "ویژگی های دوره",
      subtitle: "ویژگی های دوره خود را وارد کنید",
      icon: <Settings size={18} />,
      content: (
        <AccountFeature
          stepper={stepper}
          type="wizard-modern"
          data={GetCourseStepOne}
          setCurrentValue={setCurrentValue}
        />
      ),
    },
    {
      id: "personal-info",
      title: "اطلاعات اولیه",
      subtitle: "اطلاعات اولیه رو کامل کنید",
      icon: <Info size={18} />,
      content: (
        <PersonalInfo
          stepper={stepper}
          type="wizard-modern"
          setCurrentValue={setCurrentValue}
          currentValue={currentValue}
        />
      ),
    },
    {
      id: "step-address",
      title: "اطلاعات تخصصی",
      subtitle: "اطلاعات تخصصی را وارد کنید",
      icon: <Layers size={18} />,
      content: (
        <PostCourse
          stepper={stepper}
          type="wizard-modern"
          setCurrentValue={setCurrentValue}
          currentValue={currentValue}
          setGetId={setGetId}
        />
      ),
    },
    {
      id: "social-links",
      title: "افزودن تکنولوژی",
      subtitle: "تکنولوژی مورد نظر خود را انتخاب کنید",
      icon: <Cpu size={18} />,
      content: (
        <SocialLinks
          stepper={stepper}
          type="wizard-modern"
          data={GetCourseStepOne}
          setCurrentValue={setCurrentValue}
          currentValue={currentValue}
          getId={getId}
        />
      ),
    },
  ];

  return (
    <div className="modern-horizontal-wizard">
      <Wizard
        type="modern-horizontal"
        ref={ref}
        steps={steps}
        options={{
          linear: false,
        }}
        instance={(el) => setStepper(el)}
      />
    </div>
  );
};

export default WizardModern;
