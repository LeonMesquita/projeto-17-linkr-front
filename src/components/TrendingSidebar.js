import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import styled from "styled-components";

export default function TrendingSideBar( { } ){
    // const navigate = useNavigate();
    const [trendings, setTrendings] = useState([
        "javascript",
        "react",
        "react-native",
        "material",
        "web-dev",
        "mobile",
        "css",
        "html",
        "node",
        "sql"
    ]);


    return(
        <Container>
            <Title>
                <h1>trending</h1>
            </Title>
            <Divisor />
            <Content>
                {
                    trendings.map( trending => {
                        return (
                            <Hashtag>
                                <Link to={`/hashtag/${trending}`}>
                                    # {trending}
                                </Link>
                            </Hashtag>
                        )
                    })
                }
            </Content>
        </Container>
    )
};

const Container = styled.aside`
    display:flex;
    flex-direction: column;

    width: 301px;
    border-radius: 16px;

    background: #171717;
    
    header, main{
        h1, a{
            font-weight: 700;
            color: #FFFFFF;
        }
    }
`;

const Title = styled.header`
    padding: 10px 16px;
    h1{
        font-family: 'Oswald';
        font-size: 27px;
        line-height: 40px;
    }
`;

const Divisor = styled.div`
    border-top: 1px solid #484848;
`;

const Content = styled.main`
    display: flex;
    flex-direction: column;
    padding: 20px 16px;
    div:first-of-type{
        margin-top: 0px;
    }
    div:last-of-type{
        margin-bottom: 0px;
    }
`;

const Hashtag = styled.div`
    margin: 2.5px 0px;
    a{
        word-break: break-all;
        font-size: 19px;
        line-height: 23px;
        letter-spacing: 0.05em;
    }
`
