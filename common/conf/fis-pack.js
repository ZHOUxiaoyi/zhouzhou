fis.config.merge({
    project : { charset : 'utf-8' },
    pack : {

        'assets/common/build/common.css' : [
            'assets/common/lib/css/base.css',
            'assets/common/widget/finance/nav/nav.css',
            'assets/common/widget/finance/footer/footer.css'
        ],
        'assets/common/build/nav.js' : [
            'assets/common/widget/finance/nav/nav.js',
        ],     
        'assets/common/build/common.js' : [
            'assets/common/lib/js/base/**.js'
        ],
        'assets/common/build/ui.js' : [
            'assets/common/lib/js/ui/**.js'
        ],
        'assets/common/build/ui.css' : [
            'assets/common/lib/js/ui/**.css'
        ],
        'assets/common/build/util.js' : [
            'assets/common/lib/js/util/**.js'
        ]


    }
});