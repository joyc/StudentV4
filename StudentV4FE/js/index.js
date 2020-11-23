const app = new Vue({
	el: '#app',
	data: {
		baseURL: "http://10.37.129.2:8000/",
		students: [],
		pageStudents: [],  //分页后当前页 学生数
		inputStr: '',  //输入的查询条件
		
		// ===  分页相关变量 ===
		dialogVisible: false,  //弹出框默认展示
		studentForm: {
			sno:'',
			name:'',
			gender:'',
			birthday:'',
			mobile:'',
			email:'',
			address:'',
			image:''
		},
		
		// ===  分页相关变量 ===
		total: 0, //数据总行数
		currentpage: 1, //当前所在页
		pagesize: 10, //每页显示多少
	},
	mounted() {
		//自动加载数据
		this.getStudents();
	},
	methods: {
		//获取所有学生信息
		getStudents: function() {
			//避坑：记录当前 this 地址
			let that = this
			//使用 axios 实现 Ajax 请求
			axios
				.get(that.baseURL + "students/")
				.then(function(res) {
					// 请求成功后执行的回调函数
					if (res.data.code === 1) {
						//把数据给 students
						that.students = res.data.data;
						//获取返回记录的总行数
						that.total = res.data.data.length;
						//获取当前页的数据
						that.getPagetudents();
						//提示
						that.$message({
							message: '数据获取成功！',
							type: 'success'
						});
					} else {
						//失败的提示
						that.$message.error(res.data.msg);
					}
				})
				.catch(function (err) {
					// 请求失败后调用的函数
					console.log(err);
				});
		},
		getAllStudents(){
			//清空输入的 inputstr
			this.inputStr = '';
			//获取所有的数据
			this.getStudents();
		},
		//获取当前页的学生数据
		getPagetudents(){
			//清空 pageStudents 中的数据
			this.pageStudents = [];
			// 获取当前页的数据
			for (let i = (this.currentpage - 1) * this.pagesize; i < this.total; i++) {
				//遍历数据添加到 pageStudents 中
				this.pageStudents.push(this.students[i]);
				//判断是否达到一页的数据要求
				if (this.pageStudents.length === this.pagesize) break;
			}
		},
		//实现学生信息查询
		queryStudents(){
			// 使用 ajax 请求 POST 传递 InputStr
			let	that = this
			// 开始 ajax 请求
			axios
				.post(
					that.baseURL + "students/query/",
					{
						inputstr: that.inputStr,
					}
				)
				.then(function(res){
					if(res.data.code === 1){
						//把数据给 students
						that.students = res.data.data;
						//获取返回记录的总数
						that.total = res.data.data.length;
						//获取当前页的数据
						that.getPagetudents();
						//提示消息
						that.$message({
							message: '成功获取查询数据',
							type: 'success'
						});
					} else {
						// 失败的提示消息
						that.$message.error(res.data.msg);
					}
				})
				.catch(function(err){
					console.log(err);
					that.$message.error("获取查询结果出现异常！");
				})
		},
		//添加学生信息时打开表单
		addStudent(){
			this.dialogVisible = true;
		},
		// 查看学生信息时打开表单
		 viewStudent(row){
			this.dialogVisible = true;
			// console.log(row);
			//赋值
			this.studentForm = row;
		},
		//分页时修改每页的行数
		handleSizeChange(size){
			//修改当前每页数据行数
			this.pagesize = size;
			//数据重新分页
			this.getPagetudents();
			
		},
		//调整当前页码
		handleCurrentChange(pageNumber){
			//修改当前的页码
			 this.currentpage = pageNumber;
			//数据重新分页
			this.getPagetudents();
		}
	},
})
