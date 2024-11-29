import { useQuery } from "@tanstack/react-query";
import http from "../../../interceptors/interceptors";
import { ApiRoutes } from "../ApiRoutes/ApiRoutes";

const LandingReport = async () => {
  try {
    const response = await http.get(ApiRoutes.LANDING_REPORT_URL);
    return response;
  } catch (error) {
    console.log("This error For Landing Report.js", error);
    return false;
  }
};
export const useLandingReport = () => {
  return useQuery({
    queryKey: ["LandingReport"],
    queryFn: LandingReport,
  });
};

const DashBoardReport = async () => {
  try {
    const response = await http.get(ApiRoutes.LANDING_REPORT_DASHBOARD_URL);
    return response;
  } catch (error) {
    console.log("This error For DashBoardReport Report.js", error);
    return false;
  }
};
export const useDashBoardReport = () => {
  return useQuery({
    queryKey: ["DashBoardReport"],
    queryFn: DashBoardReport,
  });
};

const DashboardTechnologyReport = async () => {
  try {
    const response = await http.get(ApiRoutes.LANDING_REPORT_TECHNOLOGY_URL);
    return response;
  } catch (error) {
    console.log("This error For DashboardTechnologyReport Report.js", error);
    return false;
  }
};
export const useDashboardTechnologyReport = () => {
  return useQuery({
    queryKey: ["DashboardTechnologyReport"],
    queryFn: DashboardTechnologyReport,
  });
};
