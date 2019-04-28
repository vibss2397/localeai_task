from app import db

class Driver(db.Model):
    __tablename__ = 'driver'

    driver_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String())
    email = db.Column(db.String())
    vehicle_id = db.Column(db.Integer)
    city_id = db.Column(db.Integer)
    total_trips = db.Column(db.Integer)
    cancelled_trips = db.Column(db.Integer)
    rating = db.Column(db.Float())
    distance_travelled = db.Column(db.Integer)

    def __init__(self, user_id, name, email, vehicle_id, city_id, total_trips, cancelled_trips, rating, distance_travelled):
        self.user_id = user_id
        self.name = name
        self.email = email
        self.vehicle_id = vehicle_id
        self.city_id = city_id
        self.total_trips = total_trips
        self.cancelled_trips = cancelled_trips
        self.rating = total_trips/cancelled_trips
        self.distance_travelled = distance_travelled

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
        return Driver.query.all()

    @staticmethod
    def get_one_user(id):
        return Driver.query.get(id)
    
    def serialize(self):
        return {
        'user_id': self.user_id
        'name': self.name
        'email': self.email
        'vehicle_id': self.vehicle_id
        'city_id': self.city_id
        'total_trips': self.total_trips
        'cancelled_trips': self.cancelled_trips
        'rating': self.rating
        'distance_travelled': self.distance_travelled
        }