#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session, make_response 
from flask_restful import Resource

# Local imports
from config import app, db, api

# Add your model imports
from models import User, CalendarEntry, JournalEntry, JournalPrompt


class Login(Resource): 
    def post(self): 
        username = request.get_json()['username']
        password = request.get_json()['password']

        user = User.query.filter(User.username == username).one_or_none()
        if user is None:
            return make_response({"Error": "User not found"}, 401)
        if user.authenticate(password): 
            session['user_id'] = user.id
            return make_response(user.to_dict(), 200)
        else: 
            return make_response({"Error": "Invalid password"}, 401)
api.add_resource(Login, '/login')

class Logout(Resource):
    def delete(self): 
        session['user_id'] = None
        return make_response({}, 204)
api.add_resource(Logout, '/logout')

class Users(Resource): 
    #How will this get be used? To retrieve account info on the login and register page. 
    def get(self): 
        if session.get('user_id'):
             user = User.query.filter(User.id == session['user_id']).one_or_none()
             return make_response(user.to_dict(), 200)
        return {'error': '401 Unauthorized'}, 401
api.add_resource(Users, '/users')

class JournalPrompts(Resource):
    def get(self): 
        prompts = [prompt.to_dict(rules=('-journal_entries',)) for prompt in JournalPrompt.query.all()]
        return make_response(prompts, 200)
api.add_resource(JournalPrompts, '/prompts')

class CalendarEntries(Resource):
    #Assuming session['user_id'] is the identifier 
    def get(self): 
        if session['user_id']: 
            #ERROR: find the right serialization rule here. Is it users.calendar_entries or users? 
            entries = [entry.to_dict(rules=('-user',)) for entry in CalendarEntry.query.filter(CalendarEntry.user_id == session['user_id']).all()]
            return make_response(entries, 200) 
    
    def post(self): 
        if session['user_id']: 
            data = request.get_json() 
            #Check this session['user_id']
            new_entry = CalendarEntry(mood=data['mood'], user_id=session['user_id'])
            db.session.add(new_entry)
            db.session.commit()
            return make_response(new_entry, 200)
        return make_response({"Error": "Sign in to submit a calendar entry."}, 404)
api.add_resource(CalendarEntries, '/calendar_entries')

class CalendarEntriesById(Resource): 
    #Add in session['user_id'] in here, as authorization  
    def get(self, id): 
        entry = CalendarEntry.query.filter(CalendarEntry.id == id).one_or_none()
        if entry is None:
            return make_response({"Error": "Calendary entry not found"}, 404)
        #ERROR: figure out serialization rule here
        return make_response(entry.to_dict(rules=('-user',)), 200)
    
    def patch(self, id): 
        entry = CalendarEntry.query.filter(CalendarEntry.id == id).one_or_none()
        if entry: 
            data = request.get_json() 
            for key in data: 
                setattr(entry, key, data[key])      
            return make_response(entry.to_dict(rules=('-user',)), 202)
        return make_response({"Error": "Calendar entry unable to be edited."}, 404)
    
    def delete(self, id): 
        entry = CalendarEntry.query.filter(CalendarEntry.id == id).one_or_none()
        if entry: 
            db.session.delete(entry)
            db.session.commit()
            return make_response({}, 204)
        return make_response({"Error": "Calendar entry not found"}, 404)
api.add_resource(CalendarEntriesById, '/calendar_entries/<int:id>')

class JournalEntries(Resource): 
    def get(self): 
        if session.get['user_id"']:
            entries = [entry.to_dict(rules=('-user','-journal_prompt.journal_entries')) for entry in JournalEntry.query.filter(JournalEntry.id == session['user_id']).all()]
            return make_response(entries, 200)
        else: 
            return make_response({"Error": "You must log in to view past entries"}, 200)
    
    def post(self): 
        if session['user_id']: 
            data = request.get_json() 
            #Check this session['user_id'] and keys for journal_entry and prompt_id
            new_entry = JournalEntry(journal_entry=data['journal_entry'], user_id=session['user_id'], prompt_id=data['prompt_id'])
            db.session.add(new_entry)
            db.session.commit()
            return make_response(new_entry, 200)
        return make_response({"Error": "Sign in to submit a journal entry."}, 404)
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
