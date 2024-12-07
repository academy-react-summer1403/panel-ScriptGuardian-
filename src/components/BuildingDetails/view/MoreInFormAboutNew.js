import { Card, CardBody, CardTitle } from "reactstrap";
import describeNews from "../../../images/describeNews.webp";
import googel from "../../../images/googel.jpg";
import keyword from "../../../images/keyword.png";
const MoreInFormAboutNew = ({ data }) => {
  return (
    <>
      <Card>
        <CardBody>
          <CardTitle className="mb-75"> اطلاعات مربوط به خبر</CardTitle>
          <p>در این قسمت می توانید اطلاعات خبر رو مشاهده کنید</p>

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
                <p className="fw-bolder mb-0">توضیحات خبر</p>
                <span>{data?.describe}</span>
              </div>
            </div>
          </div>

          <div className="d-flex mt-2">
            <div className="flex-shrink-0">
              <img
                className="me-1"
                src={googel}
                // alt={item.title}
                height="38"
                width="38"
              />
            </div>
            <div className="d-flex align-item-center justify-content-between flex-grow-1">
              <div className="me-1">
                <p className="fw-bolder mb-0">عنوان گوگل خبر</p>
                <span>{data?.googleTitle}</span>
              </div>
            </div>
          </div>

          <div className="d-flex mt-2">
            <div className="flex-shrink-0">
              <img
                className="me-1"
                src={googel}
                // alt={item.title}
                height="38"
                width="38"
              />
            </div>
            <div className="d-flex align-item-center justify-content-between flex-grow-1">
              <div className="me-1">
                <p className="fw-bolder mb-0">توضیحات گوگل </p>
                <span
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    width: "600px",
                    display: "block",
                  }}
                >
                  {data?.googleDescribe}
                </span>
              </div>
            </div>
          </div>

          <div className="d-flex mt-2">
            <div className="flex-shrink-0">
              <img
                className="me-1"
                src={keyword}
                // alt={item.title}
                height="38"
                width="38"
              />
            </div>
            <div className="d-flex align-item-center justify-content-between flex-grow-1">
              <div className="me-1">
                <p className="fw-bolder mb-0">کلمه کلیدی خبر</p>
                <span>{data?.keyword}</span>
              </div>
            </div>
          </div>

          {/* <div className="d-flex mt-2">
            <div className="flex-shrink-0">
              <img
                className="me-1"
                // src={home}
                // alt={item.title}
                height="38"
                width="38"
              />
            </div>
            <div className="d-flex align-item-center justify-content-between flex-grow-1">
              <div className="me-1">
                <p className="fw-bolder mb-0"> آدرس کاربر</p>
                <strong></strong>
              </div>
            </div>
          </div> */}
        </CardBody>
      </Card>
    </>
  );
};

export default MoreInFormAboutNew;
