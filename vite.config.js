import { defineConfig, loadEnv } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import laravel from "laravel-vite-plugin";

export default ({ mode }) => {
    const { APP_URL } = loadEnv(mode, process.cwd(), "");

    return defineConfig({
        plugins: [
            laravel({
                input: ["resources/css/app.scss", "resources/js/app.js"],

                refresh: true,
            }),
            reactRefresh(),
            {
                // fixes URLs that start with / in CSS files

                // make sure to have vite.loadEnv imported and APP_URL defined

                name: "css-static-url-fixer",

                enforce: "post",

                apply: "serve",

                transform: (code, file) => {
                    if (mode === "development" && file.match(/\.s?css($|\?)/)) {
                        return {
                            code: code.replaceAll(
                                /url\(([\'\"]?)(\/[^\)\'\"]+)\1\)/g,
                                `url($1${APP_URL}$2$1)`
                            ),
                        };
                    }
                },
            },
        ],
    });
};

//comment
