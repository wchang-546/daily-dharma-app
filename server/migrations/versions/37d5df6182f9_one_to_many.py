"""One to many

Revision ID: 37d5df6182f9
Revises: 95bcb36479d4
Create Date: 2023-09-12 15:37:18.857895

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '37d5df6182f9'
down_revision = '95bcb36479d4'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('calendar_entries', schema=None) as batch_op:
        batch_op.add_column(sa.Column('user_id', sa.Integer(), nullable=True))
        batch_op.create_foreign_key(batch_op.f('fk_calendar_entries_user_id_users'), 'users', ['user_id'], ['id'])

    with op.batch_alter_table('journal_entries', schema=None) as batch_op:
        batch_op.add_column(sa.Column('user_id', sa.Integer(), nullable=True))
        batch_op.create_foreign_key(batch_op.f('fk_journal_entries_user_id_users'), 'users', ['user_id'], ['id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('journal_entries', schema=None) as batch_op:
        batch_op.drop_constraint(batch_op.f('fk_journal_entries_user_id_users'), type_='foreignkey')
        batch_op.drop_column('user_id')

    with op.batch_alter_table('calendar_entries', schema=None) as batch_op:
        batch_op.drop_constraint(batch_op.f('fk_calendar_entries_user_id_users'), type_='foreignkey')
        batch_op.drop_column('user_id')

    # ### end Alembic commands ###
