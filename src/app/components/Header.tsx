"use client"
import { Grid } from "@mui/material";
import Image from "next/image";
import { SignInWithLens, Theme, Tokens } from "@lens-protocol/widgets-react";

export default function Header() {

    async function onSignIn(tokens: Tokens, profile: any) {
        console.log('tokens: ', tokens)
        console.log('profile: ', profile)
    }

    return (
        <Grid container sx={{ maxHeight: '150px' }}>
            <Grid item xs={7} sx={{ padding: '10px' }}>
                <Image style={{
                    paddingLeft: '15px',
                    transform: 'scale(1.3)'
                }} src="/logo.svg" alt="logo" width={120} height={60} />
            </Grid>
            <Grid item xs={5} >
                <div style={{ padding: '15px', display: 'flex', justifyContent: 'flex-end' }}>
                    <SignInWithLens
                        theme={Theme.green}
                        onSignIn={onSignIn}
                    />
                </div>
            </Grid>
        </Grid>
    )
}