/*
 GEO Location Redirect
 */

/*global fxcmcom */
/*global redirectData */

(function () {
	var countriesLoaded = false;
	var countryBucketsLoaded = false;

	amplify.subscribe( 'fxcm.countries.onLoad', function () {
		countriesLoaded = true;
		if( !countryBucketsLoaded ) return false;
		checkBuckets();
	});

	amplify.subscribe( 'fxcm.countryBuckets.onLoad', function () {
		countryBucketsLoaded = true;
		if( !countriesLoaded ) return false;
		checkBuckets();
	});

	var checkBuckets = function(){
		var allCountryBuckets = fxcmCountryBuckets.getAllBuckets();

		// if the current site is not in ANY bucket, do not run it
		for( var i = 0; i < allCountryBuckets.length; i++ ) {
			if( allCountryBuckets[i].home_url === fxcmcom.base_url ) {
				return new GeoRedirect();
			}
		}
	};
}());

var GeoRedirect = function () {
	var _cookie = 'fxcm_geo_redirect_popup';
	var countryBuckets = [];
	var geoContentStructure = '';
	var output = {
		'messageHeader' : '',
		'messageBody' : ''
	};
	var userOnCorrectSite = false;

	/**
	 * Gets messages from the REST API and create lightbox markup
	 */
	function getMessagesAndCreateStructure() {
		fxcmSimpleAjax.get( fxcmcom.api_endpoint + '/country-logic/geo-redirect-settings/', function ( messages ) {

			if ( typeof messages !== 'object' || !Object.keys(messages).length ) return false;

			// Content in the popup
			geoContentStructure = messages['popup_structure'].replace('%%messages%%', sanitizeMessage( messages ));

			// Creating wrapper, hiding it from the page, appending it to the body and only showing what's inside
			$( document.createElement( 'div' ) )
				.hide()
				.append( '<div id="geo-popup" class="geo-popup">' + geoContentStructure + '</div>' )
				.appendTo( 'body' );

			startLightcase();
		})
	}

	/**
	 * Replaces the messages variables with website and language
	 * @param messages {object}
	 * @returns {*}
	 */
	function sanitizeMessage( messages ) {

		// Formatting the header output
		output[ 'messageHeader' ] = messages[ 'redirect_header' ]
			.replace( '%%country%%', fxcmCountries.getCountry(redirectData.country).name_locale );


		// Message for single bucket
		if( countryBuckets.length === 1 ) {
			output[ 'messageBody' ] = messages[ 'single_country_option' ]
				.replace( '%%website%%', ('<a href="' + countryBuckets[ 0 ].home_url + '">' + countryBuckets[ 0 ].home_url + '</a>') );
		}

		// Message for more than one bucket
		else {
			for( var j = 0; j < countryBuckets.length; j++ ) {
				// Formatting link
				output[ 'messageBody' ] += messages[ 'multiple_country_option' ]
					.replace( '%%website%%', ('<a href="' + countryBuckets[ j ].home_url + '">' + countryBuckets[ j ].home_url + '</a>') )
					.replace( '%%language%%', countryBuckets[ j ].language );
			}
		}

		output['messageBody'] = output['messageBody'].replace( /(?<=[>])(https?:\/\/)?(www\.)?/mg , "" );

		// Concatenate everything and get final result
		return Object.values( output ).join( '' );

	}

	/**
	 * Lightcase settings and starting
	 */
	function startLightcase() {
		// Lightcase settings
		var lightcaseSettings = {
			width : 500,
			maxWidth : 1280,
			maxHeight : 1000,
			href : '#geo-popup',
			onFinish : {
				moveClose : function () {
					// Appending default lightcase X to the lightcase box
					$( '.lightcase-icon-close' ).appendTo( $( '#lightcase-content' ) );
				}
			},
			onClose : {
				cookie : function () {
					setCookie();
				}
			}
		};

		// Where the magic happens
		lightcase.start( lightcaseSettings );
	}

	/**
	 * Sets cookie 'fxcm_geo_redirect_popup' so the lightbox doesn't popup again
	 */
	function setCookie() {
		// Set to 30 days
		var expireDate = new Date();
		expireDate.setDate( expireDate.getDate() + 30 );

		// Set Cookie
		fxcm.lib.writeCookie(_cookie, fxcmcom.base_url, { expires : expireDate, path : "/" });
	}


	countryBuckets = fxcmCountryBuckets.getBucketsByCountry(redirectData.country.toLowerCase().replace( /[ -&.~()]+/g, '_' ) );

	// If there's a cookie don't show popup
	if( fxcm.lib.readCookie( _cookie )) {
		return {};
	}

	for( var i = 0; i < countryBuckets.length; i++ ) {
		// If current home URL different than bucket home URL
		if( (new RegExp( countryBuckets[ i ].home_url ).test( document.location.toString() )) ) {
			userOnCorrectSite = true;
		}
	}

	if( !userOnCorrectSite ) {
		// Get the country geo redirect messages
		getMessagesAndCreateStructure();
	}

};


