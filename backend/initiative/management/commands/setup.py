from django.core.management.base import BaseCommand

from feedback.models import Star
from initiative.models import Category, Requirenment

class Command(BaseCommand):
    help = 'Setups a whole app working capacity'

    def handle(self, *args, **options):

        for i in range(5-Star.objects.count()):
            Star.objects.create(value=i+1)
        
        category_list = [
            'Конструирование реактора', 'Компоновка реактора',
            'Корпуса', 'ТВЭЛ', 'ТВС', 'ПЭЛ', 'Тепловые схемы',
            'Системы управления', 'Модернизация оборудования', 
            'Системы управления', 'Моделирование процессов',
            'Документооборот', 'Физика', 'Теплогидравлика'
            'Прочность', 'Анализ проектных аварий'
            'Анализ запроектных аварий', 'Физика активной зоны',
            'Научное обоснование'  
        ]

        requirement_list = [
            'Оборудование', 'Изготовитель', 'Схемотехник',
            'Программист', 'Проектировщик', 'Аналитика',
            'Бизнес-аналитик', 'Экономический-аналитик',
            'Маркетинговый-аналитик'
        ]

        for i in range(len(category_list)-Category.objects.count()):
            Category.objects.create(name=category_list[i])

        for i in range(len(requirement_list)-Requirenment.objects.count()):
            Requirenment.objects.create(name=requirement_list[i])