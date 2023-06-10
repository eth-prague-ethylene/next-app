import { AnyPublication, useExplorePublications } from '@lens-protocol/react-web';
import { Grid, Skeleton } from '@mui/material';
import { Post } from './Post';
import { usePubProvider } from '@/app/providers/PublicationProivder';
export const ListOfPosts = () => {
    
    const { publications } = usePubProvider();

    return (
        <Grid container>
            {
                publications != undefined ? (
                    publications.map((post: AnyPublication, index: number) => {
                        return (
                            <Post
                                key={index}
                                lensPostId={post.id}
                                picture={post.profile.picture}
                                username={post.profile.id}
                                handle={post.profile.handle}
                                textContent={(post as any).metadata.content}
                                numberOfComments={(post as any).numberOfComments}
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