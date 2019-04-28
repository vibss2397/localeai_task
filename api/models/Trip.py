from app import db

class Trip(db.Model):
    __tablename__ = 'trips'

    trip_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)
    driver_id = db.Column(db.Integer)
    medium_of_booking = db.Column(db.Integer)
    travel_type_id = db.Column(db.Integer)
    from_lat = db.Column(db.Float())
    from_long = db.Column(db.Float())
    to_lat = db.Column(db.Float())
    to_long = db.Column(db.Float)
    booking_created = db.Column(db.DateTime())
    from_date = db.Column(db.DateTime())
    is_cancelled = db.Column(db.Boolean())

    def __init__(self, trip_id, user_id, driver_id, medium_of_booking, travel_type_id, 
                from_lat, from_long, to_lat, to_long, booking_created, from_date, is_cancelled):
        self.trip_id = trip_id
        self.user_id = user_id
        self.driver_id = driver_id
        self.medium_of_booking = medium_of_booking
        self.travel_type_id = travel_type_id
        self.from_lat = from_lat
        self.from_long = from_long
        self.to_lat = to_lat
        self.to_long = to_long
        self.booking_created = booking_created
        self.from_date = from_date
        self.is_cancelled = is_cancelled

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
        return Trip.query.all()

    @staticmethod
    def get_one_user(id):
        return Trip.query.get(id)
    
    def serialize(self):
        return {
        'trip_id':self.trip_id
        'user_id':self.user_id
        'driver_id':self.driver_id
        'medium_of_booking':self.medium_of_booking
        'travel_type_id':self.travel_type_id
        'from_lat':self.from_lat
        'from_long':self.from_long
        'to_lat':self.to_lat
        'to_long':self.to_long
        'booking_created':self.booking_created
        'from_date':self.from_date
        'is_cancelled':self.is_cancelled
        }