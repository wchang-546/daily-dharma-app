#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session, make_response 
from flask_restful import Resource

# Local imports
from config import app, db, api

# Add your model imports
from models import User, CalendarEntry, JournalEntry, JournalPrompt

class Register(Resource): 
    def post(self): 
        username = request.get_json()['username']
        password = request.get_json()['password']
        existing_user = User.query.filter(User.username == username).first()
        if existing_user: 
            return {"Error": "User already exists."}, 404
        new_user = User(
            username=username,
            password_hash=password 
        )
        db.session.add(new_user)
        db.session.commit()
        session['user_id'] = new_user.id 
        return new_user.to_dict(), 200 
api.add_resource(Register, '/register')

class Login(Resource): 
    def post(self): 
        username = request.get_json()['username']
        password = request.get_json()['password']

        user = User.query.filter(User.username == username).first()
        if user is None:
            return make_response({"Error": "User not found."}, 401)
        if user.authenticate(password): 
            session['user_id'] = user.id
            return user.to_dict(), 200
        else: 
            return {"Error": "Invalid password"}, 401
api.add_resource(Login, '/login')

class Logout(Resource):
    def delete(self): 
        session['user_id'] = None
        return {}, 204
api.add_resource(Logout, '/logout')

class CheckSession(Resource):
    def get(self): 
        if session.get('user_id'):
            user = User.query.filter(User.id == session.get('user_id')).first()
            return user.to_dict(), 200
        return {}, 204
api.add_resource(CheckSession, '/check_session')

class Users(Resource): 
    def get(self): 
        if session.get('user_id'):
             user = User.query.filter(User.id == session['user_id']).one_or_none()
             return make_response(user.to_dict(), 200)
        return {'error': '401 Unauthorized'}, 401
api.add_resource(Users, '/users')

class UsersById(Resource): 
    def patch(self, id): 
        data = request.get_json()
        username = data['username']
        old_password = data['old_password']
        new_password = data['new_password']
        user = User.query.filter(User.id == id).first()
        #If Flask session wasn't broken, I would use "if session.get('user_id)"
        if user: 
            if user and user.authenticate(old_password): 
                user.username = username 
                user.password_hash = new_password
                db.session.commit() 
                return user.to_dict(), 202
        return {'error': '401 Unauthorized'}, 401
api.add_resource(UsersById, '/users/<int:id>' )

class JournalPrompts(Resource):
    def get(self): 
        prompts = [prompt.to_dict(rules=('-journal_entries',)) for prompt in JournalPrompt.query.all()]
        return prompts, 200
api.add_resource(JournalPrompts, '/prompts')

class CalendarEntries(Resource):
    def get(self): 
        # if session.get('user_id'): 
        entries = [entry.to_dict(rules=('-user',)) for entry in CalendarEntry.query.all()]
        return entries, 200
    
    def post(self): 
        # if session.get('user_id'): 
        data = request.get_json() 
        #Check this session['user_id']
        #Hardcode user_id for now
        new_entry = CalendarEntry(mood=data['mood'], user_id=1)
        db.session.add(new_entry)
        db.session.commit()
        return new_entry.to_dict(), 200
        # return make_response({"Error": "Sign in to submit a calendar entry."}, 404)
api.add_resource(CalendarEntries, '/calendar_entries')

class CalendarEntriesById(Resource): 
    def get(self, id): 
        if session.get('user_id'): 
            entry = CalendarEntry.query.filter(CalendarEntry.id == id).one_or_none()
            if entry is None:
                return make_response({"Error": "Calendary entry not found"}, 404)
        #ERROR: figure out serialization rule here
            return make_response(entry.to_dict(rules=('-user',)), 200)
        return {'error': '401 Unauthorized'}, 401
    
    def patch(self, id): 
        if session.get('user_id'):
            entry = CalendarEntry.query.filter(CalendarEntry.id == id).one_or_none()
            if entry: 
                data = request.get_json() 
                for key in data: 
                    setattr(entry, key, data[key])      
                return make_response(entry.to_dict(rules=('-user',)), 202)
            return make_response({"Error": "Calendar entry unable to be edited."}, 404)
        return {'error': '401 Unauthorized'}, 401
    
    def delete(self, id): 
        if session.get('user_id'):
            entry = CalendarEntry.query.filter(CalendarEntry.id == id).one_or_none()
            if entry: 
                db.session.delete(entry)
                db.session.commit()
                return make_response({}, 204)
            return make_response({"Error": "Calendar entry not found"}, 404)
        return {'error': '401 Unauthorized'}, 401
api.add_resource(CalendarEntriesById, '/calendar_entries/<int:id>')

class JournalEntries(Resource): 
    def get(self): 
        # if session.get('user_id"'):
        entries = [entry.to_dict(rules=('-user','-journal_prompt.journal_entries')) for entry in JournalEntry.query.all()]
        return entries, 200
        # else: 
        #     return make_response({"Error": "You must log in to view past entries"}, 200)
    
    def post(self): 
        # if session.get('user_id"'): 
        data = request.get_json() 
        new_entry = JournalEntry(
            journal_entry=data['journal_entry'], 
            #hardcode user id for now
            user_id=1, 
            prompt_id=data['prompt_id'])
        db.session.add(new_entry)
        db.session.commit()
        return new_entry.to_dict(rules=('-user', '-journal_prompt.journal_entries',)), 200
        # return make_response({"Error": "Sign in to submit a journal entry."}, 404)
api.add_resource(JournalEntries, '/journal_entries')

class JournalEntriesById(Resource):
    def get(self, id): 
        entry = JournalEntry.query.filter(JournalEntry.id == id) 
        if entry is None: 
            return make_response({"Error": "Journal entry not found"}, 404)
        return make_response(entry.to_dict(rules=('-user.journal_entries', '-journal_prompt.journal_entries')), 200)
   
    def patch(self, id): 
        entry = JournalEntry.query.filter(JournalEntry.id == id)
        if entry: 
            data = request.get_json() 
            for key in data: 
                setattr(entry, key, data[key])      
        return make_response({"Error": "Journal entry unable to be edited."}, 404)
 
    def delete(self, id): 
        entry = JournalEntry.query.filter(JournalEntry.id == id)
        if entry: 
            db.session.delete(entry)
            db.session.commit()
            return make_response({}, 204)
        return make_response({"Error": "Journal entry not found"}, 404)
api.add_resource(JournalEntriesById, '/journal_entries/<int:id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
