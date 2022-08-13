import styled from "styled-components";

export default function StatusCodeScreen({ statusCode }){

    const status = {
        404 : {
            picture: "https://cdn.dribbble.com/userupload/2905354/file/original-92212c04a044acd88c69bedc56b3dda2.png?compress=1&resize=1024x768",
            message: "Hashtag timeline not found"
        },
        204 : {
            picture: "https://cdn.dribbble.com/users/458522/screenshots/7157588/media/737705cec64886f7cc13a6d768b9b36a.jpg?compress=1&resize=800x600&vertical=top",
            message: "This hashtag timeline don't have any post! Make ourself one!"
        }
    }

    return(
        <CodeContainer>
            <img src={status[statusCode].picture} alt="" />
            <h1>{status[statusCode].message}</h1>
        </CodeContainer>
    )
};


const CodeContainer = styled.section`
    display:flex;
    flex-direction: column;
    align-items:center;
    & > img {
        width: 611px;
    }
`
