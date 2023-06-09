import { Grid } from "@mui/material"
import { PostContent } from "./PostContent"
import { PostHandles } from "./PostHandles"
import { umaStatuses } from "@/constants"

export const Post = () => {
    return (
        <Grid container sx={{ marginTop: '1em' }}>
            <Grid item xs={12} sx={{ background: 'black', marginRight: '10px', marginLeft: '10px', borderRadius: '10px 10px 0 0', color: 'white', padding: '10px' }}>
                <PostContent />
            </Grid>
            <Grid item xs={12} sx={{ background: '#181818', marginRight: '10px', marginLeft: '10px', borderRadius: '0 0 10px 10px', color: 'white', padding: '10px' }}>
                <PostHandles status={'pending'} />
            </Grid>
        </Grid>
    )
}

//pending: yello
//verified: green
//incorrect: red