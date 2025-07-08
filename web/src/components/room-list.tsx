import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatRelativeDate } from "@/utils/format-relative-date";
import type { GetRoomsAPIResponse } from "@/http/types/get-rooms-response";
import { useRooms } from "@/http/use-room";


export function RoomList() {
    const { data, isLoading } = useRooms();
    return (
        <Card>
            <CardHeader>
                <CardTitle>Salas Recentes</CardTitle>
                <CardDescription>Acesso rápido para as salas criadas recentemente</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
                {isLoading ? (
                    <div className="flex items-center justify-center">
                        <Loader2 className="size-6 animate-spin" />
                    </div>
                ) : (
                    data?.map((room: GetRoomsAPIResponse) => {
                        return (
                            <Link to={`/room/${room.id}`} key={room.id} className="flex items-center justify-between p-3 runded-lg brder hover:bg-accent cursor-pointer">
                                <div className="flex-1 flex-col gap-1">
                                    <h3 className="font-medium">{room.name}</h3>
                                    <div className="flex items-center gap-2">
                                        <Badge variant="secondary" className="text-xs">{formatRelativeDate(new Date(room.createdAt))}</Badge>
                                        <Badge variant="secondary" className="text-xs">{room.questionsCount} perguntas</Badge>
                                    </div>
                                </div>
                                <span className="flex items-center gap-2 text-sm">
                                    Entrar
                                    <ArrowRight className="size-3" />
                                </span>
                            </Link>
                        )
                    })
                )}
            </CardContent>
        </Card>
    )
}