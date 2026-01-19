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
import { useGetTicket } from "@/src/hooks/queries/useGetTicket";
import { useUpdateTicket } from "@/src/hooks/queries/useUpdateTicket";
import { ticketForm, ticketFormSchema } from "@/src/validations/ticket";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import InputField from "../InputField/inputField";
import LoadingComponent from "../LoadingComponent/loading";

interface EditTicketModalProps {
  trigger: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  ticketId: string;
}

export const EditTicketModal = ({
  trigger,
  isOpen,
  setIsOpen,
  ticketId
}: EditTicketModalProps) => {
  const { data: ticketData, isLoading: isLoadingTicket } = useGetTicket(
    ticketId,
    isOpen
  );

  const { mutate: updateTicket, isPending } = useUpdateTicket();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid }
  } = useForm<ticketForm>({
    mode: "all",
    criteriaMode: "all",
    resolver: zodResolver(ticketFormSchema),
    defaultValues: {
      name: "",
      email: "",
      priority: "",
      responsible: "",
      subject: ""
    }
  });

  useEffect(() => {
    if (ticketData && isOpen) {
      const sourceData = ticketData.data || ticketData;

      console.log("Dados para reset:", sourceData);

      reset({
        name: sourceData.client,
        email: sourceData.email,
        priority: sourceData.priority,
        responsible: sourceData.responsible,
        subject: sourceData.subject
      });
    }
  }, [ticketData, isOpen, reset]);

  const onSubmit = (data: ticketForm) => {
    if (!ticketId) return;

    updateTicket(
      {
        id: ticketId,
        data: {
          priority: data.priority,
          client: data.name,
          email: data.email,
          subject: data.subject,
          responsible: data.responsible
        }
      },
      {
        onSuccess: () => {
          toast.success("Ticket atualizado com sucesso!");
          setIsOpen(false);
          reset();
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (error: any) => {
          toast.error(
            error?.response?.data?.message || "Erro ao atualizar ticket"
          );
        }
      }
    );
  };

  const handleClose = () => {
    reset();
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="bg-default-blue w-full max-w-xl rounded-2xl border-none p-0">
        <div className="flex flex-col gap-6 p-8">
          <DialogHeader>
            <DialogTitle className="text-2xl text-white">
              Editar Ticket
            </DialogTitle>
            <DialogDescription className="font-inter text-sm text-gray-400">
              Atualize as informações do ticket abaixo.
            </DialogDescription>
          </DialogHeader>

          {isLoadingTicket ? (
            <div className="flex h-64 items-center justify-center">
              <LoadingComponent />
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <div className="flex flex-col gap-4">
                {/* Nome do cliente */}
                <div className="flex flex-col gap-2">
                  <InputField
                    label="Nome do cliente"
                    register={register}
                    name="name"
                    type="text"
                    // REMOVIDO defaultValue
                    formErrors={errors}
                    placeholder="Nome da pessoa ou empresa"
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
                    placeholder="E-mail de contato"
                    className="bg-card-blue border border-[#2F3445]"
                  />
                </div>

                {/* Prioridade */}
                {/* Prioridade */}
                <div className="flex flex-col gap-2">
                  <label className="font-inter text-sm font-medium text-white">
                    Prioridade
                  </label>
                  <Controller
                    name="priority"
                    control={control}
                    render={({ field }) => (
                      <Select
                        // TRUQUE 1: key={field.value}
                        // Isso força o componente a atualizar visualmente quando os dados chegam
                        key={field.value}
                        // Mantemos o controle do React Hook Form
                        onValueChange={field.onChange}
                        value={field.value}
                        // TRUQUE 2: Passar defaultValue também ajuda o Radix a se localizar
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="bg-card-blue w-full rounded-xl border border-[#2F3445] px-3 py-6 text-white">
                          <SelectValue placeholder="Selecione a prioridade" />
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
                    // REMOVIDO O defaultValue ERRADO AQUI
                    name="responsible"
                    register={register}
                    formErrors={errors}
                    placeholder="Nome do responsável"
                    className="bg-card-blue border border-[#2F3445]"
                  />
                </div>

                {/* Assunto */}
                <div className="flex flex-col gap-2">
                  <InputField
                    label="Assunto"
                    placeholder="Resumo do problema"
                    name="subject"
                    register={register}
                    formErrors={errors}
                    className="bg-card-blue border border-[#2F3445]"
                  />
                </div>
              </div>

              {/* Botões */}
              <div className="mt-4 flex justify-center gap-3">
                <Button
                  type="button"
                  onClick={handleClose}
                  variant="secondary"
                  disabled={isPending}
                  className="w-max rounded-2xl border border-white bg-transparent px-7 py-5 text-white hover:bg-gray-800"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  variant={"default"}
                  disabled={!isValid || isPending}
                  className="w-max rounded-2xl bg-[#2776D2] px-10 py-5 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isPending ? "Salvando..." : "Salvar"}
                </Button>
              </div>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
