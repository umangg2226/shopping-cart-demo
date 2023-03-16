import { useState, useMemo, useEffect } from 'react'
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
  CircularProgress,
  Rating,
} from '@mui/material'
import products from '../../mockups/products.json'
import useCart from '../../hooks/useCart'
import useFilters from '../../hooks/useFilters'
import useInitialData from '../../hooks/useInitialData'

const Home = () => {
  const { setFilters, setSortBy, filters, sortBy } = useFilters()

  const { RANGES, CATEGORIES, BRANDS } = useInitialData()

  const [isFetching, setIsFetching] = useState(true)
  const [filteredProducts, setFilteredProducts] = useState([])

  useEffect(() => {
    setupProducts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, sortBy])

  const setupProducts = async () => {
    setIsFetching(true)

    let newProducts = [...(products || [])]?.filter((each) => {
      if (
        !filters?.categories?.length &&
        !filters?.brands?.length &&
        !filters?.ranges?.length
      ) {
        return true
      }

      const includeInCat = filters?.categories?.includes(each?.category)
      const includeInBrand = filters?.brands?.includes(each?.brand)
      const includeInRange = filters?.ranges?.find((p) => {
        const split = p?.split(' - ')
        const min = split?.[0]
        const max = split?.[1]

        return each?.price >= min && each?.price <= max
      })

      const catsApplied = !!filters?.categories?.length
      const brandsApplied = !!filters?.brands?.length
      const priceRangeApplied = !!filters?.ranges?.length

      if (catsApplied && brandsApplied && priceRangeApplied) {
        return includeInCat && includeInBrand && includeInRange
      }

      if (catsApplied && brandsApplied) {
        return includeInCat && includeInBrand
      }

      if (priceRangeApplied && brandsApplied) {
        return includeInRange && includeInBrand
      }

      if (priceRangeApplied && catsApplied) {
        return includeInRange && includeInCat
      }

      if (filters?.categories?.length) return includeInCat
      if (filters?.brands?.length) return includeInBrand
      if (filters?.ranges?.length) return includeInRange

      return false
    })

    if (sortBy) {
      if (sortBy === 1) {
        newProducts = newProducts.sort(
          (a, b) => parseFloat(a.price) - parseFloat(b.price)
        )
      } else if (sortBy === 2) {
        newProducts = newProducts.sort(
          (a, b) => parseFloat(b.price) - parseFloat(a.price)
        )
      } else if (sortBy === 3) {
        newProducts = newProducts.sort((a, b) => {
          const titleA = a.title.toLowerCase()
          const titleB = b.title.toLowerCase()

          if (titleA < titleB) {
            return -1
          }
          if (titleA > titleB) {
            return 1
          }
          return 0
        })
      } else if (sortBy === 4) {
        newProducts = newProducts.sort((a, b) => {
          const titleA = a.title.toLowerCase()
          const titleB = b.title.toLowerCase()

          if (titleA < titleB) {
            return 1
          }
          if (titleA > titleB) {
            return -1
          }
          return 0
        })
      }
    }

    await new Promise((resolve) => setTimeout(resolve, 350))

    setFilteredProducts([...(newProducts || [])])
    setIsFetching(false)
  }

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
    } else if (filterType === 'price-range') {
      setFilters((prev) => {
        const exist = prev?.ranges?.find((s) => s === value)
        return {
          ...prev,
          ranges: exist
            ? [...prev?.ranges?.filter((s) => s !== value)]
            : [...prev?.ranges, value],
        }
      })
    }
  }

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
          <Grid item xs={12}>
            <ListFilterWrap
              title={'Price Range'}
              filteredItems={filters?.ranges}
              onChange={onListFilterChange}
              filterType='price-range'
              items={RANGES}
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
                    <MenuItem value={3}>Name: (A - Z)</MenuItem>
                    <MenuItem value={4}>Name: (Z - A)</MenuItem>
                  </Select>
                  {sortBy ||
                  filters?.brands?.length ||
                  filters?.categories?.length ? (
                    <Button
                      onClick={() => {
                        setFilters({
                          categories: [],
                          brands: [],
                          ranges: [],
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
            <div style={{ maxHeight: 'calc(100vh - 200px)', overflow: 'auto' }}>
              <Grid container spacing={1}>
                {isFetching ? (
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: 'calc(100vh - 200px)',
                      width: '100%',
                    }}
                  >
                    <CircularProgress />
                  </div>
                ) : filteredProducts?.length ? (
                  filteredProducts?.map((each) => {
                    return <Product key={each?.id} item={each} />
                  })
                ) : (
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: 'calc(100vh - 200px)',
                      width: '100%',
                    }}
                  >
                    <Typography color='error'>No Products Found.</Typography>
                  </div>
                )}
              </Grid>
            </div>
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

  const originalPrice = useMemo(() => {
    return (
      item?.price +
      (item?.price * item?.discountPercentage) / 100
    ).toFixed(2)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item?.id, item?.price, item?.discountPercentage])

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
            {item?.title}{' '}
          </Typography>
          <Typography
            display={'flex'}
            alignItems='center'
            variant='body2'
            color='text.secondary'
          >
            {item?.price}$
            <Typography
              variant='body2'
              color='GrayText'
              style={{ textDecoration: 'line-through' }}
              marginLeft='5px'
            >
              {originalPrice}$
            </Typography>
          </Typography>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: '10px',
            }}
          >
            <Button
              onClick={handleAddToCartClick}
              disabled={isOutOfStock}
              color={addedToCart ? 'error' : 'primary'}
            >
              {isOutOfStock
                ? 'Out of Stock'
                : addedToCart
                ? 'Remove from Cart'
                : 'Add to Cart'}
            </Button>
            <Rating
              name='read-only'
              size='small'
              value={item?.rating}
              readOnly
            />
          </div>
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
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        width: 'fit-content',
      }}
      onClick={onChange}
    >
      <Checkbox edge='start' checked={checked} tabIndex={-1} disableRipple />
      <Typography>{value}</Typography>
    </div>
  )
}

export default Home
