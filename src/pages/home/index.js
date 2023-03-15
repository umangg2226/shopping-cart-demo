import { useState, useMemo } from 'react'
import {
  Grid,
  Typography,
  Checkbox,
  Box,
  Card,
  CardContent,
  Button,
  Select,
  MenuItem,
} from '@mui/material'
import products from '../../mockups/products.json'
import { uniq } from 'lodash'
import useCart from '../../hooks/useCart'

const CATEGORIES = products?.reduce((values, item) => {
  return uniq([...values, item?.category])
}, [])

const BRANDS = products?.reduce((values, item) => {
  return uniq([...values, item?.brand])
}, [])

const Home = () => {
  const [filters, setFilters] = useState({
    categories: [],
    brands: [],
  })
  const [sortBy, setSortBy] = useState(0)

  const onListFilterChange = (value, filterType) => {
    if (filterType === 'categories') {
      setFilters((prev) => {
        const exist = prev?.categories?.find((s) => s === value)
        return {
          ...prev,
          categories: exist
            ? [...prev?.categories?.filter((s) => s !== value)]
            : [...prev?.categories, value],
        }
      })
    } else if (filterType === 'brands') {
      setFilters((prev) => {
        const exist = prev?.brands?.find((s) => s === value)
        return {
          ...prev,
          brands: exist
            ? [...prev?.brands?.filter((s) => s !== value)]
            : [...prev?.brands, value],
        }
      })
    }
  }

  const filteredProducts = useMemo(() => {
    const newProducts = [...(products || [])]?.filter((each) => {
      if (!filters?.categories?.length && !filters?.brands?.length) return true

      const includeInCat = filters?.categories?.includes(each?.category)
      const includeInBrand = filters?.brands?.includes(each?.brand)

      if (filters?.categories?.length && filters?.brands?.length) {
        return includeInCat && includeInBrand
      }

      if (filters?.categories?.length) return includeInCat
      if (filters?.brands?.length) return includeInBrand

      return false
    })

    if (sortBy) {
      if (sortBy === 1) {
        return newProducts.sort(
          (a, b) => parseFloat(a.price) - parseFloat(b.price)
        )
      }
      return newProducts.sort(
        (a, b) => parseFloat(b.price) - parseFloat(a.price)
      )
    }

    return newProducts
  }, [filters, sortBy])

  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <Grid container spacing={1} flexDirection='column'>
          <Grid item xs={12}>
            <Typography variant='h5' fontWeight={700}>
              Filters
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <ListFilterWrap
              title={'Categories'}
              filteredItems={filters?.categories}
              onChange={onListFilterChange}
              filterType='categories'
              items={CATEGORIES}
            />
          </Grid>
          <Grid item xs={12}>
            <ListFilterWrap
              title={'Brands'}
              filteredItems={filters?.brands}
              onChange={onListFilterChange}
              filterType='brands'
              items={BRANDS}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={9}>
        <Grid container spacing={1} flexDirection='column'>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={6}>
                <Typography variant='h5' fontWeight={700}>
                  Products
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Box
                  display={'flex'}
                  flexDirection={'row-reverse'}
                  alignItems='center'
                >
                  <Select
                    labelId='demo-simple-select-filled-label'
                    id='demo-simple-select-filled'
                    value={sortBy}
                    displayEmpty
                    onChange={(e) => setSortBy(e?.target?.value)}
                  >
                    <MenuItem value={0} disabled>
                      Sort By
                    </MenuItem>
                    <MenuItem value={1}>Price: Low to High</MenuItem>
                    <MenuItem value={2}>Price: High to Low</MenuItem>
                  </Select>
                  {sortBy ||
                  filters?.brands?.length ||
                  filters?.categories?.length ? (
                    <Button
                      onClick={() => {
                        setFilters({
                          categories: [],
                          brands: [],
                        })
                        setSortBy(0)
                      }}
                      style={{ marginRight: '10px' }}
                      color='error'
                    >
                      Clear Filters
                    </Button>
                  ) : (
                    ''
                  )}
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={1}>
              {filteredProducts?.length
                ? filteredProducts?.map((each) => {
                    return <Product key={each?.id} item={each} />
                  })
                : ''}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

const Product = ({ item }) => {
  const isOutOfStock = item?.stock === 0

  const { addToCart, removeFromCart, cartItems } = useCart()

  const addedToCart = useMemo(() => {
    return !!cartItems?.find((s) => s?.id === item?.id)
  }, [item?.id, cartItems])

  const handleAddToCartClick = () => {
    if (addedToCart) {
      removeFromCart(item)
    } else {
      addToCart(item)
    }
  }

  return (
    <Grid item xs={4}>
      <Card style={{ height: '400px' }}>
        <Box height={'250px'} width='100%'>
          <img
            src={item?.images?.[0]}
            style={{ objectFit: 'contain', height: '100%', width: '100%' }}
            alt={item?.title}
          />
        </Box>
        <CardContent>
          <Typography
            title={item?.title}
            noWrap
            gutterBottom
            variant='h5'
            component='div'
          >
            {item?.title}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {item?.price}$
          </Typography>
          <Button
            onClick={handleAddToCartClick}
            disabled={isOutOfStock}
            style={{ marginTop: '10px' }}
            color={addedToCart ? 'error' : 'primary'}
          >
            {isOutOfStock
              ? 'Out of Stock'
              : addedToCart
              ? 'Remove from Cart'
              : 'Add to Cart'}
          </Button>
        </CardContent>
      </Card>
    </Grid>
  )
}

const ListFilterWrap = ({
  title,
  filteredItems,
  onChange,
  items,
  filterType,
}) => {
  return (
    <Card style={{ padding: '5px 8px', maxHeight: '250px', overflow: 'auto' }}>
      <Typography variant='h7' fontWeight={400} fontSize={18}>
        {title}
      </Typography>
      {items.map((value) => {
        const checked = filteredItems?.includes(value)

        return (
          <ListItem
            value={value}
            checked={checked}
            onChange={() => onChange(value, filterType)}
            key={value}
          />
        )
      })}
    </Card>
  )
}

const ListItem = ({ value, checked, onChange }) => {
  return (
    <Box display={'flex'} alignItems='center'>
      <Checkbox
        edge='start'
        checked={checked}
        tabIndex={-1}
        onChange={onChange}
        disableRipple
      />
      <Typography>{value}</Typography>
    </Box>
  )
}

export default Home
