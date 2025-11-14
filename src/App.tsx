import { useRoutes, useLocation } from "react-router-dom";
// @ts-ignore
import routes from "~react-pages";
import BaseLayout from "./layouts/BaseLayout";
import CustomizationLayout from "./layouts/SecondLayout";

export default function App() {
  const location = useLocation();
  const element = useRoutes(routes);

  // Define layout groups
  const baseLayoutRoutes = ["/"];
  const customizationLayoutRoutes = [
    "/customization",
    "/customization/select-character",
    "/customization/select-template",
    "/customization/customize-character",
    "/checkout",
    "/customization/background-customization",
    "/payment",
    "/orders",
    "/appTour/character-look",
    "/appTour/checkout",
    "/appTour/payment",
  ];

  // Pick layout based on current path
  if (customizationLayoutRoutes.includes(location.pathname)) {
    return <CustomizationLayout>{element}</CustomizationLayout>;
  }

  if (baseLayoutRoutes.includes(location.pathname)) {
    return <BaseLayout>{element}</BaseLayout>;
  }

  // Default fallback layout
  return <BaseLayout>{element}</BaseLayout>;
}
