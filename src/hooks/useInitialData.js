import { useMemo } from 'react'
import products from '../mockups/products.json'
import { uniq } from 'lodash'

const useInitialData = () => {
  const RANGES = useMemo(() => {
    const lowestNumber = 0
    const largestNumber = Math.ceil(
      products.reduce((prev, curr) => (prev.price > curr.price ? prev : curr))
        ?.price
    )

    const rangeSize = 500
    const ranges = []

    for (let i = lowestNumber; i < largestNumber; i += rangeSize) {
      ranges.push(`${i} - ${i + rangeSize}`)
    }

    return ranges
  }, [])

  const CATEGORIES = useMemo(() => {
    return products?.reduce((values, item) => {
      return uniq([...values, item?.category])
    }, [])
  }, [])

  const BRANDS = useMemo(() => {
    return products?.reduce((values, item) => {
      return uniq([...values, item?.brand])
    }, [])
  }, [])

  return { RANGES, CATEGORIES, BRANDS }
}

export default useInitialData
