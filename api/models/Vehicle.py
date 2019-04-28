from app import db

class Vehicle(db.Model):
    __tablename__ = 'vehicles'

    id = db.Column(db.Integer, primary_key=True)
    vehicle_id = db.Column(db.Integer, primary_key=True)
    vehicle_name = db.Column(db.String())
    tank_capacity = db.Column(db.Integer)
    capacity = db.Column(db.Integer)
    distance_travelled = db.Column(db.Integer)
    number_available = db.Column(db.Integer)

    def __init__(self, Vehicle_id, vehicle_name, tank_capacity, capacity, distance_travelled, number_available):
        self.vehicle_id = Vehicle_id
        self.vehicle_name = vehicle_name
        self.tank_capacity = tank_capacity
        self.capacity = capacity
        self.distance_travelled = distance_travelled
        self.number_available = number_available
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
        return Vehicle.query.all()

    @staticmethod
    def get_one_user(id):
        return Vehicle.query.get(id)
    
    def serialize(self):
        return {
        'vehicle_id': self.vehicle_id
        'vehicle_name': self.vehicle_name
        'tank_capacity': self.tank_capacity
        'capacity': self.capacity
        'distance_travelled': self.distance_travelled
        'number_available': self.number_available
        }