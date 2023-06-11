import { Grid, Typography } from "@mui/material"
import { PostHeader } from "./PostHeader"
import { MediaSet, NftImage } from "@lens-protocol/react-web"

export const PostContent = ({ createdAt, profile, username, handle, textContent }: {
    profile: MediaSet | NftImage | null, username: string, handle: string, textContent: string, createdAt: string
}) => {
    const formatDate = (dateString: string) => {
        const options = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZoneName: 'short',
        };

        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString('en-US', options);

        return `${formattedDate}`;
    };

    return (
        <Grid container>
            <Grid item xs={12}>
                <PostHeader
                    username={username}
                    picture={profile}
                    handle={handle}
                    createdAt={createdAt}
                />
            </Grid>
            <Grid item xs={12}>
                <Typography variant="body2">
                    {textContent}
                </Typography>
                <Typography variant="caption" sx={{
                    opacity: 0.5,
                    top: '5px',
                    position: 'relative'
                }}>
                    {formatDate(createdAt)}
                </Typography>
            </Grid>
        </Grid>
    )
}