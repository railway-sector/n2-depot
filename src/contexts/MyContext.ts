import { createContext } from "react";

type MyDropdownContextType = {
  buildings: any;
  chartPanelwidth: any;
  updateBuildings: any;
  updateChartPanelwidth: any;
};

const initialState = {
  buildings: undefined,
  updateBuildings: undefined,
  chartPanelwidth: undefined,
  updateChartPanelwidth: undefined,
};

export const MyContext = createContext<MyDropdownContextType>({
  ...initialState,
});
