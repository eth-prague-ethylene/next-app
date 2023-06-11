import { umaStatuses } from "@/constants"
import { Badge, Chip, Grid, Typography } from "@mui/material"
import CommentIcon from '@mui/icons-material/Comment';
import { useEthProvider } from "@/app/providers/EthersProvider";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
export const PostHandles = ({ status, numberOfComments, postId }: {
    status: string,
    numberOfComments: number | null,
    postId: string
}) => {
    const [loading, setLoading] = useState(false);
    const [toastId, setToastId] = useState('');
    const { settle, getAssertionResult } = useEthProvider();
    const [statusToShow, setStatusToShow] = useState(status);
    const [color, setColor] = useState('green');

    const getBackgroundColor = () => {
        if (status === umaStatuses.FALSE) return 'red';
        if (status === umaStatuses.TRUE) return 'green';
        if (status === umaStatuses.PENDING) return '#F2BE22';
        if (status === umaStatuses.CLICK_TO_SETTLE) return '#E55807'
    }
    useEffect(() => {
        if (statusToShow === umaStatuses.FALSE) setColor('red');
        if (statusToShow === umaStatuses.TRUE) setColor('green');
        if (statusToShow === umaStatuses.PENDING) setColor('#F2BE22');
        if (statusToShow === umaStatuses.CLICK_TO_SETTLE) setColor('#E55807')
    }, [statusToShow])
    const handleClick = async () => {
        if (!loading) {
            setLoading(true);
            openLoadingToast();
            await settle(postId);
            const settleRes = await getAssertionResult(postId);
            closeLoadingToast();
            
            setStatusToShow(settleRes === true ? umaStatuses.TRUE : umaStatuses.FALSE)
            
            toast.success('Statement sattled');

            setLoading(false);
        }
    }
    const openLoadingToast = () => {
        const id = toast.loading('loading');
        setToastId(id);
    }
    const closeLoadingToast = () => {
        toast.dismiss(toastId);
        setToastId('');
    }
    const getChipColor = () => {
        return status === umaStatuses.PENDING ? 'black' : 'white'
    }
    useEffect(() => {
        setStatusToShow(status);
    }, [status]);
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
                <Chip label={statusToShow}
                    disabled={loading}
                    onClick={handleClick}
                    sx={{
                        background: color,
                        color: getChipColor(),
                        height: '20px'
                    }} />
            </Grid>
        </Grid>
    )
}