import styled from 'styled-components';

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
const AvailableArea = styled.div`
    display: flex;
    min-height: 100vh;
    font-style: normal;
    color: #FFFFFF;
    font-weight: 700;
    h1{
        font-family: 'Passion One';
        letter-spacing: 0.05em;
        font-size: 106px;
        line-height: 117px;
    }

    h2{
        font-family: 'Oswald';       
        font-size: 43px;
        line-height: 64px;
        color: #FFFFFF;
        width: 450px;
    }

     div{
        background: #151515;
        box-shadow: 4px 0px 4px rgba(0, 0, 0, 0.25);
        min-height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-left: 144px;
        padding-right: 10%;
       
      
     }

     span{
        min-width: 550px;
       
        min-height: 100%;
        background-color: #333333;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
     }

     form{
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
     }

     input{
        width: 85%;
        height: 65px;
        background: #FFFFFF;
        border-radius: 6px;
        margin-bottom: 15px;
        border: none;
        text-indent:15px;

     }
     input:focus {
        outline: none;
        border: 2px solid #05e3fc;
     }

     button{
        width: 85%;
        height: 65px;
        background: #1877F2;
        border-radius: 6px;
        border: none;
        cursor: pointer;

        font-family: 'Oswald';
        font-weight: 700;
        font-size: 27px;
        color: #FFFFFF;
     }

     a{
        font-family: 'Lato';
        font-weight: 400;
        font-size: 20px;
        line-height: 24px;
        text-decoration-line: underline;
        color: #FFFFFF;
        margin-top: 15px;
     }

     @media(max-width: 1275px) {
        h2{
            width: 100%;
        }
     }


     @media(max-width: 1050px) {
        div{
            padding-left: 50px;
            padding-right: 50px;
        }
     }

     @media(max-width: 900px) {
        h2{
            font-size: 30px;
        }
        h1{
            font-size: 70px;
        }
     }

     @media(max-width: 810px) {
        display: block;
        div{
            min-height: 27vh;
            margin-bottom: 40px;
            display: flex;
            flex-direction: column;
            padding: 0;
            align-items: center;
        }
        span{
            min-width: 100%;
        }

        h1{
            font-size: 76px;
        }
        h2{
            font-family: 'Oswald';
            font-size: 23px;
            line-height: 34px;
            font-size: 23px;
            text-align: center;
            width: 70%;
        }
     }


`