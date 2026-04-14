import globals from "globals"
import pluginJs from "@eslint/js"

export default [
    pluginJs.configs.recommended,
    {
        languageOptions: {
            globals: globals.node
        },
        rules: {
            "indent": [
                "error",
                4
            ],
            "quotes": [
                "error",
                "double"
            ],
            "semi": [
                "error",
                "never"
            ],
            "comma-dangle": [
                "error",
                "never"
            ]
        }
    }
]
