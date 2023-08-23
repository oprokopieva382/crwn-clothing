import styled from "styled-components";

export const AuthenticationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 900px;
  margin: 30px auto;
  transition: width 0.3s ease;

  @media screen and (max-width: 800px) {
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 20px;
  }
`;