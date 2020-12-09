const app = new Vue({
	el: '#app',
	data() {
		//校验学号是否存在
		const rulesSNo = (rule, value, callback) => {
			if (this.isEdit) {
				callback();
			}
			//使用 Axios 进行校验
			axios.post(
					this.baseURL + 'sno/check/', {
						sno: value,
					}
				)
				.then((res) => {
					//请求成功
					if (res.data.code === 1) {
						if (res.data.exists) {
							callback(new Error("该学号已经存在！"));
						} else {
							callback();
						}
					} else {
						//请求失败
						callback(new Error("校验学号后端出现异常！"))
					}
				})
				.catch((err) => {
					//如果请求失败在控制台打印
					console.log(err);
				})
		}
		return {
			baseURL: "http://10.37.129.2:8000/",
			students: [],
			pageStudents: [], //分页后当前页 学生数
			inputStr: '', //输入的查询条件
			// ===  分页相关变量 ===
			total: 0, //数据总行数
			currentpage: 1, //当前所在页
			pagesize: 10, //每页显示多少
			// === 弹出框表单 ===
			dialogVisible: false, //控制弹出框表单是否展示，默认展示
			dialogTitle: "", //弹出框的标题
			isView: false, //标识是否是查看
			isEdit: false, //标识是否是修改
			studentForm: { //弹出框表单对应绑定的数据
				sno: '',
				name: '',
				gender: '',
				birthday: '',
				mobile: '',
				email: '',
				address: '',
				image: ''
			},
			rules: {
				sno: [{
						required: true,
						message: '学号不能为空',
						trigger: 'blur'
					},
					{
						pattern: /^[9][5]\d{3}$/,
						message: '学号必须是95开头的五位数',
						trigger: 'blur'
					}, //校验学号存在否
					{
						validator: rulesSNo,
						trigger: 'blur'
					},
				],
				name: [{
						required: true,
						message: '姓名不能为空',
						trigger: 'blur'
					},
					{
						pattern: /^[\u4e00-\u9fa5]{2,5}$/,
						message: '姓名必须是2-5个汉字',
						trigger: 'blur'
					},
				],
				gender: [{
					required: true,
					message: '性别不能为空',
					trigger: 'change'
				}, ],
				birthday: [{
					required: true,
					message: '出生日期不能为空',
					trigger: 'change'
				}, ],
				mobile: [{
						required: true,
						message: '手机号码不能为空',
						triggler: 'blur'
					},
					{
						pattern: /^[1][35789]\d{9}$/,
						message: '手机号码必须要符合规范',
						trigger: 'blur'
					},
				],
				email: [{
						required: true,
						message: '邮箱地址不能为空',
						trigger: 'blur'
					},
					{
						pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
						message: '邮箱地址必须要符合规范',
						trigger: 'blur'
					},
				],
				address: [{
					required: true,
					message: '家庭住址不能为空',
					trigger: 'blur'
				}, ],
			},
		}
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
				.catch(function(err) {
					// 请求失败后调用的函数
					console.log(err);
				});
		},
		getAllStudents() {
			//清空输入的 inputstr
			this.inputStr = '';
			//获取所有的数据
			this.getStudents();
		},
		//获取当前页的学生数据
		getPagetudents() {
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
		queryStudents() {
			// 使用 ajax 请求 POST 传递 InputStr
			let that = this
			// 开始 ajax 请求
			axios
				.post(
					that.baseURL + "students/query/", {
						inputstr: that.inputStr,
					}
				)
				.then(function(res) {
					if (res.data.code === 1) {
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
				.catch(function(err) {
					console.log(err);
					that.$message.error("获取查询结果出现异常！");
				})
		},
		//添加学生信息时打开表单
		addStudent() {
			//修改标题
			this.dialogTitle = " 添加学生明细";
			//弹出表单
			this.dialogVisible = true;
		},
		// 查看学生信息时打开表单
		viewStudent(row) {
			//修改标题
			this.dialogTitle = "查看学生明细";
			//修改 isView 变量
			this.isView = true;
			//弹出表单
			this.dialogVisible = true;
			// console.log(row);
			//赋值 (浅拷贝有问题)
			// this.studentForm = row;
			//深拷贝方法：
			// this.studentForm.sno = row.sno;
			this.studentForm = JSON.parse(JSON.stringify(row))
		},
		// 修改学生明细
		updateStudent(row) {
			//修改标题
			this.dialogTitle = "修改学生明细";
			//修改 isEdit 变量
			this.isEdit = true;
			//弹出表单
			this.dialogVisible = true;
			//深拷贝方法：
			this.studentForm = JSON.parse(JSON.stringify(row))
		},
		//提交学生的表单(添加，修改)
		submitStudentForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					//校验成功后执行添加或者修改
					if (this.isEdit) {
						//修改
						this.submitUpdateStudent();
					} else {
						//添加
						this.submitAddStudent();
					}

				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		//添加到数据库
		submitAddStudent() {
			// 定义 that
			let that = this;
			//执行 Axios 请求
			axios
				.post(that.baseURL + 'student/add/', that.studentForm)
				.then(res => {
					//执行成功
					if (res.data.code == 1) {
						//获取所有学生信息
						that.students = res.data.data;
						//获取记录条数
						that.total = res.data.data.length;
						//获取分页信息
						that.getPagetudents();
						//提示
						that.$message({
							message: "查询数据加载成功！",
							type: "success"
						});
						//关闭窗体
						that.closeDialogForm("studentForm");
					} else {
						//失败的提示
						that.$message.error(res.data.msg);
					}

				})
				.catch(err => {
					// 执行失败
					console.log(err);
					that.$message.error("获取后端查询结果出现异常！");
				})
		},
		//修改更新到数据库
		submitUpdateStudent() {
			// 定义 that
			let that = this;
			//执行 Axios 请求
			axios
				.post(that.baseURL + 'student/update/', that.studentForm)
				.then(res => {
					//执行成功
					if (res.data.code == 1) {
						//获取所有学生信息
						that.students = res.data.data;
						//获取记录条数
						that.total = res.data.data.length;
						//获取分页信息
						that.getPagetudents();
						//提示
						that.$message({
							message: "数据修改成功！",
							type: "success"
						});
						//关闭窗体
						that.closeDialogForm("studentForm");
					} else {
						//失败的提示
						that.$message.error(res.data.msg);
					}

				})
				.catch(err => {
					// 执行失败
					console.log(err);
					that.$message.error("修改时获取后端查询结果出现异常！");
				})
		},
		// 删除一条学生信息
		deleteStudent(row) {
			//等待确认
			this.$confirm('是否确认删除学生信息【学号：' + row.sno + '\t 姓名：' + row.name + '】信息？',
				'提示', {
					confirmButtonText: '确定删除',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
				// 确认删除响应事件
				let that = this
				//调用后端接口
				axios.post(that.baseURL + 'student/delete/', {
						sno: row.sno
					})
					.then(res => {
						if (res.data.code === 1) {
							//获取所有学生信息
							that.students = res.data.data;
							//获取记录数
							that.total = res.data.data.length;
							//分页
							that.getPagetudents();
							//提示
							that.$message({
								message: '数据添加成功！',
								type: 'success'
							});
						} else {
							that.$message.error(res.data.msg);
						}

					})
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消删除'
				});
			});
		},
		//关闭弹出框表单
		closeDialogForm(formName) {
			// 重置表单的校验
			this.$refs[formName].resetFields();
			//清空
			this.studentForm.sno = '';
			this.studentForm.name = '';
			this.studentForm.gender = '';
			this.studentForm.birthday = '';
			this.studentForm.mobile = '';
			this.studentForm.email = '';
			this.studentForm.address = '';
			//关闭
			this.dialogVisible = false;
			// 初始化isView和isEdit的值
			this.isEdit = false;
			this.isView = false;
		},
		//分页时修改每页的行数
		handleSizeChange(size) {
			//修改当前每页数据行数
			this.pagesize = size;
			//数据重新分页
			this.getPagetudents();

		},
		//调整当前页码
		handleCurrentChange(pageNumber) {
			//修改当前的页码
			this.currentpage = pageNumber;
			//数据重新分页
			this.getPagetudents();
		}
	},
})
