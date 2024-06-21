import TestResponse from "../../../testUtils";
import {putUser} from "../updates"
describe("test scim updates", () => {
    afterEach(() => {
        jest.clearAllMocks();    
        jest.resetModules();
        
    });
    it("scim not enabled", () => {
        const res = new TestResponse()
        putUser(false)(null, res)

        expect(res.statusCode).toBe(405)
        const data = res.data
        expect(data.schemas).toStrictEqual(["urn:ietf:params:scim:api:messages:2.0:Error"])
        expect(data.detail).toBe("SCIM is not enabled on this server")
        expect(data.status).toBe(405)
    })

    it("scim enabled", () => {
        const res = new TestResponse()
        putUser(true)(null, res)

        expect(res.statusCode).toBe(501)
        const data = res.data
        expect(data.schemas).toStrictEqual(["urn:ietf:params:scim:api:messages:2.0:Error"])
        expect(data.detail).toBe("User updates are not currently enabled in ACCESS")
        expect(data.status).toBe(501)
    })
})