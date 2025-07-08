import { Navigate, useParams } from "react-router-dom"
type RoomParams = {
    roomId: string
}
export function Room() {
    const params = useParams<RoomParams>()
    if (!params.roomId) return <Navigate to="/" replace />;
    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-500">Room</h1>
            <p>{params.roomId}</p>
        </div>
    )
}