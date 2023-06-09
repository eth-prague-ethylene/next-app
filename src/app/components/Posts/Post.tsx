import { Grid } from "@mui/material"
import { PostContent } from "./PostContent"
import { PostHandles } from "./PostHandles"
import { MediaSet, NftImage } from "@lens-protocol/react-web"

export const Post = ({ picture, handle, username, lensPostId, textContent }: {
    picture: MediaSet | NftImage | null, handle: string, username: string, lensPostId: string, textContent: string
}) => {

    const getStatusFromUma = async () => {

    }

    return (
        <Grid container sx={{ marginTop: '1em' }}>
            <Grid item xs={12} sx={{ background: 'black', marginRight: '10px', marginLeft: '10px', borderRadius: '10px 10px 0 0', color: 'white', padding: '10px' }}>
                <PostContent
                    profile={picture}
                    handle={handle} username={username}
                    textContent={textContent}
                />
            </Grid>
            <Grid item xs={12} sx={{ background: '#181818', marginRight: '10px', marginLeft: '10px', borderRadius: '0 0 10px 10px', color: 'white', padding: '10px' }}>
                <PostHandles status={'pending'} />
            </Grid>
        </Grid>
    )
}