import { Grid, Typography } from "@mui/material"
import Image from "next/image"

export const PostHeader = ({ url, handle, username }: {
    url: string,
    handle: string,
    username: string
}) => {
    return (
        <Grid container>
            <Grid item xs={1} textAlign={'center'} >
                <Image src={url} width={30} height={30} alt={"user's image"} />
            </Grid>
            <Grid item xs={11} sx={{
                position: 'relative',
                left: '10px'
            }}>
                <Typography variant="body2">
                    {username}
                </Typography>
                <Typography variant="caption" sx={{
                    fontSize: '10px',
                    opacity: '0.5',
                    position: 'relative',
                    top: '-5px'
                }}>
                    {handle}
                </Typography>
            </Grid>
        </Grid>
    )
}