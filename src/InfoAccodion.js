import React from 'react'
import { makeStyles } from '@material-ui/styles';
import { ExpandMore } from '@material-ui/icons';
import {Typography, Accordion,AccordionSummary, AccordionDetails  } from '@material-ui/core';

const Style = makeStyles({
    title: {
        background: 'rgb(238,239,247)',
        textAlign: 'center',
    },
    AccordionDetailsBox: {
        display: 'flex',
        justifyContent: 'center'
    }
})

export default function InfoAccodion({title, sub_title, total}) {
    const classes = Style();
    return (
        <div className={classes.root}>
            <Accordion >
            <AccordionSummary className={classes.title} expandIcon={<ExpandMore />}>
                {title}
            </AccordionSummary>
            <AccordionDetails className={classes.AccordionDetailsBox}>
                <div>
                    <Typography className="AccordionSubTitle" variant="h4" align="center">
                        {total}
                    </Typography>
                    <Typography className="AccordionTotal" variant="h5" align="center">
                        {sub_title}
                    </Typography>
                </div>
            </AccordionDetails>
        </Accordion>
        </div>
        
    )
}
