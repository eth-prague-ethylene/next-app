import { Grid } from "@mui/material"
import { PostContent } from "./PostContent"
import { PostHandles } from "./PostHandles"
import { MediaSet, NftImage } from "@lens-protocol/react-web"
import { useEthProvider } from "@/app/providers/EthersProvider"
import { useEffect, useState } from "react"
import { umaStatuses } from "@/constants"
import { BigNumber } from "ethers"

export const Post = ({ picture, handle, username, lensPostId, textContent, numberOfComments }: {
    picture: MediaSet | NftImage | null, handle: string, username: string, lensPostId: string, textContent: string,
    numberOfComments: number | null
}) => {
    const { getAssertionData } = useEthProvider();
    const [status, setStatus] = useState('loading...');

    useEffect(() => {
        (async () => {
            const data = await getAssertionData(BigNumber.from(lensPostId.slice(-4)).sub('0x00').toHexString(), username);
            const expTime = data.expirationTime;
            const now = Math.floor(Date.now() / 1000);
            console.log(data);
            if (expTime <= now) {
                if (data.settled === true) {
                    if (data.settlementResolution === true) {
                        setStatus(umaStatuses.TRUE);
                    } else {
                        setStatus(umaStatuses.FALSE);
                    }

                } else {
                    setStatus(umaStatuses.CLICK_TO_SETTLE);
                }
            } else {
                setStatus(umaStatuses.PENDING);
            }
        })()
    }, [])

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
                <PostHandles status={status} numberOfComments={numberOfComments} postId={lensPostId} />
            </Grid>
        </Grid>
    )
}