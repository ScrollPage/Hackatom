"""
Django settings for backend project.

Generated by 'django-admin startproject' using Django 3.1.4.

For more information on this file, see
https://docs.djangoproject.com/en/3.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.1/ref/settings/
"""

from pathlib import Path
import os
from datetime import timedelta
import pusher

from . import local

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '^!397w67noykeevgl1uh+0)v&^nt-lcjoc!hbhf^eyzz_0h-+*'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'cacheops',
    'channels',
    'corsheaders',
    'djoser',
    'drf_yasg',
    'rest_auth',
    'rest_framework',
    'rest_framework.authtoken',
    'silk',
    'storages',

    'chat',
    'command',
    'diagram',
    'doc',
    'feedback',
    'initiative',
    'notifications',
    'post',
]

MIDDLEWARE = [
    'silk.middleware.SilkyMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# Redis related settings
REDIS_HOST = os.environ.get('REDIS_HOST', local.REDIS_HOST)
REDIS_PORT = os.environ.get('REDIS_PORT', local.REDIS_PORT)

# WSGI
WSGI_APPLICATION = 'backend.wsgi.application'

# Django Channels
ASGI_APPLICATION = 'backend.routing.application'

CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'channels_redis.core.RedisChannelLayer',
        'CONFIG': {
            'hosts': [(REDIS_HOST, REDIS_PORT)],
        },
    },
}


# Database
# https://docs.djangoproject.com/en/3.1/ref/settings/#databases

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.sqlite3',
#         'NAME': BASE_DIR / 'db.sqlite3',
#     }
# }

DATABASES = {
    'default': {
        'ENGINE': os.environ.get('SQL_ENGINE', local.SQL_ENGINE),
        'NAME': os.environ.get('SQL_DATABASE', local.SQL_DATABASE),
        'USER': os.environ.get('SQL_USER', local.SQL_USER),
        'PASSWORD': os.environ.get('SQL_PASSWORD', local.SQL_PASSWORD),
        'HOST': os.environ.get('SQL_HOST', local.SQL_HOST),
        'PORT': os.environ.get('SQL_PORT', local.SQL_PORT),
    }
}

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
        'rest_framework.authentication.TokenAuthentication',
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.BasicAuthentication',
    ),
    # 'DEFAULT_RENDERER_CLASSES': (
    #     'rest_framework.renderers.BrowsableAPIRenderer',
    #     'rest_framework.renderers.JSONRenderer',
    #     'rest_framework.renderers.TemplateHTMLRenderer',
    # ),
}


# Password validation
# https://docs.djangoproject.com/en/3.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.1/howto/static-files/

STATIC_URL = '/staticfiles/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

# User model
AUTH_USER_MODEL = 'initiative.Initiative'

# Cors
CORS_ORIGIN_WHITELIST = (
    u'http://127.0.0.1:3000',
    u'http://localhost:3000'
)

#JWT Authentication
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(days=1),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    'ROTATE_REFRESH_TOKENS': False,
    'BLACKLIST_AFTER_ROTATION': True,

    'ALGORITHM': 'HS256',
    'SIGNING_KEY': SECRET_KEY,
    'VERIFYING_KEY': None,
    'AUDIENCE': None,
    'ISSUER': None,

    'AUTH_HEADER_TYPES': ('Token',),
    'USER_ID_FIELD': 'id',
    'USER_ID_CLAIM': 'user_id',

    'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),
    'TOKEN_TYPE_CLAIM': 'token_type',

    'JTI_CLAIM': 'jti',

    'SLIDING_TOKEN_REFRESH_EXP_CLAIM': 'refresh_exp',
    'SLIDING_TOKEN_LIFETIME': timedelta(days=1),
    'SLIDING_TOKEN_REFRESH_LIFETIME': timedelta(days=1),
}

#Domains
DJANGO_DOMAIN = 'http://127.0.0.1:8000'
REACT_DOMAIN = 'http://127.0.0.1:3000'

#Djoser
DJOSER = {
    'PASSWORD_RESET_CONFIRM_URL': '#/password/reset/confirm/{uid}/{token}',
    'USERNAME_RESET_CONFIRM_URL': '#/username/reset/confirm/{uid}/{token}',
    'ACTIVATION_URL': '#',
    'SEND_ACTIVATION_EMAIL': False,
    'SERIALIZERS': {},
}

# Email
EMAIL_USE_TLS = True
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_HOST_USER = os.environ.get('EMAIL_HOST_USER', local.EMAIL_HOST_USER)
EMAIL_HOST_PASSWORD = os.environ.get('EMAIL_HOST_PASSWORD', local.EMAIL_HOST_PASSWORD)
EMAIL_PORT = 587

# AWS
AWS_ACCESS_KEY_ID = os.environ.get(
    'AWS_ACCESS_KEY_ID', 
    local.AWS_ACCESS_KEY_ID
)
AWS_SECRET_ACCESS_KEY = os.environ.get(
    'AWS_SECRET_ACCESS_KEY', 
    local.AWS_SECRET_ACCESS_KEY
)
AWS_STORAGE_BUCKET_NAME = os.environ.get(
    'AWS_STORAGE_BUCKET_NAME', 
    local.AWS_STORAGE_BUCKET_NAME
)

AWS_S3_FILE_OVERWRITE = False

DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
AWS_HEADERS = {
    'CacheControl': 'max-age=86400',
}
AWS_S3_REGION_NAME = 'eu-north-1'
# AWS_S3_SIGNATURE_VERSION = 's3v4'
# AWS_S3_HOST = 'eu-north-1'
AWS_S3_CUSTOM_DOMAIN = f'{AWS_STORAGE_BUCKET_NAME}.s3.{AWS_S3_REGION_NAME}.amazonaws.com'
# AWS_DEFAULT_ACL = None
# AWS_AUTO_CREATE_BUCKET = True
# S3_USE_SIGV4 = True

# Command roles
ROLES = [
    'Стейкхолдер', 'Администратор', 
    'Помощник', 'Куратор', 'Заказчик'
]

# Actions
READ_ACTIONS = ['list', 'retrieve', 'me']

# Pusher
pusher_client = pusher.Pusher(
    app_id=os.environ.get('PUSHER_APP_ID', local.PUSHER_APP_ID),
    key=os.environ.get('PUSHER_KEY', local.PUSHER_KEY),
    secret=os.environ.get('PUSHER_SECRET', local.PUSHER_SECRET),
    cluster=os.environ.get('PUSHER_CLUSTER', local.PUSHER_CLUSTER),
    ssl=bool(os.environ.get('PUSHER_SSL', local.PUSHER_SSL))
)

# Caheops
CACHEOPS_REDIS = {
    'host': REDIS_HOST,
    'port': REDIS_PORT,
    'db': 2,
}

CACHEOPS_DEFAULTS = {
    'timeout': 60*30
}

CACHEOPS = {
    'post.Post': {},
    'initiative.Initiative': {},
    'command.Command': {},
    'doc.Doc': {},
}

# Celery
CELERY_REDIS_DB = '3'
CELERY_BROKER_URL = f'redis://{REDIS_HOST}:{REDIS_PORT}/{CELERY_REDIS_DB}'
CELERY_BROKER_TRANSPORT_OPTIONS = {'visiblity_timeout': 3600}
CELERY_RESULT_BACKEND = f'redis://{REDIS_HOST}:{REDIS_PORT}/{CELERY_REDIS_DB}'
CELERY_ACCEPT_CONTENT = ['json', 'applicaion/json', 'applicaion/text']
CELERY_TASK_SERIALIZER = 'json'
CELERY_RESULT_SERILIZER = 'json'