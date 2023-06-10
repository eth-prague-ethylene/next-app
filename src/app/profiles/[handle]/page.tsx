"use client"

import { NearProfile } from "@/app/components/Near/NearProfile";
import { Grid } from "@mui/material";

export default function Page({ params }: { params: any }) {
    return (
        <Grid container textAlign={'center'}>
            <Grid item xs={12}>
                <NearProfile
                    handle={params.handle}
                    testnet={true}
                    requireLogin={true}
                />
            </Grid>
        </Grid>

    )
}