import { Check, X } from "react-feather";
import { Card, CardBody, CardTitle, Input, Label } from "reactstrap";
import gmail from "../../../images/gmail.png";
import phone from "../../../images/phone.png";
import aboutUser from "../../../images/aboutUser.png";
import date from "../../../images/date.png";
import home from "../../../images/home.png";
import linkedin from "../../../images/linkedin.png";
import telegram from "../../../images/telagram.jpg";
import { convertIsoToJalali } from "../../../core/utils/dateUtils";
import { NavLink } from "react-router-dom";
const AboutUserTab = ({ data }) => {
  return (
    <>
      <Card>
        <CardBody>
          <CardTitle className="mb-75">اطلاعات کاربر</CardTitle>
          <p>در این قسمت می توانید اطلاعات کاربر رو مشاهده کنید</p>

          <div className="d-flex mt-2">
            <div className="flex-shrink-0">
              <img
                className="me-1"
                src={gmail}
                // alt={item.title}
                height="38"
                width="38"
              />
            </div>
            <div className="d-flex align-item-center justify-content-between flex-grow-1">
              <div className="me-1">
                <p className="fw-bolder mb-0">جیمیل بازیابی کاربر</p>
                <span>{data?.recoveryEmail}</span>
              </div>
            </div>
          </div>

          <div className="d-flex mt-2">
            <div className="flex-shrink-0">
              <img
                className="me-1"
                src={phone}
                // alt={item.title}
                height="38"
                width="38"
              />
            </div>
            <div className="d-flex align-item-center justify-content-between flex-grow-1">
              <div className="me-1">
                <p className="fw-bolder mb-0">شماره کاربر</p>
                <span>{data?.phoneNumber}</span>
              </div>
            </div>
          </div>

          <div className="d-flex mt-2">
            <div className="flex-shrink-0">
              <img
                className="me-1"
                src={aboutUser}
                // alt={item.title}
                height="38"
                width="38"
              />
            </div>
            <div className="d-flex align-item-center justify-content-between flex-grow-1">
              <div className="me-1">
                <p className="fw-bolder mb-0">درباره کاربر</p>
                <span>{data?.userAbout}</span>
              </div>
            </div>
          </div>

          <div className="d-flex mt-2">
            <div className="flex-shrink-0">
              <img
                className="me-1"
                src={date}
                // alt={item.title}
                height="38"
                width="38"
              />
            </div>
            <div className="d-flex align-item-center justify-content-between flex-grow-1">
              <div className="me-1">
                <p className="fw-bolder mb-0"> تاریخ ثبت نام</p>
                <strong>
                  {data?.insertDate ? convertIsoToJalali(data?.insertDate) : ""}
                </strong>
              </div>
            </div>
          </div>

          <div className="d-flex mt-2">
            <div className="flex-shrink-0">
              <img
                className="me-1"
                src={home}
                // alt={item.title}
                height="38"
                width="38"
              />
            </div>
            <div className="d-flex align-item-center justify-content-between flex-grow-1">
              <div className="me-1">
                <p className="fw-bolder mb-0"> آدرس کاربر</p>
                <strong>{data?.homeAdderess ? data?.homeAdderess : ""}</strong>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      <Card style={{ marginTop: "50px" }}>
        <CardBody>
          <CardTitle className="mb-75">شبکات اجتماعی کاربر</CardTitle>
          <p>در این قسمت می توانید شبکه های اجتماعی کاربر را مشاهده کنید</p>

          <div className="d-flex mt-2">
            <div className="flex-shrink-0">
              <img
                className="me-1"
                src={telegram}
                // alt={item.title}
                height="38"
                width="38"
              />
            </div>
            <div className="d-flex align-item-center justify-content-between flex-grow-1">
              <div className="me-1">
                <p className="fw-bolder mb-0">آدرس تلگرام کاربر</p>
                <NavLink to={data?.telegramLink}>
                  {data?.telegramLink}
                </NavLink>{" "}
              </div>
            </div>
          </div>

          <div className="d-flex mt-2">
            <div className="flex-shrink-0">
              <img
                className="me-1"
                src={linkedin}
                // alt={item.title}
                height="38"
                width="38"
              />
            </div>
            <div className="d-flex align-item-center justify-content-between flex-grow-1">
              <div className="me-1">
                <p className="fw-bolder mb-0"> آدرس لینکدین کاربر</p>
                <NavLink to={`${data?.linkdinProfile}`}>
                  {data?.linkdinProfile}
                </NavLink>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default AboutUserTab;
