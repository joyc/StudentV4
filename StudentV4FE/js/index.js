const app = new Vue({
	el:'#app',
	data:{
		msg:'Hello, Vue!',
		students: [
			{
				sno: 95001, name: '刘建辉', gender: '男', birthday: '2016-05-02', mobile: '1893455678',
				email: 'liujianhui@163.com', address: '上海市普陀区金沙江路 1518 弄'
			},
			{
				sno: 95002, name: ' 陈燕', gender: '女', birthday: '2016-05-02', mobile: '1893455678',
				email: ' chenyan@sohu.com', address: '上海市普陀区金沙江路 1518 弄'
			},
			{
				sno: 95003, name: '马建', gender: '男', birthday: '2016-05-02', mobile: '1893455678',
				email: ' majian@sina.com', address: '上海市普陀区金沙江路 1518 弄'
			},
			{
				sno: 95001, name: '刘建辉', gender: '男', birthday: '2016-05-02', mobile: '1893455678',
				email: 'liujianhui@163.com', address: '上海市普陀区金沙江路 1518 弄'
			},
			{
				sno: 95002, name: ' 陈燕', gender: '女', birthday: '2016-05-02', mobile: '1893455678',
				email: ' chenyan@sohu.com', address: '上海市普陀区金沙江路 1518 弄'
			},
			{
				sno: 95003, name: '马建', gender: '男', birthday: '2016-05-02', mobile: '1893455678',
				email: ' majian@sina.com', address: '上海市普陀区金沙江路 1518 弄'
			},
			{
				sno: 95001, name: '刘建辉', gender: '男', birthday: '2016-05-02', mobile: '1893455678',
				email: 'liujianhui@163.com', address: '上海市普陀区金沙江路 1518 弄'
			},
			{
				sno: 95002, name: ' 陈燕', gender: '女', birthday: '2016-05-02', mobile: '1893455678',
				email: ' chenyan@sohu.com', address: '上海市普陀区金沙江路 1518 弄'
			},
			{
				sno: 95003, name: '马建', gender: '男', birthday: '2016-05-02', mobile: '1893455678',
				email: ' majian@sina.com', address: '上海市普陀区金沙江路 1518 弄'
			},
			{
				sno: 95001, name: '刘建辉', gender: '男', birthday: '2016-05-02', mobile: '1893455678',
				email: 'liujianhui@163.com', address: '上海市普陀区金沙江路 1518 弄'
			},
		],
		total: 100,  //数据总行数
		currentpage: 1,  //当前所在页
		pagesize: 10,  //每页显示多少
	}
})