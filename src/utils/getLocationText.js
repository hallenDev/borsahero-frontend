/**
 * Design example: 6391 Elgin St. Celina, Delaware 10299
 * @param {*} props
 * @returns
 */
const getLocationText = props => {
  const isCountryCodeUS = (props?.country_code || props?.countryCode) === 'US'
  const stateCode = props?.stateCode || props?.state_code
  const cityName = props?.cityName || props?.city
  const countryName = props?.country_name || props?.country

  return isCountryCodeUS ? `${cityName}, ${stateCode}` : `${cityName}, ${countryName}`
}

export default getLocationText
