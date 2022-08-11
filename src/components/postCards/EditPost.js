import { useEffect, useRef } from "react";
import styled from "styled-components";

export default function EditPost({edit, setEdit}){
          const inputRef = useRef(null);
        
          useEffect(() => {
            if (edit) {
              inputRef.current.focus();
            }
          }, [edit]);
          
          return (
            <Input>
              {edit && <input ref={inputRef} />}
             
            </Input>
          )
  
}

const Input = styled.div`
background-color: #fff;
height: 44px;
border-radius: 7px;

`