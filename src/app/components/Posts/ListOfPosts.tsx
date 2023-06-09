import { useExplorePublications } from '@lens-protocol/react-web';
import { Grid } from '@mui/material';
import { Post } from './Post';

export const ListOfPosts = () => {
    const { data, loading, hasMore, next } = useExplorePublications({
        limit: 10
    });



    return(
        <Grid container>
            <Post />
        </Grid>
    );
}