'use strict';

module.exports = {
	app: {
		title: 'The Digital Garage',
		description: 'The Digital Garage Landing Page',
		keywords: 'Mean.js, Chargeebee, keycloak'
	},
	chargebeeSite: process.env.chargebeeSite || 'thedigitalgarage-test',
	chargebeeAPIKey: process.env.chargebeeAPIKey || 'test_1XcdcdRWOQYMUdsd3VE9c1gbwdaxrj6Vj3',
	port: process.env.PORT || 3000,
	templateEngine: 'swig',
	sessionSecret: 'MEAN',
	sessionCollection: 'sessions',
	assets: {
		lib: {
			css: [
				'public/lib/ng-progress/css/ngProgress.css',
		        'public/lib/font-awesome/css/font-awesome.css',
		        'public/lib/flexslider/flexslider.css',
		        'public/lib/angular-toastr/dist/angular-toastr.min.css'
			],
			js: [
				'public/lib/jquery/dist/jquery.js',
				'public/lib/angular/angular.js',
				'public/lib/angular-route/angular-route.js',
				'public/lib/angular-cookies/angular-cookies.js',
				'public/lib/angular-animate/angular-animate.js',
				'public/lib/angular-touch/angular-touch.js',
				'public/lib/angular-ui-router/release/angular-ui-router.js',
				'public/lib/ngstorage/ngStorage.js',
                'public/lib/angular-ui-utils/index.js',
                'public/lib/angular-ui-mask/dist/mask.js',
                'public/lib/angular-ui-event/dist/event.js',
                'public/lib/angular-ui-validate/dist/validate.js',
                'public/lib/angular-ui-indeterminate/dist/indeterminate.js',
                'public/lib/angular-ui-scrollpoint/dist/scrollpoint.js',
                'public/lib/angular-ui-scroll/dist/ui-scroll.js',
                'public/lib/angular-ui-uploader/dist/uploader.js',
                'public/lib/lodash/dist/lodash.js',
                'public/lib/angular-sanitize/angular-sanitize.js',
				'public/lib/angular-resource/angular-resource.js',
				'public/lib/angular-translate/angular-translate.js',
				'public/lib/angular-translate-loader-url/angular-translate-loader-url.js',
				'public/lib/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
				'public/lib/angular-translate-storage-local/angular-translate-storage-local.js',
				'public/lib/angular-translate-storage-cookie/angular-translate-storage-cookie.js',
				'public/lib/oclazyload/dist/ocLazyLoad.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
				'public/lib/angular-loading-bar/build/loading-bar.js',
				'public/lib/jquery.browser/dist/jquery.browser.js',

				'public/lib/screenfull/dist/screenfull.js',
				'public/lib/flexslider/jquery.flexslider.js',
				'public/lib/ng-progress/js/ngprogress.min.js',
		        'public/lib/angular-flexslider/angular-flexslider.js',
		        'public/lib/angular-backstretch/ng-backstretch.min.js',
		        'public/lib/angular-parallax/angular-parallax.js',
		        'public/lib/angular-toastr/dist/angular-toastr.min.js',
		        'public/lib/angular-toastr/dist/angular-toastr.tpls.min.js',
		        'public/lib/iso-3166-country-codes-angular/dist/iso-3166-country-codes-angular.min.js',
                'public/lib/lbservices/lb-services.js'

            ]
		},
		css: [
			'public/dist/application.min.css'
		],
		js: [
            'public/lib/lbservices/lb-services.js',
			'public/config.js',
			'public/application.js',
			'public/modules/*/*.js',
			'public/modules/*/*[!tests]*/*.js'
		],
		tests: [
			'public/lib/angular-mocks/angular-mocks.js',
			'public/modules/*/tests/*.js'
		]
	}
};
