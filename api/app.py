from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
import os
from config import Config
app = Flask(__name__)

app.config.from_object(Config)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

from models/Driver import Driver
from models/Trip import Trip
from models/User import User
from models/Vehicle import Vehicle

@app.route("/")
def hello():
    return "Test Route!"

## Repeat this for all the models
@app.route('/user/add', methods=['POST'])
def create():
  """
  Create User Function
  """
 req_data = request.get_json()
  # check if user already exist in the db
  user_in_db = User.get_user_by_userId(req_data['user_id'])
  if user_in_db:
    message = {'error': 'User already exist, please supply another email address'}
    return custom_response(message, 400)

      try:
        user=User(  
            user_id=req_data['user_id']    
            name=req_data['name']
            email=req_data['email']
            area_id=req_data['area_id']
            city_id=req_data['city_id']
            cancelled_trips=req_data['cancelled_trips']
        )
        user.save()
        return custom_response(user.serialize(), 200)

  if error:
    return custom_response(error, 400)
  
@app.route("/user/getall")
def get_all():
    try:
        users=User.get_all_users()
        return  jsonify([e.serialize() for e in users])
    except Exception as e:
	    return(str(e))

@app.route("/user/get/<id_>")
def get_by_id(id_):
    try:
        user=Use.get_one_user(id_)
        return jsonify(book.serialize())
    except Exception as e:
	    return(str(e))

if __name__ == '__main__':
    app.run()