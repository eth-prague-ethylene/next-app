import { Grid, Typography } from "@mui/material"
import { PostHeader } from "./PostHeader"
import { MediaSet, NftImage } from "@lens-protocol/react-web"

export const PostContent = ({ profile, username, handle, textContent }: {
    profile: MediaSet | NftImage | null, username: string, handle: string, textContent: string
}) => {
    return (
        <Grid container>
            <Grid item xs={12}>
                <PostHeader
                    username={username}
                    picture={profile}
                    handle={handle}
                />
            </Grid>
            <Grid item xs={12}>
                <Typography variant="body2">
                    {textContent}
                </Typography>
            </Grid>
        </Grid>
    )
}