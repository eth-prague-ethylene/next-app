import { AnyPublication, useExplorePublications } from '@lens-protocol/react-web';
import { Grid, Skeleton } from '@mui/material';
import { Post } from './Post';
import { useEffect } from 'react';

export const ListOfPosts = () => {
    const { data, loading, hasMore, next } = useExplorePublications({
        limit: 1
    });

    return (
        <Grid container>
            {
                data != undefined ? (
                    data.map((post: AnyPublication, index: number) => {
                        return (
                            <Post
                                key={index}
                                lensPostId={post.id}
                                picture={post.profile.picture}
                                username={post.profile.id}
                                handle={post.profile.handle}
                                textContent={'Today we have planted one tree per each burger we have sold in our restaurants!'}
                            />
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