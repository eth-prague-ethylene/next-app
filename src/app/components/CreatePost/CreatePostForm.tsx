import { Grid } from "@mui/material"
import { Formik } from 'formik';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { ProfileOwnedByMe } from '@lens-protocol/react-web';

export const CreatePostForm = ({
    publisher
}: {
    publisher: ProfileOwnedByMe | null
}) => {

    return (
        <Formik
            initialValues={{ postContent: '' }}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                }, 400);
            }}
        >
            {(formik) => (
                <form onSubmit={formik.handleSubmit}>
                    <Grid container >
                        <Grid item xs={12} sx={{
                            background: '#363636',
                            borderRadius: '10px 10px 0 0',
                            marginRight: '10px',
                            marginLeft: '10px',
                            width: '100%'
                        }}>
                            <textarea
                                rows={5}
                                name="postContent"
                                onChange={formik.handleChange}
                                style={{ background: 'transparent', width: '100%', border: 'none', color: 'white', padding: '10px' }}
                                placeholder="What sustainable action have you taken today?"></textarea>
                        </Grid>
                        <Grid item xs={12} sx={{
                            background: 'black',
                            borderRadius: '0 0 10px 10px',
                            marginRight: '10px',
                            marginLeft: '10px',
                            textAlign: 'right',
                            maxHeight: '32px'
                        }}>
                            <button type="submit" style={{
                                background: '#843FE9',
                                border: 'none',
                                borderRadius: '100px',
                                width: '50px',
                                top: '-25px',
                                position: 'relative',
                                height: '50px',
                                transform: 'scale(0.7)',
                            }}>
                                <ArrowForwardIcon />
                            </button>
                        </Grid>
                    </Grid>
                </form>
            )}
        </Formik>
    )
}