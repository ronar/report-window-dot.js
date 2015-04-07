$(document).ready(function () {
	var dasinfo = $(".def-army-sum-info-overflow");//document.querySelector(".def-army-sum-info");
	var aasinfo = $(".atk-army-sum-info-overflow");//document.querySelector(".def-army-sum-info");
	var def_ontop = $(".def-ontop");
	var atk_ontop = $(".atk-ontop");

	var dasio = document.querySelector(".def-army-sum-info-overflow");
	var aasio = document.querySelector(".atk-army-sum-info-overflow");

	var dw = document.querySelector(".defenders-wrapper");
	var aw = document.querySelector(".assailants-wrapper");

	var dstrs = document.querySelector(".destructions");

	def_ontop.addClass("disp-none");
	atk_ontop.addClass("disp-none");

	if (dw && dw.offsetHeight < dw.scrollHeight) {
		$(".defenders-wrapper").css("overflow-y", "scroll");
		$(".defenders-wrapper").jScrollPane({verticalDragMaxHeight: 14});
	}

	if (aw && aw.offsetHeight < aw.scrollHeight) {
		$(".assailants-wrapper").css("overflow-y", "scroll");
		$(".assailants-wrapper").jScrollPane({verticalDragMaxHeight: 14});
	}

	if (dstrs && dstrs.offsetHeight < dstrs.scrollHeight) {
		$(".destructions").jScrollPane({verticalDragMaxHeight: 14});
	}

	$(".def-spoiler-opener").click(function (e) {
		$(this).addClass("disp-none");
		def_ontop.removeClass("disp-none");
		dasinfo.addClass("def-army-sum-info-exp");
		$('.def-army-sum-info-exp').jScrollPane({verticalDragMaxHeight: 14});
		$(".def-army-sum-info-overflow .jspVerticalBar").removeClass("disp-none");
		$(".def-army-sum-info-overflow .bot-shadow").appendTo(".def-army-sum-info-overflow .jspContainer");
		$(".def-army-sum-info-overflow").remove(".bot-shadow");
		$(".def-army-sum-info-exp .units").css("padding-right", "30px");
	});

	$(".def-ontop").click(function (e) {
		$(".def-army-sum-info-exp .units").css("padding-right", "");
		dasinfo.removeClass("def-army-sum-info-exp");
		$(this).addClass("disp-none");
		$(".def-spoiler-opener").removeClass("disp-none");
		$(".def-army-sum-info-overflow .jspVerticalBar").addClass("disp-none");
		$(".def-army-sum-info-overflow .jspContainer .bot-shadow").appendTo(".def-army-sum-info-overflow");
		$(".def-army-sum-info-overflow .jspContainer").remove(".bot-shadow");
	});

	$(".atk-spoiler-opener").click(function (e) {
		$(this).addClass("disp-none");
		atk_ontop.removeClass("disp-none");
		aasinfo.addClass("atk-army-sum-info-exp");
		$('.atk-army-sum-info-exp').jScrollPane({verticalDragMaxHeight: 14});
		$(".atk-army-sum-info-overflow .jspVerticalBar").removeClass("disp-none");
		$(".atk-army-sum-info-overflow .bot-shadow").appendTo(".atk-army-sum-info-overflow .jspContainer");
		$(".atk-army-sum-info-overflow").remove(".bot-shadow");
		$(".atk-army-sum-info-exp .units").css("padding-right", "30px");
	});

	$(".atk-ontop").click(function (e) {
		$(".atk-army-sum-info-exp .units").css("padding-right", "0");
		aasinfo.removeClass("atk-army-sum-info-exp");
		$(this).addClass("disp-none");
		$(".atk-spoiler-opener").removeClass("disp-none");
		$(".atk-army-sum-info-overflow .jspVerticalBar").addClass("disp-none");
		$(".atk-army-sum-info-overflow .jspContainer .bot-shadow").appendTo(".atk-army-sum-info-overflow");
		$(".atk-army-sum-info-overflow .jspContainer").remove(".bot-shadow");	});

	$(".window-title-right .btn-cls").click(function (e) {
		$("#wrapper").css("display", "none");
	});

	$(".btn-rep").click(function (e) {
		$("#wrapper").css("z-index", "-1");
		$(".report-wnd").css("display", "block");
	});

	$(".report-wnd .btn-cls").click(function (e) {
		$(".report-wnd").css("display", "none");
		$("#wrapper").css("z-index", "");
	});

	$(document).tooltip({
        content: function () {
            return $(this).prop('title');
        },
        show: null,
        position: {my: "left top", at: "right center"},
        close: function (event, ui) {
            ui.tooltip.hover(

            function () {
                $(this).stop(true).fadeTo(400, 1);
            },

            function () {
                $(this).fadeOut("400", function () {
                    $(this).remove();
                })
            });
        }
    });

    $(".butt").click(function (e) {
    	console.log("yep");
    });

    $(document).on('click', '.bdetails', function(e)
	{
		e.preventDefault();
		var a = $(this);
		var aId = a.attr('id');
		var cityN = aId.slice(11);
		var side = aId.slice(0, 3);

		$("#wrapper").css("z-index", "-1");
		$("#battle-details").css("display", "block");

		var unitsTemp = doT.template(document.getElementById('unitstemp').text);

		var cityTemp, windowTitleTemp;

		windowTitleTemp = doT.template(document.getElementById('windowtitletemp').text);
		cityTemp = doT.template(document.getElementById('citytemp').text);
		
		if (side === "def")
		{
			var cityData = {
				country: data.def_cities[cityN].country,
				flag: data.def_cities[cityN].flag,
				gov_name: data.def_cities[cityN].gov_name,
				gov_pic: data.def_cities[cityN].gov_pic,
				battle_rate: data.def_cities[cityN].battle_rate
			}

			var windowData = {
				city_name: data.def_cities[cityN].city_name,
				city_pic: data.def_cities[cityN].city_pic
			};

 			$('.bd-window-title').html(windowTitleTemp(windowData));
 			$('#battle-details .city-wrapper').html(cityTemp(cityData));

			//$('#battle-details').html(bdTemp(data));

			$('#battle-details .def-army-sum-info .assault').html(unitsTemp(data.def_cities[cityN].army.assault));
			$('#battle-details .def-army-sum-info .archers').html(unitsTemp(data.def_cities[cityN].army.archers));
			$('#battle-details .def-army-sum-info .cavalry').html(unitsTemp(data.def_cities[cityN].army.cavalry));

			$('#battle-details .def-flln-sum-info .assault').html(unitsTemp(data.def_cities[cityN].fallen.assault));
			$('#battle-details .def-flln-sum-info .archers').html(unitsTemp(data.def_cities[cityN].fallen.archers));
			$('#battle-details .def-flln-sum-info .cavalry').html(unitsTemp(data.def_cities[cityN].fallen.cavalry));

			$('#battle-details .def-surv-sum-info .assault').html(unitsTemp(data.def_cities[cityN].survived.assault));
			$('#battle-details .def-surv-sum-info .archers').html(unitsTemp(data.def_cities[cityN].survived.archers));
			$('#battle-details .def-surv-sum-info .cavalry').html(unitsTemp(data.def_cities[cityN].survived.cavalry));
		}

		if (side === "atk")
		{
			var cityData = {
				country: data.atk_cities[cityN].country,
				flag: data.atk_cities[cityN].flag,
				gov_name: data.atk_cities[cityN].gov_name,
				gov_pic: data.atk_cities[cityN].gov_pic,
				battle_rate: data.atk_cities[cityN].battle_rate
			}

			var windowData = {
				city_name: data.atk_cities[cityN].city_name,
				city_pic: data.atk_cities[cityN].city_pic
			};

 			$('.bd-window-title').html(windowTitleTemp(windowData));
 			$('#battle-details .city-wrapper').html(cityTemp(cityData));

			$('#battle-details .def-army-sum-info .assault').html(unitsTemp(data.atk_cities[cityN].army.assault));
			$('#battle-details .def-army-sum-info .archers').html(unitsTemp(data.atk_cities[cityN].army.archers));
			$('#battle-details .def-army-sum-info .cavalry').html(unitsTemp(data.atk_cities[cityN].army.cavalry));

			$('#battle-details .def-flln-sum-info .assault').html(unitsTemp(data.atk_cities[cityN].fallen.assault));
			$('#battle-details .def-flln-sum-info .archers').html(unitsTemp(data.atk_cities[cityN].fallen.archers));
			$('#battle-details .def-flln-sum-info .cavalry').html(unitsTemp(data.atk_cities[cityN].fallen.cavalry));

			$('#battle-details .def-surv-sum-info .assault').html(unitsTemp(data.atk_cities[cityN].survived.assault));
			$('#battle-details .def-surv-sum-info .archers').html(unitsTemp(data.atk_cities[cityN].survived.archers));
			$('#battle-details .def-surv-sum-info .cavalry').html(unitsTemp(data.atk_cities[cityN].survived.cavalry));
		}

		// TODO: remove this!!
		$(".bd-window-title-right .btn-cls").click(function (e) {
			$("#battle-details").css("display", "none");
			$("#wrapper").css("z-index", "");
		});

	});

});