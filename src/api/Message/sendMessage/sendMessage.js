import { prisma } from "../../../../generated/prisma-client";


const USER_FRAGMENT = `
    id
    username
    avatar
    firstName
    lastName
`

const MESSAGES_FRAGMENT = `
    id
    text
    from {
        ${USER_FRAGMENT}
    }
    to {
        ${USER_FRAGMENT}
    }
`

const ROOM_FRAGMENT = `
    fragment RoomParts on Room {
        id
        participants {
            ${USER_FRAGMENT}
        }
        messages {
            ${MESSAGES_FRAGMENT}
        }
    }
`


export default {
    Mutation: {
        sendMessage: async(_, args, {request, isAuthenticated}) => {
            isAuthenticated(request);
            const { roomId, message, toId } = args;
            const { user } = request;
            let room;
            if (roomId === undefined) {
                if ( user.id !== toId ) {
                    room = await prisma.createRoom({ 
                        participants: {
                            connect: [{ id : toId }, { id: user.id }]
                        }
                    }).$fragment(ROOM_FRAGMENT)
                }   
            } else {
                room = await prisma.room({ id: roomId }).$fragment(ROOM_FRAGMENT)
            }
            if ( !room ) throw Error('Room not found');
            console.log(room);
            const getTo = room.participants.filter(participants => participants.id !== user.id)[0]
            return prisma.createMessage({ 
                text:message,
                from: {
                    connect: { id: user.id }
                },
                to: {
                    connect: {
                        id: roomId ? getTo.id : toId
                    }
                },
                room: {
                    connect: {
                        id: room.id
                    }
                }
            });
        } 
    }
}