import { useState } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

export default function TrendingSideBar( { trendings } ){
    
    return(
        <Container>
            <Title>
                <h1>trending</h1>
            </Title>
            <Divisor />
            <Content>
                {
                    trendings.length > 0
                    ?   trendings.map( trending => {
                        return (
                            <Hashtag>
                                <Link to={`/hashtag/${trending}`}>
                                    # {trending}
                                </Link>
                            </Hashtag>
                        )
                        })
                    : <h2>No momento não há nenhuma trending, não esqueça de fazer novos posts usando #, para novas trendings surgirem.</h2>
                    
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
        h1, a, h2{
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
    a, h2{
        font-size: 19px;
        line-height: 23px;
        letter-spacing: 0.05em;
    }
    h2{
        text-align: center;
        word-break: break-word;
    }
`;

const Hashtag = styled.div`
    margin: 2.5px 0px;
    a{
        word-break: break-all;
    }
`
