# The following is a basic messageboard API in Python, where the user (who has a unique UUID) submits a message, and 
# it gets attached to a messageboard

import uuid
from flask import Flask, request, jsonify
from flask_restplus import Resource, Api
from flask_restplus import fields
from flask_sqlalchemy import SQLAlchemy
import re
import ssl


application = Flask(__name__)
api = Api(application)
application.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite'
db = SQLAlchemy(application)

# the following two definitions (and class) are the equivalent of our front-end development. They looks really ugly here.
message = api.model('message', {
    'post a message here': fields.String(required=True, description='message post a message here'),
})


message_id = api.model('message_id', {
    'id': fields.String(readOnly=True, description='unique identifier of a message'),
    'post a message here': fields.String(required=True, description='message post a message here'),
})


class Message(db.Model):
    id = db.Column(db.Text(80), primary_key=True)
    content = db.Column(db.String(120), unique=False, nullable=False)


def __repr__(self):
    return '<Message %r>' % self.content


message_list = []  # creates a list, and later this list will have all the messages in it


def create_message(data):  # this creates the messages, this method is called in the post method
    id = str(uuid.uuid4())
    content = data.get('post a message here')
    message = Message(id=id, content=content)
    message_list.append(content)
    db.session.add(message)
    db.session.commit()
    return message


@api.route("/messageboard") # this get class returns all the messages
class MessageBoard(Resource):
    def get(self):
        return message_list


@api.route("/message/post")      # this is the post
class BritishMessage(Resource):
    @api.expect(message)
    @api.marshal_with(message_id)
    def post(self):     # this post method posts a message with british
        result = {'post a message here': request.get_json().get('post a message here')}
        new_message = create_message(result)
        return Message.query.filter(Message.id == new_message.id).one()


@api.route("/message/<string:id>")
class MessageId(Resource):
    @api.marshal_with(message_id)
    def get(self, id):
        return Message.query.filter(Message.id == id).one()


def configure_db():
    db.create_all()
    db.session.commit()


def get_app():
    return application


def main():
    configure_db()
    application.debug = True
    application.run()


if __name__ == "__main__":
    main()
