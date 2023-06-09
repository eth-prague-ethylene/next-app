"use client"
import { Grid } from "@mui/material";
import Image from "next/image";

export default function Header() {
    return(
        <Grid container sx={{maxHeight: '150px'}}>
            <Grid item xs={8} sx={{padding: '10px'}}>
                <Image style={{
                    paddingLeft: '15px',
                    transform: 'scale(1.3)'
                }} src="/logo.svg" alt="logo" width={120} height={60} />
            </Grid>
            <Grid item xs={4}>

            </Grid>
        </Grid>
    )
}