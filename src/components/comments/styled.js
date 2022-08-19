import styled from 'styled-components';


const MainContainer = styled.div`
background-color: #1E1E1E;
background-color: red;
display: flex;
flex-direction: column;
align-items: baseline;
min-width: 100%;
`

const CommentsContainer = styled.div`
    background-color: green;
    max-height: 300px;
    max-width: 611px;
    background-color: #1E1E1E;
    padding: 25px;
    padding-top: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
    overflow-y: scroll;
   

    

    img{
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }



`

const CommentInput = styled.div`
    display: flex;
    position: relative;
    
   
    input{
        width: 100%;
        height: 39px;
     
        background: ${props => (props.isInputDisabled ? `grey` : `#252525`)};
        
        border-radius: 8px;
        margin-left: 15px;
        text-indent:15px;
        color: white;


        &::placeholder{
            font-family: 'Lato';
            font-style: italic;
            font-weight: 400;
            font-size: 14px;
            line-height: 17px;
            letter-spacing: 0.05em;

            color: #575757;
        }

       
         
        
    }

    .input-icon{
        color: #F3F3F3;
        font-size: 17px;
        position: absolute;
        right: 10px;
        top: 12px;
        cursor: pointer;
    }
`

const Comments = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: scroll;
    margin-bottom: 20px;
   
   
   
    

    
    p{
        color: #dddd;
        width: 60%;
        text-align: center;
        margin-top: 27px;
        margin-bottom: 20px;

    }

    h1,h2,h3{
        font-family: 'Lato';
        font-weight: 700;
        font-size: 14px;
        line-height: 17px;
        color: #F3F3F3;
    }
    h2{
        color: #ACACAC;
        font-weight: 400;
        overflow-wrap: break-word;
        margin-right: 10px;
        }
    h3{
        font-weight: 400;
        color: #565656;
        margin-left: 5px;
    }


    .commenter-div{
        width: 100%;
        display: flex;
        border-bottom: 1px solid #353535;
        align-items: center;
        padding-bottom: 15px;
        padding-top: 15px;
    }
    span{
        margin-left: 18px;
        overflow: hidden;
    }

    .commenter-title{
        display: flex;
    }
`





export {CommentsContainer, CommentInput, Comments, MainContainer};