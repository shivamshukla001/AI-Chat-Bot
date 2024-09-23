import React from 'react'

import { AppBar } from '@mui/material'
import { Toolbar } from '@mui/material'
import Logo from './shared/Logo'
const Header = () => {
  return (
    <div>
      <AppBar sx={{bgcolor:'transparent', boxShadow:"nonde", position:"static"}}>
        <Toolbar  sx={{display:"flex"}}>
          <Logo/>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header
