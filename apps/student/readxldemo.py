#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @File   : readxldemo.py
# @Author : Hython
# @Date   : 公元 2021/01/11 13:32
import openpyxl


def read_excel_dict(path:str):
    """读取 Excel 数据存储为字典 --- [{},{},{}]"""
    # 实例化一个 wb
    workbook = openpyxl.load_workbook(path)
    # 实例化 sheet
    sheet = workbook['student']
    # 定义一个变量存储最终数据 -- []
    students = []
    # 准备 key
    keys = ['sno', 'name', 'gender', 'birthday', 'mobile', 'email', 'address']
    # 遍历
    for row in sheet.rows:
        # 定义临时用的字典
        temp_dict = {}
        # 组合值和 key
        for index, cell in enumerate(row):
            temp_dict[keys[index]] = cell.value
        # 添加到 list 中
        students.append(temp_dict)
    return students


if __name__ == '__main__':
    path = '/Users/charlielee/PycharmProjects/djangoProject/StudentV4BE/media/student_demo.xlsx'
    students = read_excel_dict(path)
    print(students)
