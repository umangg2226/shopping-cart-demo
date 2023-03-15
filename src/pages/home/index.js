import { Grid } from '@mui/material'

const Home = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        "menu"
      </Grid>
      <Grid item xs={9}>
        "product list"
      </Grid>
    </Grid>
  )
}

export default Home
