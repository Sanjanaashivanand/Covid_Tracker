import React from 'react';
import {Card, CardContent, Typography } from '@material-ui/core';


export default function InfoBox({title, total}) {
    return (
        <Card className="infoBox" variant="outlined">
            <CardContent>
                <Typography className="infoBox_title" color = "error" variant="h5" align="center"  >
                    {title}
                </Typography>

                <Typography className="infoBox_total" color = "textPrimary" variant="h4" align="center">
                    {total}
                </Typography>
            </CardContent>
        </Card>
    )
}
