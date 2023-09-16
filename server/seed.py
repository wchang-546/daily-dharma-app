#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker
import datetime 

# Local imports
from app import app
from models import db, User, CalendarEntry, JournalEntry, JournalPrompt 

def create_users(): 
    users = []
    user1 = User(
        username = "wchang",
    )
    user1.set_password('password')
    users.append(user1) 
    return users

def create_calendar_entries():
    entries = [] 
    moods = ["terrible", "bad", "okay", "good", "stoked"]
    entry1 = CalendarEntry(
        mood = rc(moods),
        user_id = 1,
        created_date = datetime.date(2023, 9, 7)
    )
    entry2 = CalendarEntry(
        mood = rc(moods),
        user_id = 1,
        created_date = datetime.date(2023, 9, 8)
    )
    entry3 = CalendarEntry(
        mood = rc(moods),
        user_id = 1,
        created_date = datetime.date(2023, 9, 9)
    )
    entry4 = CalendarEntry(
        mood = rc(moods),
        user_id = 1,
        created_date = datetime.date(2023, 9, 10)
    )
    entry5 = CalendarEntry(
        mood = rc(moods),
        user_id = 1,
        created_date = datetime.date(2023, 9, 11)
    )
    entries.append(entry1)
    entries.append(entry2)
    entries.append(entry3)
    entries.append(entry4)
    entries.append(entry5)
    return entries 

def create_journal_entries():
    journal_entries = []
    journal1 = JournalEntry(
        journal_entry = "I'm grateful for a healthy body.",
        prompt_id = 8,
        user_id = 1
    )
    journal2 = JournalEntry(
        journal_entry = "I want to work for something that makes the world a better place.",
        prompt_id = 1,
        user_id = 1
    )
    journal3 = JournalEntry(
        journal_entry = "I want to date someone who shares the same values and passions as me, and that we can communicate effectively.",
        prompt_id = 4,
        user_id = 1
    )
    journal4 = JournalEntry(
        journal_entry = "The old-growth beauty of forests in the Pacific Northwest",
        prompt_id = 6,
        user_id = 1
    )
    journal_entries.append(journal1)
    journal_entries.append(journal2)
    journal_entries.append(journal3)
    journal_entries.append(journal4)
    return journal_entries

def create_journal_prompts():
    seed_prompts = []
    prompts = ["What purpose would you like in your work?", "What boundaries do you need to set with your work?", "How do you communicate love?", "What are three green flags you look for in people?", "What are actions someone can do to make me feel seen?", "What is something that inspired you recently?", "Where do you look for joy?", "What are you grateful for in this moment?", "When did you feel the happiest in your life? Why?", "What was important to you 5 years ago that no longer is? How come? What changed?", "What are dealbreakers in a friendship?", "What are dealbreakers in a relationship?", "Who do I rely on most for support? Why?", "What qualities do you need in a leader?", "What is something you'd like to learn more about?", "Who do you admire most? Why?", "What does success mean to you?", "What are your top three priorities in work right now?"]
    for item in prompts:
        i = JournalPrompt(prompt = item)
        seed_prompts.append(i)

    return seed_prompts


if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!
        print("Deleting records")
        
        User.query.delete()
        CalendarEntry.query.delete()
        JournalEntry.query.delete()
        JournalPrompt.query.delete()

        print('Seeding users')
        users = create_users()
        db.session.add_all(users)
        print('Seeding calendar entries')
        cal_entries = create_calendar_entries()
        db.session.add_all(cal_entries)
        print('Seeding journal entries')
        journal_entries = create_journal_entries()
        db.session.add_all(journal_entries)
        print('Seeding prompts')
        prompts = create_journal_prompts()
        db.session.add_all(prompts)

        db.session.commit() 
        print('Seed complete')
