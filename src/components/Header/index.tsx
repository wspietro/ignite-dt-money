import {
  HeaderContainer,
  HeaderContent,
  NewTransactionButton
} from "./styles";

import * as Dialog from '@radix-ui/react-dialog'

import logoImg from '../../assets/logo.svg'
import { TransactionModal } from "../TransactionModal";

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} alt="" />

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <NewTransactionButton>Nova transação</NewTransactionButton>
          </Dialog.Trigger>

          <TransactionModal />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  );
};


// Root: Contains all the parts of a dialog. Precisa engolbar todo o modal;
// Trigger asChild: Botão para abrir modal. asChild - propriedade que aproveita o elemento dentro da tag como botao para abrir;
// Portal: forma elegante de renderizar um elemento filho, dentro de outro lugar na DOM (a parte da aplicaçao). When used, portals your overlay and content parts into the body. Cria conteúdo fora do contexto da aplicação (root);
// Overlay: A layer that covers the inert portion of the view when the dialog is open.
// Contetn: Conteúdo principal do modal. Possuí title acessível (anunciado quando o modal é aberto, pode ser hidden) e description (decricao opcional acessivel, com opcao de hidden).