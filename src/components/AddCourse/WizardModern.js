// ** React Imports
import { useRef, useState } from "react";

// ** Custom Components
import Wizard from "@components/wizard";

// ** Steps
import Address from "./steps/Address";
import SocialLinks from "./steps/SocialLinks";
import PersonalInfo from "./steps/PersonalInfo";

// ** Icons Imports
import { FileText, User, MapPin, Link } from "react-feather";
import AccountFeature from "./steps/AccountFeature";
import { useCreateCourseStepOne } from "../../core/services/api/Admin/handelAddCourse";

const WizardModern = () => {
  //API
  //Step one

  const { data: GetCourseStepOne } = useCreateCourseStepOne();
  // ** Ref
  const ref = useRef(null);

  // ** State
  const [stepper, setStepper] = useState(null);

  const [currentValue, setCurrentValue] = useState({
    currentCourseType: null,
    currentCourseLevelDtos: null,
    currentStatusDtos: null,
    currentClassRoomDtos: null,
    currentTeachers: null,
    currentTermDtos: null,
    currentTechnologyDtos: null,
    Title: "",
    Cost: "",
    Capacity: "",
    SessionNumber: "",
    miniDescribe: "",
    StartTime: "",
    StartTime: "",
    EndTime: "",
    ImageAddress: "Not-set",
    TumbImageAddress: "Not-set",
  });

  console.log(currentValue, "this is best value for ever never bever");

  const steps = [
    {
      id: "account-details",
      title: "ویژگی های دوره",
      subtitle: "ویژگی های دوره خود را وارد کنید",
      icon: <FileText size={18} />,
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
      icon: <User size={18} />,
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
      title: "Address",
      subtitle: "Add Address",
      icon: <MapPin size={18} />,
      content: <Address stepper={stepper} type="wizard-modern" />,
    },
    {
      id: "social-links",
      title: "Social Links",
      subtitle: "Add Social Links",
      icon: <Link size={18} />,
      content: <SocialLinks stepper={stepper} type="wizard-modern" />,
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
