import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useCreateRoom } from "@/http/use-create-room";

const createRoomFormSchema = z.object({
    name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
    description: z.string(),
})

type CreateRoomFormType = z.infer<typeof createRoomFormSchema>

export function CreateRoomForm() {
    const { mutateAsync: createRoom } = useCreateRoom()


    const createRoomForm = useForm<CreateRoomFormType>({
        resolver: zodResolver(createRoomFormSchema),
        defaultValues: {
            name: "",
            description: "",
        }
    })

    async function handleCreateRoom(data: CreateRoomFormType) {
        await createRoom(data)
        createRoomForm.reset()
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle>Criar sala</CardTitle>
                <CardDescription>Crie uma sala para começar a fazer perguntas e receber respostas de I.A.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...createRoomForm}>
                    <form onSubmit={createRoomForm.handleSubmit(handleCreateRoom)} className="flex flex-col gap-8">
                        <FormField 
                            control={createRoomForm.control}
                            name="name" 
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel>Nome da sala</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Digite o nome da sala"/>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )
                            }}
                        />
                        <FormField 
                            control={createRoomForm.control}
                            name="description" 
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel>Descrição da sala</FormLabel>
                                        <FormControl>
                                            <Textarea {...field} placeholder="Digite a descrição da sala"/>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )
                            }}
                        />
                        <Button type="submit" className="w-full">Criar sala</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}