import { RotatingLines } from "react-loader-spinner";

const Spinner = () => {

    return (
        <RotatingLines
            strokeColor="white"
            strokeWidth="3"
            animationDuration="0.75"
            width="32"
            visible={true}
        />
    )
}

export default Spinner;
