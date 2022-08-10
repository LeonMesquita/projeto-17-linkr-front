import TokenContext from "../../contexts/TokenContext";

import axios from "axios";
import Modal from "react-modal";

import styled from "styled-components";
import { useContext } from "react";

export default function DeletePost({erase, setErase}){
    const {token} = useContext(TokenContext)
    function toggleModal() {
    
        setErase(!erase);
      }
    // function deletePost(id){
    //      setErase(!erase);
    //     //requisição de delete
    //     const config = {
    //         headers: {
    //             Authorization: `Bearer ${token}`,
    //         },
    //     };
    //     axios.delete(`localhost:4000/delete-post/${id}`,config)
    //     .then(res=>{  
    //         // setloading true
    //           setErase(false)})
    //     .catch(err => {
    //         console.log(err.response)
    //         alert("não foi possível deletar o post")
    //           setErase(false)
    //     })
    // }
    return(
        <Modal
                isOpen={erase}
                onRequestClose={toggleModal}
                style={customStyles}
                // onAfterOpen={afterOpenModal}
                contentLabel="Example Modal"
              >
                <ModalStyle>
                  <p>Are you sure you want to delete this post?</p>
                  <div className="buttons" >
                  <button id="decline" onClick={toggleModal}  >No, go back</button>
                  <button id="accept"
                //    onClick={()=>deletePost(postId)}
                    >Yes, delete it</button>

                  </div>
                </ModalStyle>
              </Modal>
    )
}

const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#333",
      borderRadius: "50px",
      minWidth: "300px",
      minHeight: "162px",
    },
  };
  
  const ModalStyle = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
  
    p{
      font-size: 34px;
      font-weight: 700;
      color: #fff;
      text-align: center;
    }
    .buttons{
      width: 100%;
      display: flex;
      justify-content: center;
    }
    button{
      margin-top: 30px;
      margin-left: 15px;
      margin-right: 15px;
      background-color: #fff;
      border-radius: 5px;
      height: 37px ;
      padding: 10px;
      font-size: 18px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 700;
      
    }
    button:hover{
      filter: brightness(1.2);
      transition: (0.5s);
      cursor: pointer;
    }
    #accept{
      background-color: #1877F2;
      color: #fff;
    }
    #decline{
      background-color: #fff;
      color: #1877F2 ;
    }
    @media screen and (max-width: 431px) {
  
      p{
          font-size: 20px;
      }
      button{
          height: 30px;
          font-size: 15px;
      }
    }
  
  `;
  