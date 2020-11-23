from django.db import models

# Create your models here.
# Student: 学号，姓名，性别，出生日期，手机号码，邮箱地址，家庭住址，照片


class Student(models.Model):
    """student models"""
    gender_choices = (('男', '男'), ('女', '女'))
    sno = models.IntegerField(db_column="SNo", primary_key=True)  # 学号，不允许为空，主键
    name = models.CharField(db_column="SName", max_length=100, null=False)  # 姓名，最长100个字符，不允许为空
    gender = models.CharField(db_column="Gender", max_length=100, choices=gender_choices)  # 性别，选项选择
    birthday = models.DateField(db_column="Birthday", null=False)  # 出生日期，不允许为空
    mobile = models.CharField(db_column="Mobile", max_length=100)  # 手机号码，
    email = models.CharField(db_column="Email", max_length=100)  # 邮箱地址
    address = models.CharField(db_column="Address", max_length=200)  # 家庭住址
    image = models.CharField(db_column="Image", max_length=200, null=True)  # 照片ey=True, null=False)

    # 在默认情况下，生成的表名：App_class, 如果要自定义 ，需要使用Class Meta来自定义
    class Meta:
        managed = True
        db_table = "Student"

    # __str__方法
    def __str__(self):
        return f"学号:{self.sno}\t姓名:{self.name}\t性别:{self.gender}"
