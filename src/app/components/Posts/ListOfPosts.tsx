import { AnyPublication, useExplorePublications } from '@lens-protocol/react-web';
import { Grid, Skeleton } from '@mui/material';
import { Post } from './Post';
import { usePubProvider } from '@/app/providers/PublicationProivder';
import { useEffect } from 'react';
import { useEthProvider } from '@/app/providers/EthersProvider';

export const ListOfPosts = () => {
    const { publications } = usePubProvider();

    return (
        <Grid container>
            {
                publications != undefined ? (
                    publications.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((post: AnyPublication, index: number) => {
                        return (
                            <div className={'slide-in'} key={post.id}
                                style={{ width: '100%' }}>
                                <Post
                                    createdAt={post.createdAt}
                                    lensPostId={post.id}
                                    picture={post.profile.picture}
                                    username={post.profile.id}
                                    handle={post.profile.handle}
                                    textContent={(post as any).metadata.content}
                                    numberOfComments={(post as any).numberOfComments}
                                    comingStatus={(post as any).status}
                                />
                            </div>

                        )
                    })
                ) : (
                    [1, 2, 3, 4, 5].map((index) => {
                        return (
                            <Skeleton key={index} sx={{ marginTop: '1em', position: 'relative', marginRight: '10px', marginLeft: '10px' }} variant="rectangular" width={'100%'} height={200} />
                        )
                    })
                )
            }
        </Grid>
    );
}