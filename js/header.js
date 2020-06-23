/*global fxcmcom */
/*global gtmGenerateDecoratedUrl */
/*global redirectData */
/*global amplify */

/* TODO: update all scroll listeners to use ScrollMagic library */

var FxcmGlobalHeader = function() {

	/**
	 * Internal class reference
	 * @type {FxcmGlobalHeader}
	 * @private
	 */
	var _thatHeader = this;

	/**
	 * Global Header Element
	 * @private
	 */
	var _$header;

	/**
	 * Document body
	 * @private
	 */
	var _$body = $( 'body' );

	/**
	 * Placeholder element for header
	 * @private
	 */
	var _$placeholder = $( document.createElement( 'div' ) );

	/**
	 * Cached shorthand document referrer
	 * @type {HTMLElement}
	 */
	var _doc = document.documentElement;

	/**
	 * Elements that are part of the header
	 * @type {Object}
	 * @private
	 */
	var _headerParts = {
		$navOffsetContainer : '[data-main-nav-list]',
		$navPointer : '[data-main-nav-pointer]',
		$navPointerTargets : '[data-nav-pointer-target]',
		$navMainLinks : '[data-main-nav-link]',
		$navKeyEls : '[data-nav-rel]',
		$navGroupsWrapper : '[data-nav-groups]',
		$navGroups : '[data-nav-group]',
		$searchTrigger : '[data-search-trigger]',
		$searchForm : '[data-search-form]',
		$mobileNavTrigger : '[data-mobile-nav-trigger]',
		$mobileNavBack : '[data-main-nav-mobile-back]',
		$contentOverlay : '[data-content-overlay]',
		$addStickies : '[data-add-stickies]'
	};

	/**
	 * State tracking
	 * @type {Object}
	 * @private
	 */
	var _state = {
		currentGroupId : false,
		originalGroupId : false,
		prevGroupId : false,
		navIsOpen : false,
		searchIsOpen : false,
		headerIsMinimized : false,
		headerIsStuck : false,
		pageScrollY : 9999999,
		eventsBlocked : false,
		isFinalScrollCheck : false
	};

	/**
	 * HTML classes map
	 * @type {Object}
	 * @private
	 */
	var _classes = {
		current : 'current',
		previous : 'previous',
		navDefaultSet : 'main-nav-has-default',
		navOpen : 'main-nav-open',
		navGroupSelected : 'main-nav-group-selected',
		searchOpen : 'global-search-open',
		headerMinimized : 'global-header-minimized',
		headerStuck : 'global-header-stuck'
	};

	/**
	 * Timestamp to block scroll events
	 * @type {number}
	 * @private
	 */
	var _scrollEventDedupeBlock = 0;

	/**
	 * Additional sticky elements
	 * @type {array}
	 * @private
	 */
	var _additionalStickyEls = [];

	/**
	 * Timeout to finalize scroll state changes
	 */
	var _scrollFinalizer;

	/**
	 * Smooth Scroll event
	 */
	var _headerSmoothScroll = new fxcm.ui.SmoothScroll( {
		animateSpeed : 400,
		//offset : 0 - _els.$nav.outerHeight(),
		onBeforeScroll : function( $wrapper ) {
			_headerSmoothScroll.setOffset(_getScrollOffset());

		},
		onBeforeFinish : function ( $wrapper ) {
			_headerSmoothScroll.setOffset(_getScrollOffset());
		}
	} );


	var _getScrollOffset = function (  ) {
		var addStickiesHeight = _additionalStickyEls.reduce( function( height, stickyObj, i ){
			if(stickyObj.isStuck){
				height += stickyObj.$element.outerHeight();
			}

			return height;
		}, 0 );

		return 0 - _$header.outerHeight() - addStickiesHeight;
	};

	/**
	 * Attach event handlers
	 * @private
	 */
	function _attachHandlers() {

		// handle clicks on main nav links
		_headerParts.$navMainLinks.on( 'click', function( e ) {
			var navItemId = $( this ).attr( 'href' );
			if( ! /^#/.test( navItemId ) ) return true;

			e.preventDefault();

			navItemId = navItemId.substr( 1 );

			if( _state.eventsBlocked ) return false;

			if( _state.searchIsOpen ) _thatHeader.toggleSearchOpen( false );

			if( navItemId === _state.currentGroupId && _state.navIsOpen ) {
				_thatHeader.setCurrentMainNavItem( _state.originalGroupId );
				_thatHeader.toggleNavOpen( false );
				return false;
			}

			_thatHeader.setCurrentMainNavItem( navItemId );
			_thatHeader.toggleNavOpen( true );
		});

		// handle mobile nav trigger click
		_headerParts.$mobileNavTrigger.on( 'click', function( e ) {
			e.preventDefault();
			if( _state.eventsBlocked ) return false;

			if( _state.navIsOpen ) {
				_thatHeader.unsetCurrentNavItem();
				_thatHeader.toggleNavOpen( false );
			}
			else {
				_thatHeader.toggleNavOpen( true );
			}
		});

		// handle content overlay click
		_headerParts.$contentOverlay.on( 'click', function( e ) {
			e.preventDefault();
			if( _state.eventsBlocked ) return false;

			_thatHeader.unsetCurrentNavItem();
			_thatHeader.toggleNavOpen( false );
		});

		// handle mobile nav back click
		_headerParts.$mobileNavBack.on( 'click', function( e ) {
			e.preventDefault();
			if( _state.eventsBlocked || !fxcm.device || fxcm.device.getBreakpoint() !== 'mobile' ) return false;

			_thatHeader.unsetCurrentNavItem( true );
		});

		// handle search trigger clicks
		_headerParts.$searchTrigger.on( 'click', function( e ) {
			e.preventDefault();
			if( _state.eventsBlocked ) return false;

			if( _state.navIsOpen ) _thatHeader.toggleNavOpen( false );
			if( !_state.searchIsOpen ) _thatHeader.toggleSearchOpen( true );
		});

		// collapse header when clicking any element that is outside the header
		_$body.on( 'click', function ( e ) {
			if( _state.eventsBlocked ) return false;

			if( _state.searchIsOpen && !_headerParts.$searchForm.find( e.target ).length && !_headerParts.$searchTrigger.find( e.target ).length ) {
				_thatHeader.toggleSearchOpen( false );
			}
		});

		// handle empty form submission
		_headerParts.$searchForm.on('submit', function ( e ) {
			// we can actually drop the val().length condition
			if( _state.searchIsOpen && _headerParts.$searchForm.find( '.search-field' ).val().trim() === "" ){
				e.preventDefault();
			}
		});

		// handle window size changes
		$( window ).on( 'resize orientationchange', function () {
			if( _state.eventsBlocked ) return false;

			var targetItemId = _state.currentGroupId ? _state.currentGroupId : _state.originalGroupId;
			_moveDesktopPointer( targetItemId );
			_dedupeHeaderScrollEvent();
			_moveAdditionalStickyEls();
			if( _state.navIsOpen ) {
				_setNavGroupsHeight( targetItemId );
			}
		});

		// handle window scrolling
		$( window ).on( 'scroll', function() {
			if( _state.eventsBlocked ) return false;

			_state.isFinalScrollCheck = false;
			window.clearTimeout( _scrollFinalizer );

			_dedupeHeaderScrollEvent();
			_moveAdditionalStickyEls();

			// initiate a final check to make sure header is expanded at the top
			_scrollFinalizer = window.setTimeout( function () {
				_state.isFinalScrollCheck = true;
				_dedupeHeaderScrollEvent();
				_moveAdditionalStickyEls();
			}, 800 );
		});
	}

	/**
	 * Move location of elements we want to stick to the bottom of the nav/header
	 * @returns {boolean}
	 * @private
	 */
	function _moveAdditionalStickyEls() {
		if( !_additionalStickyEls.length || !fxcm.device || fxcm.device.getBreakpoint() !== 'desktop' ) return false;

		// create a suffix for body classes associated with any given sticky element
		var classSuffix = '-is-stuck';

		// stick or unstick each element depending on if the header is passed the top of its placeholder
		for( var i = 0; i < _additionalStickyEls.length; i++ ) {

			var stickyEl = _additionalStickyEls[ i ];

			// if the element is visible we don't need to do anything with it
			if( !stickyEl.$element.is( ':visible' ) ) continue;

			// if element is not stuck and top of it is at or above bottom of header, stick it
			if( !stickyEl.isStuck && stickyEl.$element[0].getBoundingClientRect().top <= _$header[0].getBoundingClientRect().bottom ) {
				stickyEl.$placeholder.css( { 'height' : stickyEl.$element.outerHeight( true ) + 'px' } );
				_headerParts.$addStickies.append( stickyEl.$element );
				_$body.addClass( stickyEl.label + classSuffix );
				stickyEl.isStuck = true;
			}
			// if element is stuck and top of it's placeholder is below the element top, unstick it
			else if( stickyEl.isStuck && stickyEl.$placeholder[0].getBoundingClientRect().top >= stickyEl.$element[0].getBoundingClientRect().top ) {
				stickyEl.$placeholder.css( { 'height' : '' } ).before( stickyEl.$element );
				_$body.removeClass( stickyEl.label + classSuffix );
				stickyEl.isStuck = false;
			}
		}
	}

	/**
	 * Fire deuplicated header scroll events
	 * @returns {number}
	 * @private
	 */
	function _dedupeHeaderScrollEvent() {

		var newScrollY = ( window.pageYOffset || _doc.scrollTop ) - ( _doc.clientTop || 0 ); // get current scroll position
		var now = Date.now(); // get current timestamp
		var delay = 100; // default blocking delay
		var doMinimize; // whether to minimize

		// immediately notify state of stickyness
		_thatHeader.toggleHeaderStuckState(  newScrollY > 0 && Math.floor( _$header[0].getBoundingClientRect().top ) <= 0 );

		// if we're being blocked by the dedupe timer, simple record the new scroll position and exit
		if( now < _scrollEventDedupeBlock ) {
			return _state.pageScrollY = newScrollY;
		}

		// if original header position is no longer visible, and window scrolled down, minimize header
		if(	newScrollY > _state.pageScrollY && Math.ceil( _$placeholder[0].getBoundingClientRect().bottom ) <= 0 ) {
			// if not is open and header is not minimized, minimize it
			if( !_state.navIsOpen && !_state.searchIsOpen && !_state.headerIsMinimized ) {
				doMinimize = true;
				delay = 600;
			}
		}
		// otherwise window scrolled up or original header position is visible, so maximize
		else if( newScrollY < _state.pageScrollY || ( _state.isFinalScrollCheck && Math.floor( _$placeholder[0].getBoundingClientRect().bottom ) > 0 ) ) {
			// if header is minimized, expand it
			if( _state.headerIsMinimized ) {
				doMinimize = false;
				delay = 600;
			}
		}

		_scrollEventDedupeBlock = now + delay;
		if( typeof doMinimize === 'boolean' )
			_thatHeader.toggleHeaderMinimized( doMinimize );

		return _state.pageScrollY = newScrollY;
	}

	/**
	 * Move the pointer to the specified main nav item
	 * @param navItemId
	 * @returns {boolean}
	 * @private
	 */
	function _moveDesktopPointer( navItemId ) {

		var $target = typeof navItemId === 'string' ? _headerParts.$navPointerTargets.filter( '[data-nav-pointer-target="' + navItemId + '"]' ) : [];

		if( !$target.length ||
			!_headerParts.$navOffsetContainer.length ||
			!_headerParts.$navPointer.length ) {
			// reset
			_headerParts.$navPointer.css( { 'left' : '' } );
			return false;
		}

		var offsetStart = _headerParts.$navOffsetContainer.offset().left;
		var targetOffset = $target.offset().left - offsetStart;
		var targetMiddle = targetOffset + ( $target.width() / 2 );
		var pointerMiddle = _headerParts.$navPointer.width() / 2;
		var pointerNewPosition = targetMiddle - pointerMiddle;

		_headerParts.$navPointer.css( { 'left' : pointerNewPosition + 'px' } );
	}

	/**
	 * Set the height of the nav groups element (e.g. open or adjust it)
	 * @param navItemId
	 * @returns {boolean}
	 * @private
	 */
	function _setNavGroupsHeight( navItemId ) {
		var $targetGroup = _headerParts.$navGroups.filter( '[data-nav-rel="' + navItemId + '"]' ).first();
		if( typeof navItemId !== 'string' || !$targetGroup.length ) {
			_headerParts.$navGroupsWrapper.css( { 'height' : '' } );
			return false;
		}

		if( typeof fxcm === 'object' && fxcm.device && fxcm.device.getBreakpoint() === 'desktop' ) {
			_headerParts.$navGroupsWrapper.css( { 'height' : $targetGroup.outerHeight() + 'px' } );
		}
		else {
			_headerParts.$navGroupsWrapper.css( { 'height' : ( window.innerHeight - Math.floor( _headerParts.$navGroupsWrapper[0].getBoundingClientRect().top ) ) + 'px' } );
		}
	}

	/**
	 * Set the current main nav item
	 * @param navItemId
	 * @returns {boolean}
	 * @public
	 */
	this.setCurrentMainNavItem = function( navItemId ) {

		if( typeof navItemId !== 'string' ) {
			_thatHeader.unsetCurrentNavItem();
			return false;
		}
		if( navItemId === _state.currentGroupId ) return true;

		_state.prevGroupId = _state.currentGroupId;
		_state.currentGroupId = navItemId;

		var $prevRelTargets = _headerParts.$navKeyEls.filter( '[data-nav-rel="' + _state.prevGroupId + '"]' );
		var $currRelTargets = _headerParts.$navKeyEls.filter( '[data-nav-rel="' + _state.currentGroupId + '"]' );

		_headerParts.$navKeyEls.removeClass( _classes.previous );
		$prevRelTargets.addClass( _classes.previous );
		_headerParts.$navKeyEls.removeClass( _classes.current );
		$currRelTargets.addClass( _classes.current );
		_$body.addClass( _classes.navGroupSelected );

		_setNavGroupsHeight( navItemId );
		_moveDesktopPointer( navItemId );

		// remove previous class after half a second
		setTimeout( function(){
			_headerParts.$navKeyEls.removeClass( _classes.previous );
		}, 500 );
	};

	/**
	 * Unset the current nav item
	 * @public
	 * @param {boolean} [force]
	 */
	this.unsetCurrentNavItem = function( force ) {
		_state.currentGroupId = _state.prevGroupId = false;
		_headerParts.$navKeyEls.removeClass( _classes.current + ' ' + _classes.previous );
		_$body.removeClass( _classes.navGroupSelected );

		if( !force && _state.originalGroupId ) {
			_headerParts.$navKeyEls.filter( '[data-nav-rel="' + _state.originalGroupId + '"]' )
				.addClass( _classes.current );
			_$body.addClass( _classes.navGroupSelected );
		}

		_setNavGroupsHeight( _state.originalGroupId );
		_moveDesktopPointer( _state.originalGroupId );
	};

	/**
	 * Toggle search open or clossed
	 * @param {boolean} [doOpen]
	 * @public
	 */
	this.toggleSearchOpen = function( doOpen ) {
		if( doOpen || ( typeof doOpen === 'undefined' && !_state.searchIsOpen ) ) {
			$( 'body' ).addClass( _classes.searchOpen );
			_headerParts.$searchForm.find('.search-field').focus();
			_state.searchIsOpen = true;
		}
		else {
			$( 'body' ).removeClass( _classes.searchOpen );
			_state.searchIsOpen = false;
		}
	};

	/**
	 * Toggle nav open or clossed
	 * @param {boolean} [doOpen]
	 * @public
	 */
	this.toggleNavOpen = function( doOpen ) {
		if( doOpen || ( typeof doOpen === 'undefined' && !_state.navIsOpen ) ) {
			$( 'body' ).addClass( _classes.navOpen );
			_state.navIsOpen = true;
		}
		else {
			$( 'body' ).removeClass( _classes.navOpen );
			_state.navIsOpen = false;
		}
	};

	/**
	 * Toggle header being minimized
	 * @param doMinimize
	 */
	this.toggleHeaderMinimized = function( doMinimize ) {
		if( !_state.navIsOpen && ( doMinimize || ( typeof doMinimize === 'undefined' && !_state.headerIsMinimized ) ) ) {
			$( 'body' ).addClass( _classes.headerMinimized );
			_state.headerIsMinimized = true;
		}
		else {
			$( 'body' ).removeClass( _classes.headerMinimized );
			_state.headerIsMinimized = false;
		}
	};

	/**
	 * Toggle header being minimized
	 * @param isStuck
	 */
	this.toggleHeaderStuckState = function( isStuck ) {
		if( isStuck ) {
			$( 'body' ).addClass( _classes.headerStuck );
			_state.headerIsStuck = true;
		}
		else {
			$( 'body' ).removeClass( _classes.headerStuck );
			_state.headerIsStuck = false;
		}
	};

	/**
	 * Simple getter for reading state
	 * @returns {Object}
	 * @public
	 */
	this.getState = function() {
		return _state;
	};

	this.getHeaderElement = function() {
		return _$header.length ? _$header[0] : false;
	};

	/**
	 * Add an element that should stick to the bottom of the header
	 * @param label
	 * @param el
	 */
	this.addStickyElement = function( label, el ) {
		if( typeof label !== 'string' || !$( el ).length ) return false;

		label = label.toLowerCase().replace( /[^a-z0-9-_]+/g, '-' );

		var newStickyEl = {
			'label' : label,
			'$element' : $( el ),
			'$placeholder' : $( document.createElement( 'div' ) ),
			'isStuck' : false
		};

		// append the placholder after the element
		newStickyEl.$element.after( newStickyEl.$placeholder );

		_additionalStickyEls.push( newStickyEl );

		_moveAdditionalStickyEls();
	};

	this.getAddedStickyElement = function( label ) {
		for( var i = 0; i < _additionalStickyEls.length; i++ ) {
			if( _additionalStickyEls[ i ][ 'label' ] === label ) {
				return _additionalStickyEls[ i ];
			}
		}
	};

	/**
	 * Initialize the class
	 * @returns {boolean}
	 * @public
	 */
	this.init = function( headerEl ) {
		_$header = $( headerEl );

		if( !_$header.length ) return false;

		_$header.after( _$placeholder );

		for( var selector in _headerParts ) {
			_headerParts[ selector ] = _$header.find( _headerParts[ selector ] );
		}

		_attachHandlers();

		// set current nav item
		var $current = _headerParts.$navGroups.filter( '.' + _classes.current );
		var currentId = "" ;

		currentId = $current.length && typeof $current.data( 'navRel' ) === 'string' ? $current.data( 'navRel' ) : "";

		// If it didn't find a nav group, look for just menu items without groups.
		if( ! currentId.length ) {
			$current = _headerParts.$navKeyEls.filter( '.' + _classes.current );
			currentId = $current.length ? $current.data( 'navRel' ) : '';
		}

		if( currentId.length  ) {
			_thatHeader.setCurrentMainNavItem( currentId );
			$( 'body' ).addClass( _classes.navDefaultSet );
			_state.originalGroupId = currentId;
		}

		_dedupeHeaderScrollEvent();

		// check if url has anchor point and trigger scroll event
		if( document.getElementById(window.location.hash.substr(1)) !== null){
			this.scrollToId(window.location.hash);
		}
	};

	this.scrollToId = function ( id ) {
		_headerSmoothScroll.setTarget(id);

		_headerSmoothScroll.scrollNow();
	};
};

var fxcmGlobalHeader = new FxcmGlobalHeader();

jQuery( document ).ready( function( $ ) {
	fxcmGlobalHeader.init( '#global-header' );
} );