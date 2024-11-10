import { useQuery } from "@tanstack/react-query";
import http from "../../../interceptors/interceptors";
import { ApiRoutes } from "../ApiRoutes/ApiRoutes";

const LandingReport = async () => {
  try {
    const response = await http.get(ApiRoutes.LANDING_REPORT_URL);
    return response;
  } catch (error) {
    return false;
    console.log("This error Four Landing Report.js", error);
  }
};
export const useLandingReport = () => {
  return useQuery({
    queryKey: ["LandingReport"],
    queryFn: LandingReport,
  });
};
