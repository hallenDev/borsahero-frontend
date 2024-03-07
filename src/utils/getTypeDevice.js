import UAParser from 'ua-parser-js'
const parser = new UAParser()

export const isPhone = () => parser.getDevice().type === 'mobile'
export const isTablet = () => parser.getDevice().type === 'tablet'
