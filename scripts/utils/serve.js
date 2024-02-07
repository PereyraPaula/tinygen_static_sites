import ls from 'live-server'

const serve = ({ path, port, open }) => {
  ls.start({
    port,
    root: path,
    open,
    logLevel: 0
  })
}

export default serve
