module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "extends": ["eslint:recommended", "plugin:react/recommended"],
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "indent": [
            "error",
            "tab"
        ],
        "linebreak-style": [0, "error", "windows"],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-console": false,
        "no-multi-spaces": 1,
        "jsx-quotes": 1,
        "react/jsx-closing-bracket-location": 1, // 遵循JSX语法缩进/格式
        "react/jsx-boolean-value": 1, // 如果属性值为 true, 可以直接省略
        "react/no-string-refs": 1, // 总是在Refs里使用回调函数
        "react/self-closing-comp": 1, // 对于没有子元素的标签来说总是自己关闭标签
        "react/jsx-no-bind": 1, // 当在 render() 里使用事件处理方法时，提前在构造函数里把 this 绑定上去
        "react/sort-comp": 1, // 按照具体规范的React.createClass 的生命周期函数书写代码
        "react/jsx-pascal-case": 1 // React模块名使用帕斯卡命名，实例使用骆驼式命名
    }
};