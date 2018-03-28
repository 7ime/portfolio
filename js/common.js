"use strict"


	window.onload = function() {


		//-------------------------------------------------
		//--------------- Скрытие лоадера -----------------
		//-------------------------------------------------

		function hideLoader() {
			var loaderWrap = document.getElementsByClassName('loader-wrap')[0];

			document.getElementsByClassName('loader')[0].style.opacity = 0;
			loaderWrap.style.opacity = 0;		

			setTimeout(function() {
				loaderWrap.style.display = 'none';			
			},1000)
		}
		
		hideLoader();
	

		//-------------------------------------------------
		//--------------------- Меню ----------------------
		//-------------------------------------------------

		var menuTrigger 			= document.querySelector('.menu-trigger'),
				menu 							= document.querySelector('.menu'),
				contentWrapper 		= document.querySelector('.content-wrapper'),
				menuList 					= document.querySelector('.menu ul'),
				clickMenuTrigger	= true;

		menuTrigger.onclick = clickMenu;

		document.onkeypress = function(event) {
			if(event.code == 'KeyM') {
				showMenu();
			}
		}
		document.onkeydown = function(event) {
			if(event.code == 'Escape') {
				hideMenu();
			}
		}

		function clickMenu() {
			if(clickMenuTrigger) {
				showMenu();
			}
			else {
				hideMenu();
			}
			clickMenuTrigger = !clickMenuTrigger;
		}

		function showMenu() {

			menuTrigger.classList.add('menu-trigger-is-active');

			if(window.innerWidth > 600) {
				menu.style.width = '400px';
				contentWrapper.style.marginLeft = '340px';
				menuTrigger.style.marginLeft = '310px';
			}
			else {
				menu.style.width = '300px';
				contentWrapper.style.marginLeft = '240px';
				menuTrigger.style.marginLeft = '220px';
			}
			setTimeout(function() {
		   	 	menuList.style.cssText = "\
		   	 		margin-left: 0; \
		   			opacity: 1; \
		   			transition: 0.2 ease;\
		   	 	";
		  }, 300)

		}
		function hideMenu() {
			
			menuTrigger.classList.remove('menu-trigger-is-active');
			menu.style.width = '60px';
			contentWrapper.style.marginLeft = 0;
		 	menuList.style.cssText = "\
		 		margin-left: -400px; \
				opacity: 0; \
				transition: 0s ease;\
		 	";
		 	menuTrigger.style.marginLeft = '-16px';
		}


		//-------------------------------------------------
		//------------ Плавная прокрутка ------------------
		//-------------------------------------------------

		var linkNav = document.querySelectorAll('[href^="#"]'), 
		    V 			= 0.2;  
		for (var i = 0; i < linkNav.length; i++) {
		    linkNav[i].addEventListener('click', function(e) { 
		        e.preventDefault(); 

		        var w = window.pageYOffset,
		            hash = this.href.replace(/[^#]*(.*)/, '$1');
		        var t = document.querySelector(hash).getBoundingClientRect().top,
		            start = null;
		        requestAnimationFrame(step);
		        function step(time) {
		            if (start === null) start = time;
		            var progress = time - start,
		                r = (t < 0 ? Math.max(w - progress/V, w + t) : Math.min(w + progress/V, w + t));
		            window.scrollTo(0,r);
		            if (r != w + t) {
		                requestAnimationFrame(step)
		            } else {
		                location.hash = hash
		            }
		        }
		    }, false);
		}


		window.onscroll = function(event) {


			//-------------------------------------------------
			//---- Подсвечивание пункта менб при прокрутке ----
			//-------------------------------------------------

			function activeItemMenu() {
				var idForMenuOne		= document.getElementById('t1').offsetTop,
						idForMenuTwo 		= document.getElementById('t2').offsetTop,
						idForMenuThree 	= document.getElementById('t3').offsetTop,
						idForMenuFour 	= document.getElementById('t4').offsetTop;

				var body 						= document.body,
						html 						= document.documentElement;

				var height 					= Math.max( body.scrollHeight, body.offsetHeight, 
			                       						html.clientHeight, html.scrollHeight, html.offsetHeight );

				var scrollTop 			= window.pageYOffset || document.documentElement.scrollTop;

				var menuItem = document.querySelectorAll('.menu ul li');

				function deleteItemIsActive() {
					for(var i = 0; i < menuItem.length; i++) {
							menuItem[i].classList.remove('menu-item-is-active')
					}
				}
				var heightWin = window.innerHeight;
				if(scrollTop + heightWin > idForMenuFour) {
				
					deleteItemIsActive()
					document.querySelector('.menu ul li a[href="#t4"]').parentElement.classList.add('menu-item-is-active');
				}
				else if(scrollTop + 20 > idForMenuThree) {
					deleteItemIsActive()
					document.querySelector('.menu ul li a[href="#t3"]').parentElement.classList.add('menu-item-is-active');
				}
				else if(scrollTop + 20 > idForMenuTwo) {

					deleteItemIsActive()
					document.querySelector('.menu ul li a[href="#t2"]').parentElement.classList.add('menu-item-is-active');
				}
				else if(scrollTop + 20 > idForMenuOne) {
					

					deleteItemIsActive()
					document.querySelector('.menu ul li a[href="#t1"]').parentElement.classList.add('menu-item-is-active');
				}
				else {
					deleteItemIsActive()
					document.querySelector('.menu ul li a[href="#t4"]').parentElement.classList.add('menu-item-is-active');
				}

			}

			activeItemMenu();

			
			//-------------------------------------------------
			//--------------- Прокрутка вверх -----------------
			//-------------------------------------------------

			var scrollPageY,
					scrollTimer;

			document.getElementById('scrollup').onclick = function() {
					scrollPageY = window.pageYOffset || document.documentElement.scrollTop;
					scrollToTop();
			}

			function scrollToTop() {
				if(scrollPageY > 0) {
					window.scrollTo(0, scrollPageY);
					scrollPageY = scrollPageY - 200;
					scrollTimer = setTimeout(scrollToTop ,10)
				}
				else {
					clearTimeout(scrollTimer);
					window.scrollTo(0,0);
				}
			}

			function showScrollUp () {
				
				var scrollUp = document.getElementById('scrollup');
				var top = Math.max(window.pageYOffset,document.documentElement.scrollTop);
				if(top > 200) {
					setTimeout(function() {
						scrollUp.style.display = 'block';	
					},500)
					scrollUp.style.opacity = 1;
				}
				else if (top < 200) {
					scrollUp.style.opacity = 0;
					setTimeout(function() {
						scrollUp.style.display = 'none';
					},500)
				}
			}

			showScrollUp();

		} //window.onscroll


		//-------------------------------------------------
		//---------------------- НАВЫКИ  ------------------
		//-------------------------------------------------
		
		function progressLine() {
			var itemProgress = document.querySelectorAll('[data-progress-line]');
			for(var i = 0; i < itemProgress.length; i++) {
				var progressLinePercent = itemProgress[i].getAttribute('data-progress-line');
				itemProgress[i].innerHTML += '\
					<figure class="progress-line">\
						<span class="progress-line-percent" style="width: ' + progressLinePercent + ' "><strong>' + progressLinePercent + '</strong></span>\
					</figure>\
				';
			}
		}

		progressLine();

		function progressPie() {
			var pie = document.querySelectorAll('[data-progress-pie]');
			for(var i = 0; i < pie.length; i++) {
				var piePercent = pie[i].getAttribute('data-progress-pie');
				
				if(piePercent >= 50) {
					pie[i].innerHTML += '\
						<div class="progress-pie-inner-part">\
							<span class="progress-pie-percent">' + piePercent + '<span>%</span></span>\
							<div class="progress-pie-range" style="clip: rect(auto, auto, auto, auto)">\
								<div class="progress-pie-range-left progress-pie-range-half" style="transform: rotate(' + piePercent*3.6 + 'deg); clip: rect(0, 8em, 16em, 0);"></div>\
								<div class="progress-pie-range-right progress-pie-range-half" style="transform: rotate(180deg); clip: rect(0, 8em, 16em, 0);"></div>\
							</div>\
						</div>\
					';
				}
				else {
					pie[i].innerHTML += '\
						<div class="progress-pie-inner-part">\
							<span class="progress-pie-percent">' + piePercent + '<span>%</span></span>\
							<div class="progress-pie-range" style="clip: rect(0, 16em, 16em, 8em);">\
								<div class="progress-pie-range-left progress-pie-range-half" style="display: none"></div>\
								<div class="progress-pie-range-right progress-pie-range-half" style="transform: rotate(' + piePercent*3.6 +'deg); clip: rect(0, 8em, 16em, 0)"></div>\
							</div>\
						</div>\
					';
				}
			}
		}

		progressPie();
		

		//-------------------------------------------------
		//--------------------- ВКЛАДКИ  ------------------
		//-------------------------------------------------

		function tabs() {
			var tabNavItem = document.querySelectorAll('[data-tab]');
			tabNavItem.forEach(function(item) {

				var dataItem 		= item.getAttribute('data-tab'),
						parentItem	= item.parentElement.querySelectorAll('.tabs-nav-button'),
						tabCurrent 	= document.getElementById(dataItem),
						tabSibling 	= tabCurrent.parentElement.querySelectorAll('.tab');

				item.onclick = tabShow;

				function tabShow() {
					if(item.classList.contains('tabs-nav-button-is-active')) {
						return false;
					}

					for(var i = 0; i < tabSibling.length; i++) {
						tabSibling[i].classList.remove('tab-is-active');
					}

					tabCurrent.classList.add('tab-is-active');	

					for(var i = 0; i < parentItem.length; i++) {
						parentItem[i].classList.remove('tabs-nav-button-is-active');
					}

					item.classList.add('tabs-nav-button-is-active')
									
				}
			});
		}

		tabs();

		//-------------------------------------------------
		//------------ Подгрузка изображений  -------------
		//-------------------------------------------------

		function loadImg() {
			var dataImg = document.querySelectorAll('[data-img]');

			for(var i = 0; i < dataImg.length; i++) {
				dataImg[i].innerHTML = '\
					<img src="' + dataImg[i].getAttribute('data-img') + '" alt="">\
				';
			}
		}

		loadImg();

	} //window.onload