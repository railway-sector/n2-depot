export const type_field = "Type";
export const status_field = "Status";
export const category_field = "Category";
export const building_field = "Name";
export const statusStateValues = [1, 2, 3, 4];

//--- type definitions
export type StatusTypenamesType =
  | "To be Constructed"
  | "Under Construction"
  | "delayed"
  | "Completed";
export type StatusStateType = "comp" | "incomp" | "ongoing" | "delayed";
export type LayerNameType = "utility" | "viaduct" | "others";
export type TypeFieldType = "number" | "string";

// Media parameters
export const image_scales = [1.0, 1.2, 1.4, 1.6, 1.8, 2.0, 2.2, 2.4];
export const img_size = 280;
export const timestamp_field = "timestamp";

// month
export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const buildingName_field = "Name";

//--- building types
export const building_category_labels = [
  "St.Foundation",
  "St.Column",
  "St.Framing",
  "Roofs",
  "Floors",
  "Walls",
  "Columns",
  "Others",
];

// building name list
export const defaultName = "TRC";
export const dropdownData = [
  {
    name: "BPS",
  },
  {
    name: "CER",
  },
  {
    name: "CMV",
  },
  {
    name: "CNT",
  },
  {
    name: "CPS",
  },
  {
    name: "CWT",
  },
  {
    name: "DB1",
  },
  {
    name: "DB2",
  },
  {
    name: "DBS1",
  },
  {
    name: "DBS2",
  },
  {
    name: "DHS",
  },
  {
    name: "DSP",
  },
  {
    name: "DSS",
  },
  {
    name: "FP1",
  },
  {
    name: "LGS",
  },
  {
    name: "LOS",
  },
  {
    name: "LRS",
  },
  {
    name: "MCS",
  },
  {
    name: "MPS",
  },
  {
    name: "OCC",
  },
  {
    name: "SCS",
  },
  {
    name: "SH1",
  },
  {
    name: "SH2",
  },
  {
    name: "TGB",
  },
  {
    name: "TMO",
  },
  {
    name: "TRC",
  },
  {
    name: "UCS",
  },
  {
    name: "URS",
  },
  {
    name: "WGS",
  },
  {
    name: "WOS",
  },
  {
    name: "WP1",
  },
  {
    name: "WP2",
  },
  {
    name: "WRS",
  },
  {
    name: "WS",
  },
];

export const building_category_field = "Type";
export const building_category_values = [1, 2, 3, 4, 5, 6, 7, 8];
export const buildingCategoryTypes = building_category_labels.map(
  (label: any, index: any) => {
    return Object.assign({
      category: label,
      value: building_category_values[index],
    });
  },
);

export const statusLabels = ["incomp", "ongoing", "delayed", "comp"];
export const statusValues = [1, 2, 3, 4];
export const statusArray = statusLabels.map((status: any, index: any) => {
  return Object.assign({
    status: status,
    value: statusValues[index],
  });
});

//--- chart parameters
export const chart_colors = ["#000000", "#f7f7f7ff", "#FF0000", "#0070ff"];
