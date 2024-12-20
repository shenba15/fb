import { configureStore } from "@reduxjs/toolkit"
import Slice from './Slice.js'

const Store=
configureStore({
    reducer:{data:Slice}
})

export default Store