import { FaMapMarkerAlt } from "react-icons/fa";

const colorSets = [
  "#FF5733",
  "#3498DB",
  "#2ECC71",
  "#F1C40F",
  "#9B59B6",
  "#E67E22",
  "#1ABC9C",
];

const Marker = ({ text, tooltip, colorId }) => {
  const handleClick = () => {
    console.log(`You clicked on ${tooltip}`);
  };
  return (
    <FaMapMarkerAlt
      style={{ width: 36, height: 36, color: colorSets[colorId] }}
      tooltip={tooltip}
      onClick={() => alert(tooltip)}
    />
  );
};

export default Marker;
