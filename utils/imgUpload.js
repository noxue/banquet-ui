module.exports = {
	uploadimg: function o(a) {
		console.log(a),
			uni.showLoading({
				title: '正在上传...',
				mask: !0
			});
		var e = a.that,
			t = a.i ? a.i : 0,
			s = a.success ? a.success : 0,
			l = a.fail ? a.fail : 0;
		console.log(e),
			uni.uploadFile({
				url: a.url,
				filePath: a.path[t],
				name: 'file',
				formData: {
					token: a.token
				},
				success: function(o) {
					console.log(t + ' ====== ' + JSON.stringify(o)), 200 == o.statusCode && s++;
					var l = JSON.parse(o.data);
					console.log(l.key), console.log(a);
					var i = 'https://imgck.5156dujia.com/' + l.key;

					if (null != l.key) {
						var c;
						if ((console.log(i), 'cookList' == a.arrName))
							(c = a.arr).push(i),
							e.setData({
								cookList: c
							});
						if ('photo' == a.arrName)
							(c = a.arr).push(i),
							e.setData({
								photo: c
							}),
							console.log(e.data.photo);
						if ('healthy' == a.arrName)
							(c = a.arr).push(i),
							e.setData({
								healthy: c
							}),
							console.log(e.data.healthy);

						if ('"certificates"' == a.arrName) {
							var n = a.arr,
								r = a.index;
							console.log(n, r),
								(n[r].url = i),
								e.setData({
									certificatesList: n
								}),
								console.log(e.data.certificatesList);
						}

						console.log(t);
					}
				},
				fail: function(o) {
					l++, console.log('fail:' + t + 'fail:' + l);
				},
				complete: function() {
					console.log(t),
						++t == a.path.length ?
						(uni.hideLoading(),
							console.log('执行完毕'),
							uni.showLoading({
								title: '正在上传处理...',
								mask: !0
							}),
							setTimeout(function() {
								e.setData({
										isNext: !0
									}),
									uni.hideLoading();
							}, 2e3),
							console.log('成功：' + s + ' 失败：' + l)) :
						(console.log(t), (a.i = t), (a.success = s), (a.fail = l), o(a));
				}
			});
	}
};
