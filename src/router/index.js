import express from "express";
import adminRouter from "./admin/index"

import userRouter from "./users/index"
import systemRouter from "./system/index"

class AccessRouter{

    constructor(middleware){
        this.decoder = middleware
    }

    init(){
        const protectedRouter = express.Router();
        protectedRouter.use(this.decoder)
        protectedRouter.use(adminRouter)
        protectedRouter.use(userRouter)

        const unprotectedRouter = express.Router();

        unprotectedRouter.use(systemRouter)

        const router = express.Router();
        router.use(unprotectedRouter)
        router.use(protectedRouter)
        this.router = router
    }
}


export default AccessRouter