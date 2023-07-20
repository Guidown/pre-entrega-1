import path  from 'path'
import {fileURLToPath} from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)


console.log(dirname)


export default dirname