import json
from django.db.models import Q
from django.shortcuts import render
from django.http import JsonResponse
from student.models import Student


def get_students(request):
    """获取所有学生信息"""
    # 使用 ORM 获取所有学生信息
    try:
        obj_students = Student.objects.all().values()
        # 把结果转为 list
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

