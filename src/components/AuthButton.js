import styled from 'styled-components';

export default function AuthButton({buttonText, isDisabled}){
    return(
        <Button buttonBackground={isDisabled ? 'grey' : '#3B78F2'} disabled={isDisabled}>
            {buttonText}
        </Button>
    );
}

const Button = styled.button`
         width: 85%;
        height: 65px;
        background: ${props => props.buttonBackground};
        border-radius: 6px;
        border: none;
        cursor: pointer;
        transition: background-color 0.3s;

        font-family: 'Oswald';
        font-weight: 700;
        font-size: 27px;
        color: #FFFFFF;

        &:hover {
            background-color: #1659e0;
        }

`