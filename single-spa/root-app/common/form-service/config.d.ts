export default config;
declare namespace config {
    namespace COOKIE {
        const TOKEN: string;
        const CLIENT: string;
        const EXPIRES: string;
    }
    namespace REQUEST {
        namespace HEADER {
            export const AUTHORIZATION: string;
            const CLIENT_1: string;
            export { CLIENT_1 as CLIENT };
        }
        function TOKEN_FUNC(value: any): string;
    }
}
