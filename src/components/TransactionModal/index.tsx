import * as Dialog from '@radix-ui/react-dialog'

export function TransactionModal() {
  return (
    <Dialog.Portal>
      <Dialog.Overlay />

      <Dialog.Content>
        <Dialog.Title>Nova transação</Dialog.Title>

        <Dialog.Close />
      </Dialog.Content>
    </Dialog.Portal>
  );
};

// Portal: forma elegante de renderizar um elemento filho, dentro de outro lugar na DOM (a parte da aplicaçao). When used, portals your overlay and content parts into the body. Cria conteúdo fora do contexto da aplicação (root);
// Overlay: A layer that covers the inert portion of the view when the dialog is open.
// Contetn: Conteúdo principal do modal. Possuí title acessível (anunciado quando o modal é aberto, pode ser hidden) e description (decricao opcional acessivel, com opcao de hidden).