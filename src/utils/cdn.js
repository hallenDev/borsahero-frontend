const cdn = uri => (process.env.CDN_DOMAIN ?? '') + uri

export default cdn
