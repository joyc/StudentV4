const app = new Vue({
	el:'#app',
	data:{
		baseURL: "http://10.37.129.2:8000/",
		students: [],
		total: 100,  //数据总行数
		currentpage: 1,  //当前所在页
		pagesize: 10,  //每页显示多少
	},
	mounted() {
        //自动加载数据
        this.getStudents();
    },
    methods: {
		//获取所有学生信息
		getStudents: function(){
			//使用 axios 实现 Ajax 请求
			axios
			.get(this.baseURL + "students/")
			.then(function(res){
				// 请求成功后执行的回调函数
				console.log(res);
			})
			.catch(function(err){
				// 请求失败后调用的函数
				console.log(err);
			});
		},
	},
})