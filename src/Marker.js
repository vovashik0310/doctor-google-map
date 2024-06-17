import { FaMapMarkerAlt } from "react-icons/fa";

const colorSets = [
  "rgb(251,201,43)",
  "rgb(243,125,73)",
  "rgb(254,31,86)",
  "rgb(205,41, 162)",
  "rgb(152,44,200)",
  "rgb(111,48,243)",
  "rgb(75, 105, 246)",
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
