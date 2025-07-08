import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

interface GetRoomsAPIResponse {
    id: string;
    name: string;
}

export function CreateRoom() {
    const { data, isLoading } = useQuery({
        queryKey: ['get-rooms'],
        queryFn: async () => {
            const response = await fetch('http://localhost:3333/rooms')
            const result: GetRoomsAPIResponse[] = await response.json()
            return result
        }
    })
    return (
        <div>
            <h1>Create Room</h1>
            {isLoading && <p>Loading...</p>}
            <div className="flex flex-col gap-2">
                {data && data?.map(room => (
                    <Link to={`/room/${room.id}`} key={room.id}>{room.name}</Link>
                ))}
            </div>
        </div>
    )
}