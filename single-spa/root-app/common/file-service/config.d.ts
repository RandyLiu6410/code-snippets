export default config;
declare namespace config {
    namespace COOKIE {
        const TOKEN: string;
        const CLIENT: string;
        const EXPIRES: string;
        const BUCKET_NAME: string;
    }
    namespace REQUEST {
        namespace HEADER {
            export const AUTHORIZATION: string;
            const BUCKET_NAME_1: string;
            export { BUCKET_NAME_1 as BUCKET_NAME };
            const CLIENT_1: string;
            export { CLIENT_1 as CLIENT };
        }
        function TOKEN_FUNC(value: any): string;
    }
    namespace FOLDER {
        const COMPONENT: string;
        const TEMPLATE: string;
    }
    namespace FILETYPE {
        namespace oword {
            const title: string;
            const value: string;
            const ext: string;
        }
        namespace osheet {
            const title_1: string;
            export { title_1 as title };
            const value_1: string;
            export { value_1 as value };
            const ext_1: string;
            export { ext_1 as ext };
        }
        namespace oform {
            const title_2: string;
            export { title_2 as title };
            const value_2: string;
            export { value_2 as value };
            const ext_2: string;
            export { ext_2 as ext };
        }
    }
}
