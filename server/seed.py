#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, CalendarEntry, JournalEntry, CareerJournalPrompt, SelfGrowthJournalPrompt, RelationshipJournalPrompt

def create_users(): 
    users = []
    user1 = User(
        username = "wchang",
        _password_hash = "password"
    )
    users.append(user1) 
    return users

def create_calendar_entries():
    entries = [] 
    for i in range(10): 
        entry = CalendarEntry(
            mood = fake.paragraph(nb_sentences=1),
            user_id = 1
        )
        entries.append(entry)
    return entries 

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!
        print("Deleting records")
        
        User.query.delete()
        CalendarEntry.query.delete()
        JournalEntry.query.delete()
        CareerJournalPrompt.query.delete()
        RelationshipJournalPrompt.query.delete()
        SelfGrowthJournalPrompt.query.delete()


        print('Seeding users')
        users = create_users()
        db.session.add_all(users)
        print('Seeding calendar entries')
        cal_entries = create_calendar_entries()
        db.session.add_all(cal_entries)

        db.session.commit() 
        print('Seed complete')
