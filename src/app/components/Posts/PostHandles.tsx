import { umaStatuses } from "@/constants"
import { Badge, Chip, Grid, Typography } from "@mui/material"
import CommentIcon from '@mui/icons-material/Comment';
import { useEthProvider } from "@/app/providers/EthersProvider";
export const PostHandles = ({ status, numberOfComments, postId }: {
    status: string,
    numberOfComments: number | null,
    postId: string
}) => {
    const { settle } = useEthProvider();
    const getBackgroundColor = () => {
        if (status === umaStatuses.FALSE) return 'red';
        if (status === umaStatuses.TRUE) return 'green';
        if (status === umaStatuses.PENDING) return 'yellow';
        if (status === umaStatuses.CLICK_TO_SETTLE) return 'orange'
    }
    const handleClick = async () => {
        await settle(postId);
    }
    return (
        <Grid container>
            <Grid item xs={8}>
                <Badge color={'secondary'} className='badge-container'
                    badgeContent={numberOfComments == undefined ? Math.floor(Math.random() * 100) : numberOfComments}>
                    <CommentIcon />
                </Badge>
                <Typography variant={'caption'}>{ }</Typography>
            </Grid>
            <Grid item xs={4} textAlign={'right'}>
                <Chip label={status}
                    onClick={handleClick}
                    sx={{
                        background: getBackgroundColor(),
                        color: 'black',
                        height: '20px'
                    }} />
            </Grid>
        </Grid>
    )
}