/**
 * 获取上一个页面的实例
 */
export function getUpPage() {
	let pageList = getCurrentPages();
	if (pageList.length > 1) {
		let pageInfo = pageList[pageList.length - 2];
		return pageInfo;
	} else {
		return false
	}
}

/**
 * 在路由路径中
 */
export function inRoutePath() {

}
