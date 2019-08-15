export const COMMENT_FRAGMENT = `
    id
    text
    user {
        username
    }
`

export const LIKES_FRAGMENT = `
    id
    post {
        location
        caption
    }
    user {
        id
    }
`

export const USER_FRAGMENT = `
    id
    username
    avatar
    firstName
    lastName
`

export const FILE_FRAGMENT = `
    id
    url
`

export const MESSAGES_FRAGMENT = `
    id
    text
    from {
        ${USER_FRAGMENT}
    }
    to {
        ${USER_FRAGMENT}
    }
`

export const FULL_POST_FRAGMENT = `
    fragment PostParts on Post {
        id
        location
        caption
        likes {
            ${LIKES_FRAGMENT}
        }  
        files {
            ${FILE_FRAGMENT}
        } 
        comments {
            ${COMMENT_FRAGMENT}
        }
        user {
            ${USER_FRAGMENT}
        }
    }
`

export const ROOM_FRAGMENT = `
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