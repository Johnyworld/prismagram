export const COMMENT_FRAGMENT = `
    fragment CommentParts on Comment {
        id
        text
        user {
            username
        }
    }
`

export const LIKES_FRAGMENT = `
    fragment LikeParts on Like {
        id
        post {
            location
            caption
        }
        user {
            id
        }
    }
`