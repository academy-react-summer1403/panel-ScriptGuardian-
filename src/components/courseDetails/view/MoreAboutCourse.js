import { Card, CardBody, CardTitle } from "reactstrap";
import describeNews from "../../../images/describeNews.webp";
import googel from "../../../images/googel.jpg";
import keyword from "../../../images/keyword.png";
import classRom from "../../../images/classRom.png";
import Type from "../../../images/Type.jpg";
import level from "../../../images/level.png";
import status from "../../../images/status.jpg";
const MoreAboutCourse = ({ data }) => {
  return (
    <>
      <Card>
        <CardBody>
          <CardTitle className="mb-75"> اطلاعات مربوط به دوره</CardTitle>
          <p>در این قسمت می توانید اطلاعات دوره رو مشاهده کنید</p>

          <div className="d-flex mt-2">
            <div className="flex-shrink-0">
              <img
                className="me-1"
                src={describeNews}
                // alt={item.title}
                height="38"
                width="38"
              />
            </div>
            <div className="d-flex align-item-center justify-content-between flex-grow-1">
              <div className="me-1">
                <p className="fw-bolder mb-0">توضیحات دوره</p>
                <span
                  style={{
                    display: "block",
                    flexWrap: "wrap",
                    width: "550px",
                    textWrap: "wrap",
                  }}
                >
                  {data?.describe}
                </span>
              </div>
            </div>
          </div>

          <div className="d-flex mt-2">
            <div className="flex-shrink-0">
              <img
                className="me-1"
                src={classRom}
                // alt={item.title}
                height="38"
                width="38"
              />
            </div>
            <div className="d-flex align-item-center justify-content-between flex-grow-1">
              <div className="me-1">
                <p className="fw-bolder mb-0"> نام کلاس دوره</p>
                <span>{data?.courseClassRoomName}</span>
              </div>
            </div>
          </div>

          <div className="d-flex mt-2">
            <div className="flex-shrink-0">
              <img
                className="me-1"
                src={Type}
                // alt={item.title}
                height="38"
                width="38"
              />
            </div>
            <div className="d-flex align-item-center justify-content-between flex-grow-1">
              <div className="me-1">
                <p className="fw-bolder mb-0">نوع دوره</p>
                <span>{data?.courseTypeName}</span>
              </div>
            </div>
          </div>

          <div className="d-flex mt-2">
            <div className="flex-shrink-0">
              <img
                className="me-1"
                src={level}
                // alt={item.title}
                height="38"
                width="38"
              />
            </div>
            <div className="d-flex align-item-center justify-content-between flex-grow-1">
              <div className="me-1">
                <p className="fw-bolder mb-0">سطح دوره</p>
                <span>{data?.courseLevelName}</span>
              </div>
            </div>
          </div>

          <div className="d-flex mt-2">
            <div className="flex-shrink-0">
              <img
                className="me-1"
                src={status}
                // alt={item.title}
                height="38"
                width="38"
              />
            </div>
            <div className="d-flex align-item-center justify-content-between flex-grow-1">
              <div className="me-1">
                <p className="fw-bolder mb-0">وضعیت دوره</p>
                <span>{data?.courseStatusName}</span>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default MoreAboutCourse;
