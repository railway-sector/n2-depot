import { useEffect, useState, use } from "react";
import Select from "react-select";
import "../index.css";
import { MyContext } from "../App";
import { defaultName, dropdownData } from "../dropdownData";

export default function DropdownData() {
  const { updateBuildingName } = use(MyContext);
  const [building, setBuilding] = useState<null | any>();

  useEffect(() => {
    setBuilding({ name: defaultName });
  }, []);

  const handleBuildingNameChange = (obj: any) => {
    setBuilding(obj);
    updateBuildingName(obj.name);
  };

  return (
    <>
      <DropdownListDisplay
        handleBuildingNameChange={handleBuildingNameChange}
        building={building}
      ></DropdownListDisplay>
    </>
  );
}

export function DropdownListDisplay({
  handleBuildingNameChange,
  building,
}: any) {
  // Style CSS
  const customstyles = {
    option: (styles: any, { data, isDisabled, isFocused, isSelected }: any) => {
      // const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: isFocused
          ? "#999999"
          : isSelected
          ? "#2b2b2b"
          : "#2b2b2b",
        color: "#ffffff",
      };
    },

    container: (provided: any) => ({
      ...provided,
      width: 200,
    }),

    control: (defaultStyles: any) => ({
      ...defaultStyles,
      backgroundColor: "#2b2b2b",
      borderColor: "#949494",
      color: "#ffffff",
      touchUi: false,
    }),
    singleValue: (defaultStyles: any) => ({ ...defaultStyles, color: "#fff" }),
  };

  return (
    <div
      className="dropdownFilterLayout"
      style={{ display: "flex", flexDirection: "row", margin: "auto" }}
    >
      <div
        style={{
          color: "white",
          fontSize: "0.85rem",
          margin: "auto",
          paddingRight: "0.5rem",
        }}
      >
        Building
      </div>
      <Select
        placeholder="Select Building"
        value={building}
        options={dropdownData}
        onChange={handleBuildingNameChange}
        getOptionLabel={(x: any) => x.name}
        styles={customstyles}
      />
    </div>
  );
}
