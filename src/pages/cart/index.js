import {
  Grid,
  Typography,
  Card,
  Box,
  IconButton,
  TextField,
  Button,
  CircularProgress,
} from '@mui/material'
import { useMemo, useState } from 'react'
import useCart from '../../hooks/useCart'
import CloseIcon from '@mui/icons-material/Close'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { useHistory } from 'react-router-dom'
import useToggleTheme from '../../hooks/useToggleTheme'

const Cart = () => {
  const { cartItems } = useCart()

  if (!cartItems?.length) {
    return <NoCartItems />
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={9}>
        <Grid container spacing={1} flexDirection='column'>
          <Grid item xs={12}>
            <Typography variant='h5' fontWeight={700}>
              Your Cart • {` ${cartItems?.length} item(s)`}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <CartItems items={cartItems} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={3}>
        <Grid container spacing={1} flexDirection='column'>
          <Grid item xs={12}>
            <Typography variant='h5' fontWeight={700}>
              Cart Summary
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <CartSummary />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

const CartSummary = () => {
  const [coupen, setCoupen] = useState('')
  const [isApplied, setIsApplied] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { cartItems, resetCart } = useCart()

  const { setSuccessMessage } = useToggleTheme()

  const history = useHistory()

  const totalPrice = useMemo(() => {
    return cartItems
      ?.reduce((amount, item) => {
        return (
          amount +
          (item?.price + (item?.price * item?.discountPercentage) / 100) *
            item.qty
        )
      }, 0)
      ?.toFixed(2)
  }, [cartItems])

  const totalDiscount = useMemo(() => {
    const total = cartItems
      ?.reduce((amount, item) => {
        return (
          amount + ((item?.price * item?.discountPercentage) / 100) * item.qty
        )
      }, 0)
      ?.toFixed(2)

    return total
  }, [cartItems])

  const amountToPay = useMemo(() => {
    const amount = cartItems
      ?.reduce((amount, item) => {
        return amount + item?.price * item?.qty
      }, 0)
      ?.toFixed(2)

    return isApplied ? amount / 2 : amount
  }, [cartItems, isApplied])

  return (
    <Card style={{ padding: '10px' }}>
      <Grid container spacing={1} alignItems='center'>
        <Grid item xs={9}>
          <TextField
            placeholder='Coupen Code'
            value={coupen}
            onChange={(e) => {
              setCoupen(e?.target?.value)
            }}
            disabled={isApplied || isSubmitting}
          />
        </Grid>
        <Grid item xs={3}>
          <Button
            disabled={!coupen?.trim() || isApplied || isSubmitting}
            onClick={() => setIsApplied(true)}
            fullWidth
            variant='outlined'
          >
            Apply
          </Button>
        </Grid>
        {isApplied ? (
          <Grid item xs={12}>
            <Box
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                margin: '7px 0px',
                padding: '',
              }}
            >
              <Typography fontWeight={600}>50% off Applied</Typography>
              <Button
                onClick={() => {
                  setIsApplied(false)
                  setCoupen('')
                }}
                color='error'
                disabled={isSubmitting}
              >
                REMOVE
              </Button>
            </Box>
          </Grid>
        ) : (
          <></>
        )}
        <Grid item xs={12}>
          <Entry label='Total price' value={`${totalPrice}$`} />
          <Entry label='Total discount' value={`${totalDiscount}$`} />
          {isApplied ? (
            <Entry label='Coupen discount' value={`${amountToPay / 2}$`} />
          ) : (
            ''
          )}

          <Entry label='Amount to pay' value={`${amountToPay}$`} />

          <Button
            onClick={async () => {
              setIsSubmitting(true)
              await new Promise((resolve) => setTimeout(resolve, 500))
              resetCart()
              history.push('/')
              setSuccessMessage('Thank you, Order successfully placed.')
            }}
            style={{ marginTop: '10px' }}
            fullWidth
            variant='contained'
            disabled={isSubmitting}
            startIcon={isSubmitting && <CircularProgress size={18} />}
          >
            Place Order
          </Button>
        </Grid>
      </Grid>
    </Card>
  )
}

const Entry = ({ label, value }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '5px',
      }}
    >
      <Typography color={'gray'}>{label}</Typography>
      <Typography>{value}</Typography>
    </div>
  )
}

const CartItems = () => {
  const { cartItems } = useCart()

  return (
    <div
      style={{
        height: 'calc(100vh - 200px)',
        overflow: 'auto',
      }}
    >
      <Grid container spacing={2}>
        {cartItems?.map((each) => {
          return <EachCartItem item={each} key={each?.id} />
        })}
      </Grid>
    </div>
  )
}

const EachCartItem = ({ item }) => {
  const { removeFromCart, addQty, removeQty } = useCart()

  const originalPrice = useMemo(() => {
    return (
      item?.price +
      (item?.price * item?.discountPercentage) / 100
    ).toFixed(2)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item?.id, item?.price, item?.discountPercentage])

  return (
    <Grid item xs={12}>
      <Card style={{ minHeight: '160px', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
          <div style={{ height: '160px', width: '200px' }}>
            <img
              src={item?.image}
              style={{ objectFit: 'contain', height: '160px', width: '200px' }}
              alt={item?.title}
            />
          </div>
          <Box padding={'10px 16px'} flex='1'>
            <Typography variant='h6'>{item?.title}</Typography>
            <Typography
              title={item?.description}
              color='GrayText'
              WebkitLineClamp={1}
            >
              {item?.description}
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
                marginTop: '5px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <IconButton
                  color={item?.qty === 1 ? 'error' : 'default'}
                  onClick={() =>
                    item?.qty === 1 ? removeFromCart(item) : removeQty(item)
                  }
                >
                  {item?.qty === 1 ? <DeleteOutlineIcon /> : <RemoveIcon />}
                </IconButton>
                <Typography
                  display={'inline'}
                  variant='body2'
                  color='text.secondary'
                  margin={'0px 5px'}
                >
                  {item?.qty} Quantity
                </Typography>
                <IconButton
                  disabled={item?.qty === 5}
                  onClick={() => addQty(item)}
                >
                  <AddIcon />
                </IconButton>
              </div>
              <Typography textAlign={'right'} display={'inline'}>
                Total Amount: {`${item?.qty * item?.price}$`}
              </Typography>
            </div>
          </Box>
        </div>
        <IconButton
          style={{ position: 'absolute', right: '8px', top: '5px' }}
          onClick={() => removeFromCart(item)}
          color='error'
          size='small'
        >
          <CloseIcon />
        </IconButton>
      </Card>
    </Grid>
  )
}

const NoCartItems = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'calc(100vh - 200px)',
        width: '100%',
      }}
    >
      <Typography color='primary'>Your Cart is Empty.</Typography>
    </div>
  )
}

export default Cart
