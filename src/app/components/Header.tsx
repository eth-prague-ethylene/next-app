"use client"
import { Grid } from "@mui/material";
import Image from "next/image";
import { useWalletLogin } from "@lens-protocol/react-web";
import { useAccount, useDisconnect, useConnect } from "wagmi";
import { InjectedConnector } from 'wagmi/connectors/injected';
import LensIcon from "./Lens/LensIcon";

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
            <Grid item xs={7} sx={{ padding: '10px' }} className="logo-container">
                <Image style={{
                    paddingLeft: '15px',
                    transform: 'scale(1.3)'
                }} src="/logo.svg" alt="logo" width={120} height={60} />
            </Grid>
            <Grid item xs={5} >
                <div style={{ padding: '15px', display: 'flex', justifyContent: 'flex-end' }}>
                    <button
                        disabled={isLoginPending}
                        onClick={onLoginClick}
                        style={{
                            background: 'linear-gradient(to right, #8E2DE2, #4A00E0)',
                            display: 'flex',
                            alignItems: 'center',
                            position: 'relative',
                            margin: '10px',
                            border: 'none',
                            borderRadius: '10px',
                            color: 'white',
                            padding: '10px',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        <LensIcon  />
                        Sign in with lens
                    </button>
                </div>

            </Grid>
        </Grid>
    )
}