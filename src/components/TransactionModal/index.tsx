import * as Dialog from '@radix-ui/react-dialog'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react';
import {
  CloseButton,
  Content,
  Overlay,
  TransactionType,
  TransactionTypeButton
} from './styles';

export function TransactionModal() {
  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <Dialog.Title>Nova transação</Dialog.Title>

        <CloseButton>
          <X size={24} />
        </CloseButton>

        <form action="">
          <input type="text" placeholder="Descrição" required />
          <input type="number" placeholder="Preço" required />
          <input type="text" placeholder="Categoria" required />

          <TransactionType>
            <TransactionTypeButton variant='income'>
              <ArrowCircleUp size={24} />
              Entrada
            </TransactionTypeButton>

            <TransactionTypeButton variant='outcome'>
              <ArrowCircleDown size={24} />
              Saída
            </TransactionTypeButton>
          </TransactionType>

          <button type="submit">
            Cadastrar
          </button>
        </form>

      </Content>
    </Dialog.Portal>
  );
};

// Portal: forma elegante de renderizar um elemento filho, dentro de outro lugar na DOM (a parte da aplicaçao). When used, portals your overlay and content parts into the body. Cria conteúdo fora do contexto da aplicação (root);
// Overlay: A layer that covers the inert portion of the view when the dialog is open.
// Contetn: Conteúdo principal do modal. Possuí title acessível (anunciado quando o modal é aberto, pode ser hidden) e description (decricao opcional acessivel, com opcao de hidden).