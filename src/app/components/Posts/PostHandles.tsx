import { umaStatuses } from "@/constants"
import { UmaStatuses } from "@/types/Post"
import { Badge, Chip, Grid, Typography } from "@mui/material"
import CommentIcon from '@mui/icons-material/Comment';
export const PostHandles = ({ status }: {
    status: UmaStatuses
}) => {
    const getBackgroundColor = () => {
        if (status === umaStatuses.FALSE) return 'red';
        if (status === umaStatuses.TRUE) return 'green';
        if (status === umaStatuses.PENDING) return 'yellow';
    }
    return (
        <Grid container>
            <Grid item xs={8}>
                <Badge color={'primary'} badgeContent={Math.floor(Math.random() * 100)}>
                    <CommentIcon />
                </Badge>
                <Typography variant={'caption'}>{ }</Typography>
            </Grid>
            <Grid item xs={4} textAlign={'right'}>
                <Chip label={status} sx={{
                    background: getBackgroundColor(),
                    color: 'black',
                    height: '20px'
                }} />
            </Grid>
        </Grid>
    )
}