export default {
	statusCode: 200,
	data: {
		"code": 200,
		"data": {
			"total": 1,
			"page_size": 10,
			"page": 1,
			"result": [
				// {
				// 	"kitchener": {
				// 		"name": "",
				// 		"head_small": ""
				// 	},
				// 	"status": "5",
				// 	"status_text": {
				// 		"name": "订单提交成功",
				// 		"title": "请及时支付订单",
				// 		"state": "待支付"
				// 	},
				// 	"goods_images": '',
				// 	"pay_type": 0,
				// 	"pay_price": 1200,
				// 	"pay_status": 0,
				// 	"pay_method": "",
				// 	"date": "2022-02-01 10:00:00",
				// },
				{
					"kitchener": {
						"name": "",
						"head_small": ""
					},
					"status": "6",
					"status_text": {
						"name": "订单支付成功",
						"title": "支付成功",
						"state": "待接单"
					},
					"goods_name": '共呜春报晓(鸳鸯鸡)',
					"goods_images": '/static/mock/yuangyangji.jpg',
					"pay_type": 0,
					"pay_price": '199.00',
					"pay_status": 0,
					"pay_method": "",
					"date": "2022-02-10 10:00:00",
				},
				{
					"kitchener": {
						"name": "王磊厨师",
						"head_small": "/static/mock/wangdachu.jpg"
					},
					"status": "7",
					"status_text": {
						"name": "订单已接单",
						"title": "厨师出单中",
						"state": "已接单"
					},
					"goods_name": '沉鱼落雁美(水鱼鸡汤)',
					"goods_images": '/static/mock/jitang.jpg',
					"pay_type": 0,
					"pay_price": '299.00',
					"pay_status": 0,
					"pay_method": "",
					"date": "2022-02-10 10:00:00",
				},
				{
					"kitchener": {
						"name": "刘佳宇厨师",
						"head_small": "/static/mock/liujiayu.jpg"
					},
					"status": "7",
					"status_text": {
						"name": "订单已接单",
						"title": "厨师出单中",
						"state": "已接单"
					},
					"goods_name": '龙皇献彩卷(炸榴连卷)',
					"goods_images": '/static/mock/juang.jpg',
					"pay_type": 0,
					"pay_price": '199.00',
					"pay_status": 0,
					"pay_method": "",
					"date": "2022-02-10 10:00:00",
				},
				{
					"kitchener": {
						"name": "王磊厨师",
						"head_small": "/static/mock/wangdachu.jpg"
					},
					"status": "7",
					"status_text": {
						"name": "订单已接单",
						"title": "厨师出单中",
						"state": "已接单"
					},
					"goods_name": '糖醋大鲤鱼',
					"goods_images": '/static/mock/tangCuDaLiYu.jpeg',
					"pay_type": 0,
					"pay_price": '59.00',
					"pay_status": 0,
					"pay_method": "",
					"date": "2022-02-05 10:00:00",
				},
				{
					"kitchener": {
						"name": "刘佳宇厨师",
						"head_small": "/static/mock/liujiayu.jpg"
					},
					"status": "7",
					"status_text": {
						"name": "订单已接单",
						"title": "厨师出单中",
						"state": "已接单"
					},
					"goods_name": '鱼香茄子',
					"goods_images": '/static/mock/yuxiangqiezi.jpeg',
					"pay_type": 0,
					"pay_price": '29.00',
					"pay_status": 0,
					"pay_method": "",
					"date": "2022-02-02 10:00:00",
				},
				{
					"kitchener": {
						"name": "王大厨",
						"head_small": "https://cdn.idachu.com/uimgs/202006/94e31c7707af5b62eedd272199069603.jpg"
					},
					"status": "7",
					"status_text": {
						"name": "订单已接单",
						"title": "厨师出单中",
						"state": "已接单"
					},
					"goods_name": '商品名称',
					"goods_images": '',
					"pay_type": 0,
					"pay_price": 1200,
					"pay_status": 0,
					"pay_method": "",
					"date": "2022-02-01 10:00:00",
				},
				{
					"kitchener": { // 厨师信息
						"name": "", // 名称
						"head_small": "" // 头像
					},
					"status": "4",
					"status_text": {
						"name": "订单已取消",
						"title": "退款处理中",
						"state": "取消订单"
					},
					"goods_name": '商品名称',
					"goods_images": '',
					"pay_type": 0, // 支付类型
					"pay_price": 1200, // 支付价格
					"pay_status": 0, // 支付状态
					"pay_method": "", // 支付类型
					"date": "2022-02-01 10:00:00", // 支付时间
				},
				{
					"kitchener": {
						"name": "王大厨",
						"head_small": "https://cdn.idachu.com/uimgs/202006/94e31c7707af5b62eedd272199069603.jpg"
					},
					"status": "8",
					"status_text": {
						"name": "订单已出单",
						"title": "订单派送中",
						"state": "已出单"
					},
					"goods_name": '商品名称',
					"goods_images": '',
					"pay_type": 0,
					"pay_price": 1200,
					"pay_status": 0,
					"pay_method": "",
					"date": "2022-02-01 10:00:00",
				},
				{
					"kitchener": {
						"name": "王大厨",
						"head_small": "https://cdn.idachu.com/uimgs/202006/94e31c7707af5b62eedd272199069603.jpg"
					},
					"status": "8",
					"status_text": {
						"name": "订单已完成",
						"title": "用户已接收订单",
						"state": "已完成"
					},
					"goods_name": '商品名称',
					"goods_images": '',
					"pay_type": 0,
					"pay_price": 1200,
					"pay_status": 0,
					"pay_method": "",
					"date": "2022-02-01 10:00:00",
				}
			]
		}
	}
}
