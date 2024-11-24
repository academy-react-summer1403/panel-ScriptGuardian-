// ** React Imports
import { useSkin } from "@hooks/useSkin";
import { Link, useNavigate } from "react-router-dom";

// ** Icons Imports
import { Facebook, Twitter, Mail, GitHub } from "react-feather";

// ** Custom Components
import InputPasswordToggle from "@components/input-password-toggle";

// ** Reactstrap Imports
import {
  Row,
  Col,
  CardTitle,
  CardText,
  Form,
  Label,
  Input,
  Button,
} from "reactstrap";

// ** Illustrations Imports
import illustrationsLight from "@src/assets/images/pages/login-v2.svg";
import illustrationsDark from "@src/assets/images/pages/login-v2-dark.svg";

// ** Styles
import "@styles/react/pages/page-authentication.scss";
// import toast from "react-hot-toast";
import { useFormik } from "formik";

import { useLogin } from "../core/services/api/Auth/Login/Login";
import { validationSchema } from "../core/services/validation/validationSchema/Auth";
import { getItem, setItem } from "../core/services/storage/storage.services";
import { toast } from "react-toastify";
import { useEffect } from "react";
const Login = () => {
  const { skin } = useSkin();

  const source = skin === "dark" ? illustrationsDark : illustrationsLight;

  const navigate = useNavigate();

  const { mutate: login, isError, data } = useLogin();
  console.log("this use login Data", data);
  const token = getItem("token");

  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      phoneOrGmail: "",
      password: "",
      rememberMe: false,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      login(values, {
        onSuccess: (data) => {
          if (data.success) {
            setItem("token", data.token);
            setItem("id", data.id);
            setItem("roles", data.roles);
            console.log(data.roles, "data roles");
            const roles = localStorage.getItem("roles");
            if (roles.includes("Administrator" || "Referee")) {
              toast.success("ورود با موفقیت انجام شد");

              navigate("/home");
            } else {
              toast.error("بدون رول ادمین یا معلم نمی تونید وارد شید  ");
            }
          } else {
            toast.error("ورود ناموفق بود");
          }
        },
        // onError: (error) => {

        // },
      });
    },
  });

  return (
    <div className="auth-wrapper auth-cover">
      <Row className="auth-inner m-0">
        <Link className="brand-logo" to="/" onClick={(e) => e.preventDefault()}>
          <svg viewBox="0 0 139 95" version="1.1" height="28">
            <defs>
              <linearGradient
                x1="100%"
                y1="10.5120544%"
                x2="50%"
                y2="89.4879456%"
                id="linearGradient-1"
              >
                <stop stopColor="#000000" offset="0%"></stop>
                <stop stopColor="#FFFFFF" offset="100%"></stop>
              </linearGradient>
              <linearGradient
                x1="64.0437835%"
                y1="46.3276743%"
                x2="37.373316%"
                y2="100%"
                id="linearGradient-2"
              >
                <stop stopColor="#EEEEEE" stopOpacity="0" offset="0%"></stop>
                <stop stopColor="#FFFFFF" offset="100%"></stop>
              </linearGradient>
            </defs>
            <g
              id="Page-1"
              stroke="none"
              strokeWidth="1"
              fill="none"
              fillRule="evenodd"
            >
              <g id="Artboard" transform="translate(-400.000000, -178.000000)">
                <g id="Group" transform="translate(400.000000, 178.000000)">
                  <path
                    d="M-5.68434189e-14,2.84217094e-14 L39.1816085,2.84217094e-14 L69.3453773,32.2519224 L101.428699,2.84217094e-14 L138.784583,2.84217094e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L6.71554594,44.4188507 C2.46876683,39.9813776 0.345377275,35.1089553 0.345377275,29.8015838 C0.345377275,24.4942122 0.230251516,14.560351 -5.68434189e-14,2.84217094e-14 Z"
                    id="Path"
                    className="text-primary"
                    style={{ fill: "currentColor" }}
                  ></path>
                  <path
                    d="M69.3453773,32.2519224 L101.428699,1.42108547e-14 L138.784583,1.42108547e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L32.8435758,70.5039241 L69.3453773,32.2519224 Z"
                    id="Path"
                    fill="url(#linearGradient-1)"
                    opacity="0.2"
                  ></path>
                  <polygon
                    id="Path-2"
                    fill="#000000"
                    opacity="0.049999997"
                    points="69.3922914 32.4202615 32.8435758 70.5039241 54.0490008 16.1851325"
                  ></polygon>
                  <polygon
                    id="Path-2"
                    fill="#000000"
                    opacity="0.099999994"
                    points="69.3922914 32.4202615 32.8435758 70.5039241 58.3683556 20.7402338"
                  ></polygon>
                  <polygon
                    id="Path-3"
                    fill="url(#linearGradient-2)"
                    opacity="0.099999994"
                    points="101.428699 0 83.0667527 94.1480575 130.378721 47.0740288"
                  ></polygon>
                </g>
              </g>
            </g>
          </svg>
          <h2 className="brand-text text-primary ms-1">اسکریپت گاردین</h2>
        </Link>
        <Col className="d-none d-lg-flex align-items-center p-5" lg="8" sm="12">
          <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
            <img className="img-fluid" src={source} alt="Login Cover" />
          </div>
        </Col>
        <Col
          className="d-flex align-items-center auth-bg px-2 p-lg-5"
          lg="4"
          sm="12"
        >
          <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
            <CardTitle tag="h2" className="fw-bold mb-1">
              به پنل اسکریپت گاردین خوش امدید{" "}
            </CardTitle>
            <CardText className="mb-2">
              لطفاً وارد حساب کاربری خود شوید و ماجراجویی را آغاز کنید.
            </CardText>
            <form
              className="auth-login-form mt-2"
              // onSubmit={(e) => e.preventDefault()}
              onSubmit={formik.handleSubmit}
            >
              <div className="mb-1">
                <Label className="form-label" for="login-email">
                  ایمیل
                </Label>
                <Input
                  type="text"
                  id="phoneOrGmail"
                  name="phoneOrGmail"
                  placeholder="john@example.com"
                  autoFocus
                  {...formik.getFieldProps("phoneOrGmail")}
                />
                {formik.errors.phoneOrGmail && (
                  <div className="dark:text-red-800 text-red-600 absolute top-[110px] right-11">
                    {formik.errors.phoneOrGmail}
                  </div>
                )}
              </div>
              <div className="mb-1">
                <div className="d-flex justify-content-between">
                  <Label className="form-label" for="login-password">
                    رمز عبور
                  </Label>
                  <Link to="/forgot-password">
                    <small> رمز خود را فراموش کردید؟ </small>
                  </Link>
                </div>
                <InputPasswordToggle
                  className="input-group-merge"
                  id="password"
                  name="password"
                  {...formik.getFieldProps("password")}
                />

                {formik.errors.password && (
                  <div className="dark:text-red-800 text-red-600 absolute top-[110px] right-11">
                    {formik.errors.password}
                  </div>
                )}
              </div>
              <div className="form-check mb-1">
                <Input type="checkbox" id="remember-me" />
                <Label className="form-check-label" for="remember-me">
                  مرا به خاطر بسپار{" "}
                </Label>
              </div>
              <Button type="submit" color="primary" block>
                Sign in
              </Button>
            </form>

            <p className="text-center mt-2">
              <span className="me-25">New on our platform?</span>
              <Link to="/register">
                <span>Create an account</span>
              </Link>
            </p>
            <div className="divider my-2">
              <div className="divider-text">or</div>
            </div>
            <div className="auth-footer-btn d-flex justify-content-center">
              <Button color="facebook">
                <Facebook size={14} />
              </Button>
              <Button color="twitter">
                <Twitter size={14} />
              </Button>
              <Button color="google">
                <Mail size={14} />
              </Button>
              <Button className="me-0" color="github">
                <GitHub size={14} />
              </Button>
            </div>
          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
