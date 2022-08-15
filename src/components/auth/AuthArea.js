import { AvailableArea } from "./style";

export default function AuthArea(props){
    return(
        <AvailableArea>
            <div>
                <h1>linkr</h1>
                <h2>save, share and discover the best links on the web</h2>
            </div>
            <span>
                {props.children}
            </span>
        </AvailableArea>
    );
}
