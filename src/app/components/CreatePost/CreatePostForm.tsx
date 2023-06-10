import { Grid } from "@mui/material"
import { Formik } from 'formik';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { uploadJson } from "@/app/utils";
import { ProfileOwnedByMe, useActiveProfile, useActiveWallet, useCreatePost } from '@lens-protocol/react-web';
import { createPost, getHandle, getProfile } from "@/apis/getProfile";
import { usePubProvider } from "@/app/providers/PublicationProivder";
import { useEthProvider } from "@/app/providers/EthersProvider";
import { useState } from "react";
import { toast } from 'react-hot-toast';
import { BigNumber } from "ethers";

export const CreatePostForm = ({ publisher }: {
    publisher: ProfileOwnedByMe
}) => {
    const { publications, handleSetPublications } = usePubProvider();
    const { assertToOracle } = useEthProvider();
    const { data: wallet } = useActiveWallet();
    const { data } = useActiveProfile();
    const [toastId, setToastId] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values: any) => {
        setLoading(true);
        try {
            openLoadingToast();
            if (wallet != null) {
                const content = values.postContent;
                const handle = await getHandle(wallet.address);
                const uri = await uploadJson(content, handle);
                const profileId = await getProfile(handle);
                const newPost = await createPost(profileId, uri, wallet.address);
                const postId = newPost?.data.createPostTypedData.id;
                
                const hexString = '0x' + newPost?.data.createPostTypedData.typedData.value.nonce.toString(16).padStart(2, '0');
                const truePostId = `${profileId}-${hexString}`;
                

                console.log(`Posting this id: ${truePostId}`);

                await assertToOracle(content, truePostId);
                if (publications != undefined) {
                    handleSetPublications([{
                        id: postId,
                        profile: {
                            username: data?.id,
                            picture: data?.picture,
                            handle: data?.handle,
                        },
                        metadata: {
                            content: content
                        },
                        numberOfComments: 0
                    }, ...publications]);
                }
                closeLoadingToast();
                setLoading(false);
                toast.success('Post uploaded!');
            }
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            closeLoadingToast();
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

    return (
        <Formik
            initialValues={{ postContent: '' }}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false);
                handleSubmit(values);
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
                            <button style={{
                                 border: 'none',
                                 background: 'linear-gradient(to right, #8E2DE2, #4A00E0)',
                                 borderRadius: '100px',
                                 width: '50px',
                                 top: '-25px',
                                 color: 'white',
                                 position: 'relative',
                                 height: '50px',
                                 transform: 'scale(0.7)'
                            }}type="submit" disabled={loading} >
                                <ArrowForwardIcon />
                            </button>
                        </Grid>
                    </Grid>
                </form>
            )}
        </Formik>
    )
}