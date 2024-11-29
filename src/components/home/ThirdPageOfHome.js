// ** React Imports
import { useEffect, useState } from "react";

// ** Third Party Components
import axios from "axios";
import Chart from "react-apexcharts";
import { HelpCircle } from "react-feather";

// ** Reactstrap Imports
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardText,
  Row,
  Col,
} from "reactstrap";

const ThirdPageOfHome = (DashBoardReport) => {
  // ** State

  const options = {
    chart: {
      sparkline: {
        enabled: true,
      },
      dropShadow: {
        enabled: true,
        blur: 3,
        left: 1,
        top: 1,
        opacity: 0.1,
      },
    },
    colors: ["#51e5a8"],
    plotOptions: {
      radialBar: {
        offsetY: 10,
        startAngle: -150,
        endAngle: 150,
        hollow: {
          size: "77%",
        },
        track: {
          background: "#ebe9f1",
          strokeWidth: "50%",
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            color: "#5e5873",
            fontFamily: "Montserrat",
            fontSize: "2.86rem",
            fontWeight: "600",
          },
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        shadeIntensity: 0.5,
        gradientToColors: [DashBoardReport.success],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
    },
    stroke: {
      lineCap: "round",
    },
    grid: {
      padding: {
        bottom: 30,
      },
    },
  };
  const ANumber =
    DashBoardReport?.DashBoardReport?.reserveAcceptPercent &&
    DashBoardReport?.DashBoardReport?.reserveAcceptPercent != undefined
      ? DashBoardReport?.DashBoardReport?.reserveAcceptPercent.slice(0, 4)
      : 1;
  const series = [ANumber];

  return DashBoardReport !== null ? (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">وضعیت رزرو</CardTitle>
        <HelpCircle size={18} className="text-muted cursor-pointer" />
      </CardHeader>
      <CardBody className="p-0">
        <Chart
          options={options}
          series={series}
          type="radialBar"
          height={245}
        />
      </CardBody>
      <Row className="border-top text-center mx-0">
        <Col xs="4" className="border-end py-1">
          <CardText className="text-muted mb-0">کل رزرو ها</CardText>
          <h3 className="fw-bolder mb-0">
            {DashBoardReport?.DashBoardReport?.allReserve &&
            DashBoardReport?.DashBoardReport?.allReserve != undefined
              ? DashBoardReport?.DashBoardReport?.allReserve
              : ""}
          </h3>
        </Col>

        <Col xs="4" className="border-end py-1">
          <CardText className="text-muted mb-0"> پذیرفته شده</CardText>
          <h3 className="fw-bolder mb-0">
            {DashBoardReport?.DashBoardReport?.allReserveAccept &&
            DashBoardReport?.DashBoardReport?.allReserveAccept != undefined
              ? DashBoardReport?.DashBoardReport?.allReserveAccept
              : ""}
          </h3>
        </Col>
        <Col xs="4" className="py-1">
          <CardText className="text-muted mb-0">نپذیرفته</CardText>
          <h3 className="fw-bolder mb-0">
            {" "}
            {DashBoardReport?.DashBoardReport?.allReserveNotAccept &&
            DashBoardReport?.DashBoardReport?.allReserveNotAccept != undefined
              ? DashBoardReport?.DashBoardReport?.allReserveNotAccept
              : ""}
          </h3>
        </Col>
      </Row>
    </Card>
  ) : (
    "ssssssssssssssss"
  );
};
export default ThirdPageOfHome;
