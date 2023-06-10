"use client"
import { Grid } from "@mui/material";
import Image from "next/image";
import { useWalletLogin } from "@lens-protocol/react-web";
import { useAccount, useDisconnect, useConnect } from "wagmi";
import { InjectedConnector } from 'wagmi/connectors/injected';

export default function Header() {
    const { execute: login, isPending: isLoginPending } = useWalletLogin();

    const { isConnected } = useAccount();
    const { disconnectAsync } = useDisconnect();

    const { connectAsync } = useConnect({
        connector: new InjectedConnector(),
    });

    const onLoginClick = async () => {
        if (isConnected) {
            await disconnectAsync();
        }

        const { connector } = await connectAsync();

        if (connector instanceof InjectedConnector) {
            const signer = await connector.getSigner();
            await login(signer);
        }
    };

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
                    <button disabled={isLoginPending} onClick={onLoginClick}>
                        Sign in
                    </button>
                </div>
            </Grid>
        </Grid>
    )
}