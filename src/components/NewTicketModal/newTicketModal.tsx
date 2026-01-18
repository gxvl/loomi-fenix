"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useCreateTicket } from "@/src/hooks/queries/useCreateTicket";
import { ticketForm, ticketFormSchema } from "@/src/validations/ticket";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import InputField from "../InputField/inputField";

interface NewTicketModalProps {
  trigger: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const NewTicketModal = ({
  trigger,
  isOpen,
  setIsOpen
}: NewTicketModalProps) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid }
  } = useForm<ticketForm>({
    mode: "all",
    criteriaMode: "all",
    resolver: zodResolver(ticketFormSchema)
  });

  const { mutate: createTicket, isPending } = useCreateTicket();

  const onSubmit = (data: ticketForm) => {
    // Gera um ticketId único baseado no timestamp
    const ticketId = `TK${Date.now().toString().slice(-6)}`;

    createTicket(
      {
        ticketId,
        priority: data.priority,
        client: data.name,
        email: data.email,
        subject: data.subject,
        status: "Aberto",
        responsible: data.responsible
      },
      {
        onSuccess: () => {
          toast.success("Ticket criado com sucesso!");
          reset();
          setIsOpen(false);
        },
        onError: (error: any) => {
          toast.error(error?.response?.data?.message || "Erro ao criar ticket");
        }
      }
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="bg-default-blue w-full max-w-xl rounded-2xl border-none p-0">
        <div className="flex flex-col gap-6 p-8">
          <DialogHeader>
            <DialogTitle className="text-2xl text-white">
              Novo Ticket
            </DialogTitle>
            <DialogDescription className="font-inter text-sm text-gray-400">
              Preencha os dados abaixo para registrar um novo ticket na
              plataforma.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4">
            {/* Nome do cliente */}
            <div className="flex flex-col gap-2">
              <InputField
                label="Nome do cliente"
                register={register}
                name="name"
                type="text"
                formErrors={errors}
                placeholder="Nome da pessoa ou empresa que está solicitando o suporte"
                className="bg-card-blue border border-[#2F3445]"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <InputField
                label="Email"
                name="email"
                register={register}
                formErrors={errors}
                type="email"
                placeholder="E-mail de contato para atualizações e resposta"
                className="bg-card-blue border border-[#2F3445]"
              />
            </div>

            {/* Prioridade */}
            <div className="flex flex-col gap-2">
              <label className="font-inter text-sm font-medium text-white">
                Prioridade
              </label>
              <Controller
                name="priority"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="bg-card-blue w-full rounded-xl border border-[#2F3445] px-3 py-6 text-white">
                      <SelectValue
                        placeholder="Selecione o nível de urgência do atendimento"
                        className="text-[#898C96]"
                      />
                    </SelectTrigger>
                    <SelectContent className="font-inter bg-default-blue border-border-gray text-white">
                      <SelectItem value="Baixa">Baixa</SelectItem>
                      <SelectItem value="Média">Média</SelectItem>
                      <SelectItem value="Urgente">Urgente</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.priority && (
                <span className="text-xs text-red-500">
                  {errors.priority.message}
                </span>
              )}
            </div>

            {/* Responsável */}
            <div className="flex flex-col gap-2">
              <InputField
                label="Responsável"
                type="text"
                name="responsible"
                register={register}
                formErrors={errors}
                placeholder="Quem será o responsável por esse ticket"
                className="bg-card-blue border border-[#2F3445]"
              />
            </div>

            {/* Assunto */}
            <div className="flex flex-col gap-2">
              <InputField
                label="Assunto"
                placeholder="Resumo breve do problema ou solicitação"
                name="subject"
                register={register}
                formErrors={errors}
                className="bg-card-blue border border-[#2F3445]"
              />
            </div>
          </div>

          {/* Botões */}
          <div className="flex justify-center gap-3">
            <Button
              type="button"
              onClick={() => {
                reset();
                setIsOpen(false);
              }}
              variant="secondary"
              disabled={isPending}
              className="w-max rounded-2xl border border-white bg-transparent px-7 py-5 text-white hover:bg-gray-800"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              onClick={handleSubmit(onSubmit)}
              variant={"default"}
              disabled={!isValid || isPending}
              className="w-max rounded-2xl bg-[#2776D2] px-10 py-5 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isPending ? "Salvando..." : "Salvar"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
