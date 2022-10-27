import * as Dialog from '@radix-ui/react-dialog'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react';
import { Controller, useForm } from 'react-hook-form';
import {
  CloseButton,
  Content,
  Overlay,
  TransactionType,
  TransactionTypeButton
} from './styles';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'


const newTransactionFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(['income', 'outcome']),
});

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>


export function TransactionModal() {
  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(newTransactionFormSchema),
    // Botao de entrada iniciará clicado. Value do Transaction type;
    defaultValues: {
      type: 'income',
    }
  });

  async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log(data);
  }

  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <Dialog.Title>Nova transação</Dialog.Title>

        <CloseButton>
          <X size={24} />
        </CloseButton>

        <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <input
            type="text"
            placeholder="Descrição"
            required
            {...register('description')}
          />
          <input
            type="number"
            placeholder="Preço"
            required
            {...register('price', { valueAsNumber: true })}
          />
          <input
            type="text"
            placeholder="Categoria"
            required
            {...register('category')}
          />

          <Controller
            control={control}
            name="type"
            render={({ field }) => {
              return (
                <TransactionType
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <TransactionTypeButton variant='income' value='income'>
                    <ArrowCircleUp size={24} />
                    Entrada
                  </TransactionTypeButton>

                  <TransactionTypeButton variant='outcome' value='outcome'>
                    <ArrowCircleDown size={24} />
                    Saída
                  </TransactionTypeButton>
                </TransactionType>
              )
            }}
          />

          <button type="submit" disabled={isSubmitting}>
            Cadastrar
          </button>
        </form>

      </Content>
    </Dialog.Portal >
  );
};

// Portal: forma elegante de renderizar um elemento filho, dentro de outro lugar na DOM (a parte da aplicaçao). When used, portals your overlay and content parts into the body. Cria conteúdo fora do contexto da aplicação (root);
// Overlay: A layer that covers the inert portion of the view when the dialog is open.
// Contetn: Conteúdo principal do modal. Possuí title acessível (anunciado quando o modal é aberto, pode ser hidden) e description (decricao opcional acessivel, com opcao de hidden).