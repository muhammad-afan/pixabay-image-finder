import { AppBar, Box, Toolbar, Typography } from '@mui/material'
import React from 'react'

const Navbar = () => {
    return (
        <>
            <Box display={'block'}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Pixabay Image Finder
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    )
}

export default Navbar
