// 貼在browser console，用來解鎖右鍵
(function () {
	function R(this_event) {
		real_event_name = "on" + this_event;
		if (window.addEventListener) {
			this_fun = function (e) {
				for (var n = e.originalTarget; n; n = n.parentNode) {
					n[real_event_name] = null;
				}
			}
			window.addEventListener(this_event, this_fun, true);
		}
		window[real_event_name] = null;
		document[real_event_name] = null;
		if (document.body) {
			document.body[real_event_name] = null
		};
	}
	R("contextmenu");
	R("click");
	R("mousedown");
	R("mouseup");
	R("selectstart");
})()