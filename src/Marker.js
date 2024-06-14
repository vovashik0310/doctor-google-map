import { FaMapMarkerAlt } from "react-icons/fa"

const colorSets = ["red", "purple", "lime", "amber", "blue", "deep purple", "brown"]

const Marker = ({text, tooltip, $hover}) => {
    const handleClick = () => {
      console.log(`You clicked on ${tooltip}`)
    }
    return (
        <FaMapMarkerAlt style={{width:36, height:36, color:colorSets[1]}} tooltip={tooltip} onClick={() => alert(tooltip)} />
    )
}

  export default Marker;