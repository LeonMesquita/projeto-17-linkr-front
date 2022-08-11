import {ThreeDots} from "react-loader-spinner"
import styled from "styled-components"

export default function Loading(){
    return (<Style>
         <ThreeDots 
         type = "ThreeDots"
         color ="#FFF"
         heigth = {20}
         width={20}
         timeout = {3000}
         />
          </Style>)
}

const Style = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 100%;
height: 100%;
`