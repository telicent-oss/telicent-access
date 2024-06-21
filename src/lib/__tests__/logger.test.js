describe("Logger", () => {
    afterEach(() => {    
        jest.clearAllMocks();
    
    });
    const OLD_ENV = process.env;

    beforeEach(() => {
        jest.resetModules() // Most important - it clears the cache
        process.env = { ...OLD_ENV }; // Make a copy
    });

    afterAll(() => {
        process.env = OLD_ENV; // Restore old environment
    });
    it("test debug logging - but debug off", () => {
        
        process.env.DEBUG = "false"
        const logger =require("../logger").default
        const logSpy = jest.spyOn(global.console, "log")
        logger.debug("we are debugging")
        expect(logSpy).not.toHaveBeenCalled();
        expect(logSpy).toHaveBeenCalledTimes(0);
        logger.info("we are infoing")
        expect(logSpy).toHaveBeenCalled();
        expect(logSpy).toHaveBeenCalledTimes(1);
        expect(logSpy).toHaveBeenCalledWith("%c INFO: we are infoing", "color: green")
        logger.error("we are erroring")
        expect(logSpy).toHaveBeenCalled();
        expect(logSpy).toHaveBeenCalledTimes(2);
        expect(logSpy).toHaveBeenCalledWith("%c ERROR: we are erroring", "color: red")
   
    })

    it("test debug logging", () => {
        process.env.DEBUG = "true"
        const logger =require("../logger").default
        const logSpy = jest.spyOn(global.console, "log")
        logger.debug("we are debugging")
        expect(logSpy).toHaveBeenCalled();
        expect(logSpy).toHaveBeenCalledTimes(1);
        expect(logSpy).toHaveBeenCalledWith("DEBUG: we are debugging")
        logger.info("we are infoing")
        expect(logSpy).toHaveBeenCalled();
        expect(logSpy).toHaveBeenCalledTimes(2);
        expect(logSpy).toHaveBeenCalledWith("%c INFO: we are infoing", "color: green")
        logger.error("we are erroring")
        expect(logSpy).toHaveBeenCalled();
        expect(logSpy).toHaveBeenCalledTimes(3);
        expect(logSpy).toHaveBeenCalledWith("%c ERROR: we are erroring", "color: red")
       
    })
  });