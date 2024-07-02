import {TestResponse, TestRequest} from "../../testUtils"
import {isUser, isAdmin} from "../authz"
const admin = {
    isUser: false,
    isAdmin: true
}
const user = {
    isUser: true,
    isAdmin: false
}
const user_admin = {
    isUser: true,
    isAdmin: true
}

describe ("testing authz funcs", () => {
    afterEach(() => {    
        jest.clearAllMocks();
    });
    it("test user permissions", () => {
        const req = user
        
        const res = new TestResponse()
        const next = jest.fn()
        isUser(req, res, next)
        expect(next).toHaveBeenCalled()
        expect(next).toHaveBeenCalledTimes(1)
        isAdmin(req, res, next)
        expect(res.statusCode).toBe(401)
        expect(res.data).toBe("Not Authorised")
    })
    it("test admin permissions", () => {
        const req = admin
        const res = new TestResponse()
        const next = jest.fn()
        isAdmin(req, res, next)
        expect(next).toHaveBeenCalled()
        expect(next).toHaveBeenCalledTimes(1)
        isUser(req, res, next)
        expect(res.statusCode).toBe(401)
        expect(res.data).toBe("Not Authorised")
    })

    it("test user admin permissions", () => {
        const req = user_admin
        const res = new TestResponse()
        const next = jest.fn()
        isAdmin(req, res, next)
        expect(next).toHaveBeenCalled()
        expect(next).toHaveBeenCalledTimes(1)
        isUser(req, res, next)
        expect(next).toHaveBeenCalled()
        expect(next).toHaveBeenCalledTimes(2)
    })
})