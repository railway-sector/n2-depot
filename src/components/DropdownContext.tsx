import { useState, use } from "react";
import Select from "react-select";
import "../index.css";
import { MyContext } from "../contexts/MyContext";
import { defaultName, dropdownData } from "../uniqueValues";

export default function DropdownData() {
  const { updateBuildings } = use(MyContext);
  const [building, setBuilding] = useState<null | any>({ name: defaultName });

  // handle change event of the Municipality dropdown
  const handleBuildingChange = (obj: any) => {
    setBuilding(obj);
    updateBuildings(obj.name);
  };

  // Style CSS
  const customstyles = {
    option: (styles: any, { isFocused, isSelected }: any) => {
      // const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: isFocused
          ? "#999999"
          : isSelected
            ? "#2b2b2b"
            : "#2b2b2b",
        color: "#ffffff",
        width: "200px",
      };
    },

    control: (defaultStyles: any) => ({
      ...defaultStyles,
      backgroundColor: "#2b2b2b",
      borderColor: "#949494",
      color: "#ffffff",
      touchUi: false,
      width: "200px",
    }),
    singleValue: (defaultStyles: any) => ({ ...defaultStyles, color: "#fff" }),
  };

  return (
    <div className="dropdownFilterLayout">
      <div
        style={{
          color: "white",
          fontSize: "0.85rem",
          margin: "auto",
          paddingRight: "0.5rem",
        }}
      ></div>
      <Select
        placeholder="Select Building"
        value={building}
        options={dropdownData}
        onChange={handleBuildingChange}
        getOptionLabel={(x: any) => x.name}
        styles={customstyles}
      />
    </div>
  );
}
