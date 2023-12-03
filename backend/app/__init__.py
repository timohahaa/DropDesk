from flask import Flask
from flask_cors import CORS

# создание экземпляра приложения
app = Flask(__name__)
CORS(app, origins=["*"])

# инициализирует расширения

# import views
from . import views
