export default async function componentLoader(
  fn,
  retriesLeft = 2,
  interval = 750,
  exponential = false
) {
  try {
    const val = await fn()
    return val
  } catch (error) {
    if (retriesLeft) {
      await new Promise((r) => setTimeout(r, interval))
      return componentLoader(
        fn,
        retriesLeft - 1,
        exponential ? interval * 2 : interval,
        exponential
      )
    } else {
      throw new Error(`${error.message}, Please try reload.`)
    }
  }
}
