from rest_framework.authtoken.models import Token
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser, 
    BaseUserManager, 
    PermissionsMixin
)

from random import randint
from .service import send_activation_email

class InitiativeManager(BaseUserManager):
    '''Мэнэджер кастомного пользователя'''

    def create_user(self, email, phone_number, is_steakholder,
        first_name, last_name, name, company, password=None):
        user = self.model(
            email=self.normalize_email(email),
            phone_number=phone_number,
            first_name=first_name,
            last_name=last_name,
            name=name,
            company=company,
            is_steakholder=is_steakholder
        )
        user.set_password(password)
 
        user.save(using=self._db)

        return user

    def create_superuser(self, email, phone_number, is_steakholder,
        first_name, last_name, name, company, password=None):
        user = self.model(
            email=self.normalize_email(email),
            phone_number=phone_number,
            first_name=first_name,
            last_name=last_name,
            name=name,
            company=company,
            is_steakholder=is_steakholder
        )
        user.set_password(password)

        user.is_superuser = True
        user.is_active = True
        user.is_staff = True

        user.save(using=self._db)
        return user

class Category(models.Model):
    '''Категория'''
    name = models.CharField('Имя', max_length = 100)
    description = models.TextField('Описание')        

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name_plural = 'Категория'
        verbose_name_plural = 'Категории'

class Requirenment(models.Model):
    '''Необходимость'''
    name = models.CharField(max_length=20)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Необходимость'
        verbose_name_plural = 'Необходимости'

class Initiative(AbstractBaseUser, PermissionsMixin):
    '''Кастомная модель пользователя'''
    email = models.EmailField('Почта', max_length=60, unique=True)
    phone_number = models.CharField('Номер телефона', max_length=11)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    name = models.CharField('Название', max_length=50, null=True)
    company = models.CharField('Компания', max_length=50, null=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)
    is_steakholder = models.BooleanField(default=False)
    first_login = models.BooleanField(default=True)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = [
        'phone_number', 'first_name', 'last_name',
        'name', 'company', 'is_steakholder'
    ]

    objects = InitiativeManager()

    def __str__(self):
        return self.name
        
    class Meta:
        verbose_name = 'Инициатива'
        verbose_name_plural = 'Инициативы'
        ordering = ['-name']

class Settings(models.Model):
    '''Настройки пользователя'''
    is_docs_open = models.BooleanField(default=False)
    is_info_open = models.BooleanField(default=True)
    initiative = models.OneToOneField(
        Initiative, verbose_name='Настройки конфеденциальности',
        on_delete=models.CASCADE, related_name='settings'
    )

    class Meta:
        verbose_name = 'Настройки пользователя'
        verbose_name_plural = 'Настройки пользователя'

class Review(models.Model):
    '''Отзыв об инициативе'''
    initiative = models.ForeignKey(Initiative, verbose_name='Автор', on_delete=models.CASCADE)
    estimated = models.ForeignKey(
        Initiative, 
        verbose_name='Оцениваемый', 
        on_delete=models.CASCADE, 
        related_name='reviews'
    )
    content = models.TextField(max_length=2000)
    timestamp = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = 'Отзыв'
        verbose_name_plural = 'Отзывы'

class InitiativeInfo(models.Model):
    '''Информация об инициативе'''
    initiative = models.OneToOneField(
        Initiative, 
        verbose_name='Инициатива', 
        on_delete=models.CASCADE,
        related_name='info'
    )
    title = models.TextField('Заголовок', max_length=200, blank=True, default='')
    description = models.TextField('Описание', max_length=2000, blank=True, default='')
    categories = models.ManyToManyField(Category, verbose_name='Категории')
    requirenments = models.ManyToManyField(Requirenment, verbose_name='Потребности')

    class Meta:
        verbose_name = 'Информация об инициативе'
        verbose_name_plural = 'Информация об инициативах'

class Construct(models.Model):
    '''Конструктор инициативы'''
    initiative = models.OneToOneField(
        Initiative, verbose_name='Инициатива', 
        on_delete=models.CASCADE, related_name='construct'
    )
    concept = models.TextField(max_length=3000, default='')
    problem_desc = models.TextField(max_length=3000, default='')
    actuality = models.TextField(max_length=1500, default='')
    competitors = models.TextField(max_length=1500, default='')
    market_analysis = models.TextField(max_length=3000, default='')
    budget = models.CharField(max_length=100, default='')
    business_model = models.TextField(max_length=3000, default='')
    workers = models.TextField(max_length=3000, default='')

    class Meta:
        verbose_name = 'Конструктор'
        verbose_name_plural = 'Конструкторы'

@receiver(post_save, sender=Initiative)
def send_conf_mail(sender, instance=None, created=False, **kwargs):
    '''Отправляет письмо с подтверждением'''
    if not instance.is_superuser:
        if created:
            token = Token.objects.create(user=instance)
            send_activation_email.delay(instance.email, token.key)

@receiver(post_save, sender=Initiative)
def create_instances(sender, instance=None, created=False, **kwargs):
    '''Создает необходимые сущности'''
    if created:
        InitiativeInfo.objects.create(initiative=instance, id=instance.id)
        Settings.objects.create(initiative=instance, id=instance.id)
        Construct.objects.create(initiative=instance, id=instance.id)
