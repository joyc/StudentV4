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
