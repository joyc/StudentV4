import json
from django.db.models import Q
from django.shortcuts import render
from django.http import JsonResponse
from student.models import Student


def get_students(request):
    """获取所有学生信息"""
    # 使用 ORM 获取所有学生信息
    try:
        # 使用 ORM 获取所有学生信息并把对象转为字典格式
        obj_students = Student.objects.all().values()
        # 把外层结果转为 list
        students = list(obj_students)
        return JsonResponse({'code': 1, 'data': students})
    except Exception as e:
        return JsonResponse({'code': 0, 'msg': "获取学生信息出现异常，错误信息：" + str(e)})


def query_students(request):
    """查询学生信息"""
    # 接收传递过来的查询条件：axios 默认是 json 格式 字典类型('inputstr') data['inputstr']
    data = json.loads(request.body.decode('utf-8'))
    try:
        obj_students = Student.objects.filter(Q(sno__icontains=data['inputstr']) |
                                              Q(name__icontains=data['inputstr']) |
                                              Q(gender__icontains=data['inputstr']) |
                                              Q(mobile__icontains=data['inputstr']) |
                                              Q(email__icontains=data['inputstr']) |
                                              Q(address__icontains=data['inputstr'])).values()
        # 把结果转为 list
        students = list(obj_students)
        return JsonResponse({'code': 1, 'data': students})
    except Exception as e:
        return JsonResponse({'code': 0, 'msg': "查询学生信息出现异常，错误信息：" + str(e)})


def is_exists_sno(request):
    """判断学号是否存在"""
    # 接受传来的学号
    data = json.loads(request.body.decode('utf-8'))
    # 进行校验
    try:
        obj_students = Student.objects.filter(sno=data['sno'])
        if obj_students.count() == 0:
            return JsonResponse({'code': 1, 'exists': False})
        else:
            return JsonResponse({'code': 1, 'exists': True})
    except Exception as e:
        return JsonResponse({'code': 0, 'msg': '校验学号失败，错误信息为：' + str(e)})


def add_student(request):
    """添加学生到数据库"""
    # 接受全段传过来的值
    data = json.loads(request.body.decode('utf-8'))
    try:
        # 添加到数据库
        obj_student = Student(sno=data['sno'], name=data['name'], gender=data['gender'],
                              birthday=data['birthday'], mobile=data['mobile'],
                              email=data['email'], address=data['address'])
        # 执行添加操作
        obj_student.save()
        # 使用 ORM 获取所有学生信息并把对象转为字典格式
        obj_students = Student.objects.all().values()
        # 把外层结果转为 list
        students = list(obj_students)
        return JsonResponse({'code': 1, 'data': students})
    except Exception as e:
        return JsonResponse({'code': 0, 'msg': "添加到数据库出现异常，具体原因：" + str(e)})


def update_student(request):
    """修改学生到数据库"""
    # 接受全段传过来的值
    data = json.loads(request.body.decode('utf-8'))
    try:
        # 查找要更新的学生信息
        obj_student = Student.objects.get(sno=data['sno'])
        # 依次修改
        obj_student.name = data['name']
        obj_student.gender = data['gender']
        obj_student.birthday = data['birthday']
        obj_student.mobile = data['mobile']
        obj_student.email = data['email']
        obj_student.address = data['address']
        # 保存
        obj_student.save()
        # 使用 ORM 获取所有学生信息并把对象转为字典格式
        obj_students = Student.objects.all().values()
        # 把外层结果转为 list
        students = list(obj_students)
        return JsonResponse({'code': 1, 'data': students})
    except Exception as e:
        return JsonResponse({'code': 0, 'msg': "修改保存到数据库出现异常，具体原因：" + str(e)})


def delete_student(request):
    """删除学生到数据库"""
    # 接收全段传过来的值
    data = json.loads(request.body.decode('utf-8'))
    try:
        # 查找要更新的学生信息
        obj_student = Student.objects.get(sno=data['sno'])
        # 删除
        obj_student.delete()
        # 使用 ORM 获取所有学生信息并把对象转为字典格式
        obj_students = Student.objects.all().values()
        # 把外层结果转为 list
        students = list(obj_students)
        return JsonResponse({'code': 1, 'data': students})
    except Exception as e:
        return JsonResponse({'code': 0, 'msg': "删除学生信息时出现异常，具体原因：" + str(e)})


def delete_students(request):
    """批量删除学生到数据库"""
    # 接收全段传过来的值
    data = json.loads(request.body.decode('utf-8'))
    try:
        # 遍历传递来的集合
        for one_student in data['student']:
            # 查询当前记录
            obj_student = Student.objects.get(sno=one_student['sno'])
            # 执行删除
            obj_student.delete()
        # 使用 ORM 获取所有学生信息并把对象转为字典格式
        obj_students = Student.objects.all().values()
        # 把外层结果转为 list
        students = list(obj_students)
        return JsonResponse({'code': 1, 'data': students})
    except Exception as e:
        return JsonResponse({'code': 0, 'msg': "批量删除学生信息时出现异常，具体原因：" + str(e)})