import styled from "styled-components";
import * as Dialog from '@radix-ui/react-dialog'

// extendendo componente overlay para estilizar o mesmo. Mas o componente segue sendo Dialog.Overlay

export const Overlay = styled(Dialog.Overlay)`
  position: fixed;
  width: 100vw;
  height: 100vh;
  inset: 0; // top, bottom, right, left
  background: rgba(0, 0, 0, 0.75);
`

export const Content = styled(Dialog.Content)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); 
  // hack para centralizar modal no meio
  // translate relativo ao tamanho do conteúdo em si, diminuindo o posicionamento em 50%

  min-width: 32rem;
  border-radius: 6px;
  background: ${props => props.theme["gray-800"]};
  padding: 2.5rem 3rem;

  form {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    input {
     border-radius: 6px;
     border: 0;
     background: ${props => props.theme["gray-900"]};
     color: ${props => props.theme["gray-300"]};
     padding: 1rem;

     &::placeholder {
      color: ${props => props.theme["gray-500"]};
      }
    } 

    button[type="submit"] {
      height: 50px;
      border: 0;
      background: ${props => props.theme["green-500"]};
      color: ${props => props.theme.white};
      font-weight: bold;
      padding: 0 1.25rem;
      border-radius: 6px;
      margin-top: 1.25rem;
      cursor: pointer;
      &:hover {
        background: ${props => props.theme["green-700"]};
        transition: background-color 0.2s;
      }
    }
  }
`

export const CloseButton = styled(Dialog.Close)`
  position: absolute;
  background: transparent;
  border: 0;
  top: 1.5rem;
  right: 1.5rem;
  line-height: 0; // focus é relativo ao fonte-size, por reduzimos o tamanho da linha para 0
  cursor: pointer;
  color: ${props => props.theme["gray-500"]};
`
