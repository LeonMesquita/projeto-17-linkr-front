import {useEffect, useState} from 'react';
import styled from 'styled-components';

export default function ScrollToTop(){
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if(window.pageYOffset > 300){
            setIsVisible(true);
        }else{
            setIsVisible(false);
        }
    }

    function scroll(){
                         window.scrollTo({
                        top: 0,
                        behavior: 'smooth',
                    });
    }

    return (
    <ScrolButton onClick={scroll}>
        rolar para cima
    </ScrolButton>
    );
}



const ScrolButton = styled.button`
    width: 200px;
    height: 70px;
    background: blue;
    color: white;
    position: fixed;
    top: 100px;
    right: 100px;

`