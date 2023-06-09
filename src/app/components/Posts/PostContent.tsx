import { Grid, Typography } from "@mui/material"
import { PostHeader } from "./PostHeader"

export const PostContent = () => {
    return (
        <Grid container>
            <Grid item xs={12}>
                <PostHeader
                    username={'MacDonalds'}
                    url={'https://logos-download.com/wp-content/uploads/2016/03/McDonalds_Logo_2018.png'}
                    handle={'@MacDonaldOfficial'}
                />
            </Grid>
            <Grid item xs={12}>
                <Typography variant="body2">
                    Today we have planted one tree per each burger we have sold in our restaurants!
                </Typography>
            </Grid>
        </Grid>
    )
}