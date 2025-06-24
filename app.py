from flask import Flask, render_template, request, redirect, url_for, flash
import sqlite3
import secrets

app = Flask(__name__)
app.secret_key = secrets.token_hex(32)  # Для flash-сообщений

# Инициализация базы данных
def init_db():
    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            login TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/register', methods=['POST'])
def register():
    login = request.form.get('login')
    password = request.form.get('password')

    if not login or not password:
        flash('Логин и пароль обязательны!', 'error')
        return redirect(url_for('index'))

    try:
        conn = sqlite3.connect('users.db')
        cursor = conn.cursor()

        # Проверяем, есть ли уже такой логин
        cursor.execute('SELECT id FROM users WHERE login = ?', (login,))
        if cursor.fetchone():
            flash('Этот логин уже занят!', 'error')
            return redirect(url_for('index'))

        # Вставляем данные в БД (пароль без хеширования)
        cursor.execute('INSERT INTO users (login, password) VALUES (?, ?)', (login, password))
        conn.commit()
        flash('Регистрация успешна!', 'success')

    except sqlite3.Error as e:
        flash(f'Ошибка базы данных: {e}', 'error')
    finally:
        conn.close()

    return redirect(url_for('index'))

if __name__ == '__main__':
    init_db()  # Создаём таблицу при запуске
    app.run(debug=True)