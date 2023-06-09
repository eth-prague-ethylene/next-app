import { formatPicture } from "@/app/utils"
import { MediaSet, NftImage } from "@lens-protocol/react-web"
import { Grid, Typography } from "@mui/material"
import Image from "next/image"

export const PostHeader = ({ picture, handle, username }: {
    picture: NftImage | MediaSet | null,
    handle: string,
    username: string
}) => {
    return (
        <Grid container>
            <Grid item xs={1} textAlign={'center'} >
                <Image src={formatPicture(picture)} width={30} height={30} alt={"user's image"} />
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