module.exports = {
    lintOnSave: true,
    configureWebpack: {
        devtool: 'eval'
    },
    css: {
        loaderOptions: {
            scss: {
                prependData: `
				@import "~@/scss/variables.scss";
				`
            }
        }
    },
    runtimeCompiler: true
};
