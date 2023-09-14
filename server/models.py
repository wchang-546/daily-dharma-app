from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property

from config import db, bcrypt

# Models go here!

class User(db.Model, SerializerMixin): 
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String) 
    
    calender_entries = db.relationship('CalendarEntry', cascade='all, delete-orphan', backref='user') 
    journal_entries = db.relationship('JournalEntry', cascade='all, delete-orphan', backref='user')
    serialize_rules = ('-calender_entries.user', '-journal_entries.user',)
    
    @hybrid_property
    def password_hash(self):
        raise AttributeError('Password hashes cannot be viewed.')
    
    @password_hash.setter
    def password_hash(self, password): 
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash
    
    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))
    
    def __repr__(self):
        return f'<User {self.username}>'

class CalendarEntry(db.Model, SerializerMixin):
    __tablename__ = 'calendar_entries'

    id = db.Column(db.Integer, primary_key=True)
    mood = db.Column(db.String) 

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    created_date = db.Column(db.DateTime, server_default=db.func.now())
    updated_date = db.Column(db.DateTime, onupdate=db.func.now())

class JournalEntry(db.Model, SerializerMixin):
    __tablename__ = 'journal_entries'

    id = db.Column(db.Integer, primary_key=True)
    journal_entry = db.Column(db.String)
    #Make sure prompt gets included in the POST request 
    prompt = db.Column(db.String)
    
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    created_date = db.Column(db.DateTime, server_default=db.func.now())
    updated_date = db.Column(db.DateTime, onupdate=db.func.now())

class CareerJournalPrompt(db.Model, SerializerMixin):
    __tablename__ = 'career_prompts'

    id = db.Column(db.Integer, primary_key=True)
    prompt = db.Column(db.String) 

class SelfGrowthJournalPrompt(db.Model, SerializerMixin): 
    __tablename__ = 'self_growth_prompts'

    id = db.Column(db.Integer, primary_key=True)
    prompt = db.Column(db.String)

class RelationshipJournalPrompt(db.Model, SerializerMixin):
    __tablename__ = 'relationship_prompts'

    id = db.Column(db.Integer, primary_key=True)
    prompt = db.Column(db.String) 

