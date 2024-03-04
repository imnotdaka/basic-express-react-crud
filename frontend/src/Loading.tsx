import ReactLoading from "react-loading";
 
export default function Loading() {
    return (
        <div>
            <ReactLoading
                type="spinningBubbles"
                color="#0000FF"
                height={100}
                width={50}
            />
        </div>
    );
}