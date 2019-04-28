from app import db

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String())
    email = db.Column(db.String())
    area_id = db.Column(db.Integer)
    city_id = db.Column(db.Integer)
    cancelled_trips = db.Column(db.Integer)

    def __init__(self, user_id, name, email, area_id, city_id, cancelled_trips):
        self.user_id = user_id
        self.name = name
        self.email = email
        self.area_id = area_id
        self.city_id = city_id
        self.cancelled_trips = cancelled_trips
    def __repr__(self):
        return '<id {}>'.format(self.id)
    
    def save(self):
        db.session.add(self)
        db.session.commit()
    
    def delete(self):
        db.session.delete(self)
        db.session.commit()
    
    @staticmethod
    def get_all_users():
        return User.query.all()

    @staticmethod
    def get_one_user(id):
        return User.query.get(id)
    
    @staticmethod
    def get_user_by_userId(value):
        return User.query.filter_by(user_id=value).first()
    
    def serialize(self):
        return {
        'user_id': self.user_id
        'name': self.name
        'email': self.email
        'area_id': self.area_id
        'city_id': self.city_id
        'cancelled_trips': self.cancelled_trips
        }