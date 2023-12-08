import { alpha, useTheme } from '@mui/material'
import React from 'react'
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';


const NewScrollbar = ({ children }) => {
    const theme = useTheme();

    const styles = {
        scrollbar: {
            height: '99vh',
            '& .simplebar-scrollbar': {
                '&:before': {
                    backgroundColor: alpha(theme.palette.grey[600], 0.48),
                },
                '&.simplebar-visible:before': {
                    opacity: 1,
                },
            },
            '& .simplebar-track.simplebar-vertical': {
                width: 10,
            },
            '& .simplebar-track.simplebar-horizontal .simplebar-scrollbar': {
                height: 6,
            },
            '& .simplebar-mask': {
                zIndex: 'inherit',
            },
            "& .simplebar-placeholder": {
                height: '0 !important',
            }
        },
    }

    return (
        <SimpleBar style={styles.scrollbar}>
            {children}
        </SimpleBar>
    )
}

export default NewScrollbar
