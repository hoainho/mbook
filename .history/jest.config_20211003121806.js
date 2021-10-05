module.exports = {
    testEnvironment: "node",
    roots: ["./src"],
    transform: { "\\.ts$": ["ts-jest"] },
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
