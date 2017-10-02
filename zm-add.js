(function() {
	// var contextPath = "http://192.168.0.188:9082/";
	var contextPath = "http://192.168.0.115:8803/";
	var choiseSelect = $(".choiseOp select ")
	var choiseboxBottom = $(".choiseBox_bottom")
	var choiseboxCenter = $(".choiseBox_center")
	var zmUpload = $(".zm_upload")
	var colpicknewColor = $(".colpick_new_color")
	var colpickSubmit = $(".colpick_submit")
	var zmresourceName = $(".zm_resourceName")
	var zmUpdata = $(".zm_updata")
	var videoPlay = $("#play")
	var videoPause = $("#pause")
	var zmvideobovolSvg1 = $(".zm-video-bottom-vol .svg1")
	var zmvideobovolSvg2 = $(".zm-video-bottom-vol .svg2")
	var zmplaybtnSvg = $(".zm-playbtnsvg")

	//操作表收起
	$(".zm_data .zm_retract img").click(function() {
		$(".zm_table").slideToggle()
	})

	//资源名称判断
	zmresourceName.on("keyup", function() {
		resourceReg()
	})

	function resourceReg() {
		var resourceName = /^([a-zA-Z\d]{1,30}|[\u4e00-\u9fa5\da-zA-Z]{1,15})$/;
		if(!resourceName.test(zmresourceName.val())) {
			$(".zm_resourcehtml").html(" ※请填写不大于30个字符或15个汉字！");
			return 1;
		} else {
			$(".zm_resourcehtml").html("")
			return 0;
		}
	};
	//排序判断
	$(".zm_sort").on("keyup", function() {
		sortReg()
	})

	function sortReg() {
		var updataReg = /^[1-9]\d*$/;
		if(!updataReg.test($(".zm_sort").val())) {
			$(".zm_updata").html("※请填写正整数！")
			return 1;
		} else {
			$(".zm_updata").html("")
			return 0;
		}
	}

	//色块是否有颜色判断
	$(".zm_upload").on("click", function() {

		if($(".zm_upload").css("background-color") == 'rgb(0,0,0)') {
			console.log('x')
		} else {
			console.log('p')
		}
	})

	//图片上传
	$(".zm_choisebtn").click(function() {
		$(".updataInp").click()
		return false;
	})
	//判断图片是否存在
	$(".contents").mouseover(function() {
		if($(".imgWrap img").length == 1) {
			$(".zm_piclook").html("※请添加图片！")
		} else {
			$(".zm_piclook").html("")
			$(".zm_choisebtn").html("替换")
		}
	})
	//选择切换色块丶图片丶视频
	$(".choiseOp select").change(function() {
		if(choiseSelect.val() == 1) {
			$(".choiseBox_top").show().siblings().hide()
			$(".zm_addmvbtn_hide").hide()
		} else if(choiseSelect.val() == 2) {
			choiseboxCenter.show().siblings().hide()
			$(".zm_addmvbtn_hide").hide()
		} else if(choiseSelect.val() == 3) {
			choiseboxBottom.show().siblings().hide()
			$(".zm_addmvbtn_hide").css("visibility", "visible")
		}
	})
	//视频上传按钮
	$(".zm_addmvbtn").click(function() {
		return false;
	})

	//工作流列表
	$.ajax({
		url: contextPath + "sysComponentType/getWorkList",
		data: {
			"id": 2305
		},
		type: "post",
		success: function(data) {

			var html = template("listtpl1", data)
			$(".cometpl").html(1111)
		}
	})

	// 获取url的id
	var url = location.search
	var Request = new Object();
	if(url.indexOf("?") != -1) {
		var str = url.substr(1) //去掉?号 
		strs = str.split("&");
		for(var i = 0; i < strs.length; i++) {
			Request[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
		}
		fId = Request["imgi"]
		$.ajax({
			url: contextPath + "imageUpload/save",
			data: {
				"fId": fId
			},
			success: function(data) {
				console.log(data)
				$(".zm-resourceid").val()
				zmresourceName.val()
				$(".zm_sort").val()
			}
		})
	}

	//新增页面保存按钮
	$(".zm_keepbtn").on("click", function() {
		$.ajax({
			url: contextPath + "imageUpload/save",
			type: "post",
			data: {
				"fId": "族蚂",
				"fOriginalFileName": "族蚂",
				"fUploadUserId": 77,
				"fUrl": "http://image.zuma.com/upload/908223838935284372.jpg",
				"fRegularFileName": "http://image.zuma.com/upload/908223838935284372.jpg",
				"fFromTypeId": 0,
				"fIsTrash": 0,
				"fIsDelete": 0
			},
			success: function(data) {
				if(data.status == 0) {

					alert('保存成功');
				} else {

					alert('保存失败');
				}
			}
		})
	})

	//视频播放功能
	//播放暂停按钮
	var flag = true;
	videoPlay.on("click", function() {
		if(flag) {
			$(this).css("display", "none").siblings("#pause").css("display", "block")
			$(".zm_addmvbox video").get(0).play()
			zmplaybtnSvg.css("display", "none")
			 $(".zm-pausebtnsvg").css("display", "block")         
		}
		return false;
	})
	videoPause.on("click", function() {
		if(flag) {
			$(this).css("display", "none").siblings("#play").css("display", "block")
			$(".zm_addmvbox video").get(0).pause()
			zmplaybtnSvg.css("display", "block")
			$(".zm-pausebtnsvg").css("display", "none")
		}
		return false;
	})

	//播放器大播放暂停按钮
	zmplaybtnSvg.on("click", function() {
		videoPlay.click()
		$(".zm-pausebtnsvg").css("display", "block")
	})
	$(".zm-pausebtnsvg").on("click", function() {
		videoPause.click()
		zmplaybtnSvg.css("display", "block")
	})

	//  zm-pausebtnsvg  

	//点击按钮全屏事件
	var full = document.querySelector(".zm-video-bottom-enl")
	var video = document.querySelector(".zm-video")
	full.onclick = function() {
		video.webkitRequestFullScreen()
	}
	//进度条的事件
	var elem = document.querySelector('.js-min-max-start'); //选择input元素
	var init = new Powerange(elem, {
		min: 0,
		max: 100,
		start: 0,
		hideRange: true,
		step: 1
	}); //实例化powerange类并且初始化参数
	$("input").change(function() {
		if($(this).val() == 100) {

		}
	})
	//进度条位置改变同步视频
	$(".js-min-max-start").change(function() {
		video.currentTime = $(this).val() / 100 * video.duration
	})

	//视频播放同步进度条位置
	video.ontimeupdate = function() {
		var circleLeft = video.currentTime / video.duration * 410;
		$(".zm-video-bottom-pro .range-handle").css("left", circleLeft)
		$(".zm-video-bottom-pro .range-quantity").css("width", circleLeft + 1)
		if($(".range-handle").css("left") == '410px') {
			videoPlay.css("display", "block")
			videoPause.css("display", "none")
			zmplaybtnSvg.css("display", "block")
			$(".zm-pausebtnsvg").css("display", "none")
		}
	}
	//音量播放
	zmvideobovolSvg2.css({
		"display": "none"
	})
	var ele = document.querySelector('.js-min-max-clo'); //选择input元素
	var ini = new Powerange(ele, {
		min: 0,
		max: 100,
		start: 0,
		hideRange: true,
		step: 1,
		vertical: true
	}); //实例化powerange类并且初始化参数
	//拖拽进度条改变音量大小
	$(".js-min-max-clo").change(function() {
		video.volume = $(this).val() / 100
		if(video.volume == 0) {
			zmvideobovolSvg1.css("display", "none")
			zmvideobovolSvg2.css("display", "block")
		} else {
			zmvideobovolSvg1.css("display", "block")
			zmvideobovolSvg2.css("display", "none")
		}
	})
	$(".range-handle").on("click", function(e) {
		// 阻止事件冒泡
		e.stopPropagation();
	})
	// 点击小喇叭的时候直接静音
	var flag2 = true;
	$(".zm-video-bottom-vol svg").on("click", function() {
		if(flag2) {
			flag2 = false;
			video.volume = 0;
			// $(".js-min-max-clo").val("0");
			$(".zm-video-bottom-bgc .range-handle").css("bottom", 0)
			$(".zm-video-bottom-bgc .range-quantity").css("height", 0)
			zmvideobovolSvg1.css("display", "none")
			zmvideobovolSvg2.css("display", "block")
		} else {
			flag2 = true;
			video.volume = 1;
			$(".zm-video-bottom-bgc .range-handle").css("bottom", 82)
			$(".zm-video-bottom-bgc .range-quantity").css("height", 82)
			zmvideobovolSvg1.css("display", "block")
			zmvideobovolSvg2.css("display", "none")
		}
		return false;
	})
	//点击页面色块
	zmUpload.click(function() {
		$(this).css("background-image", "none")
	})
	//调取取色器
	zmUpload.colpick({
		colorScheme: '#ffffff',
		livePreview: 0,
		color: "#ffffff",
		onSubmit: function(hsb, hex, rgb, el) {
			$(el).css('background-color', '#' + hex);
			$(el).colpickHide();
		}
	});
	//拖拽取色器
	$(".colpick").draggable();
	//经典色块点击加边框以及换色效果
	$("#zm-frequentlyColorSpan li").on("click", function() {
		$(this).css({
			"width": "17px",
			"height": "18px",
			"border": "1px #ffffff solid"
		}).siblings().css({
			"width": "19px",
			"height": "20px",
			"border": "none"
		})
		var backColor = $(this).css("background-color")
		$(".colpick_new_color").css("background-color", backColor)
		//xxxxxxx
		var inputColor = $(".colpick_hex_field input")
		var oxColor = backColor.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
		delete(oxColor[0]);
		for(var n = 1; n <= 3; ++n) {
			oxColor[n] = parseInt(oxColor[n]).toString(16);
			if(oxColor[n].length == 1) oxColor[n] = '0' + oxColor[n];
		}
		var str = oxColor.join('');
		inputColor.val(str);
		//ppppppp
		$(".colpick_submit").on("click", function() {
			var backColorn = $(".colpick_new_color").css("background-color")
			$(".zm_upload").css("background-color", backColorn)
		})
	})
	zmUpload.on("click", function() {
		var backColorp = zmUpload.css("background-color")
		$(".colpick_current_color").css("background-color", backColorp)
	})
	//添加到我喜欢
	$(".mysvg").on("click", function() {
		var _this = $(this)
		var strs = $(".zm-colorbox").length
		var zmcolorBox = $(".zm-colorbox")
		var backColorn = $(".colpick_new_color").css("background-color")
		//xxxxxxx
		var inputColor = $(".colpick_hex_field input")
		var oxColor = backColorn.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
		delete(oxColor[0]);
		for(var n = 1; n <= 3; ++n) {
			oxColor[n] = parseInt(oxColor[n]).toString(16);
			if(oxColor[n].length == 1) oxColor[n] = '0' + oxColor[n];
		}
		var str = oxColor.join('');
		inputColor.val(str);
		//ppppppp

		//获取喜欢颜色十六进制
		var strArray = [];
		zmcolorBox.each(function(index, ele) {
			var eachColor = $(this).css("background-color")
			//xxxxxxx
			var oxColor = eachColor.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
			delete(oxColor[0]);
			for(var n = 1; n <= 3; ++n) {
				oxColor[n] = parseInt(oxColor[n]).toString(16);
				if(oxColor[n].length == 1) oxColor[n] = '0' + oxColor[n];
			}
			var str = oxColor.join('');
			strArray.push(str)
		})

		if($.inArray(str, strArray) == -1) {
			$(".zm-addcolorbox").prepend('<div class="zm-colorbox" style="background-color: ' + backColorn + '; border: none;"></div>')
		}
		//判断喜欢的颜色盒子个数
		if(strs > 17) {
			$(".zm-addcolorbox div:last").remove()
		}
	});
	//点击我喜欢的颜色
	$(".zm-addcolorbox").on("click", ".zm-colorbox", function() {
		var backColor = $(this).css("background-color")
		$(".colpick_new_color").css("background-color", backColor)
		//xxxxxxx
		var inputColor = $(".colpick_hex_field input")
		var oxColor = backColor.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
		delete(oxColor[0]);
		for(var n = 1; n <= 3; ++n) {
			oxColor[n] = parseInt(oxColor[n]).toString(16);
			if(oxColor[n].length == 1) oxColor[n] = '0' + oxColor[n];
		}
		var str = oxColor.join('');
		inputColor.val(str);
		//ppppppp
		$(".colpick_submit").on("click", function() {
			var backColorn = $(".colpick_new_color").css("background-color")
			$(".zm_upload").css("background-color", backColorn)
		})
	})
	//点击新颜色&&当前色
	$(".colpick_new_color").on("click", function() {
		return false;
	})
	//隐藏视频&&上传图片 
	choiseboxCenter.css("display", "none")
	// choiseboxBottom.css("display", "none")

	//闪烁事件  
	var video_bottom = $(".zm-video-bottom");
	video_bottom.hide();
	$(".zm_addmvbox").on("mouseover", function() {
		video_bottom.show();
	})
	$(".zm_addmvbox").on("mouseout", function() {
		video_bottom.hide();
	})

	//取消表头右侧滚动条
	$("table thead").css("overflow-y", "hidden")

})();