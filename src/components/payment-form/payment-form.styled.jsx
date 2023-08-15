import styled from "styled-components";
import { Button } from "../button/Button.component";

export const PaymentFormContainer = styled.div`
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const FormContainer = styled.form`
  height: 100px;
  min-width: 500px;
`;

export const PaymentButton = styled(Button)`
margin-left: auto;
margin-top: 30px;
`;
