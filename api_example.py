import uuid
from flask import Flask, request, jsonify
from flask_restplus import Resource, Api
from flask_restplus import fields
from flask_sqlalchemy import SQLAlchemy



application = Flask(__name__)
api = Api(application)
application.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite'
db = SQLAlchemy(application)


message = api.model('message', {
    'Enter': fields.String(required=True, description='message Enter'),
})


message_id = api.model('message_id', {
    'id': fields.String(readOnly=True, description='unique identifier of a message'),
    'Enter': fields.String(required=True, description='message Enter'),
})


class Message(db.Model):
    id = db.Column(db.Text(80), primary_key=True)
    content = db.Column(db.String(120), unique=False, nullable=False)


def __repr__(self):
    return '<Message %r>' % self.content

message_list = []  # creates a list, and later this list will have all the messages in it

def create_message(data):  # this creates the messages, this method is called in the post method
    id = str(uuid.uuid4())
    content = data.get('Enter')
    message = Message(id=id, content=content)
    message_list.append(content)
    db.session.add(message)
    db.session.commit()
    return message


@api.route("/alumlist") # this get class returns all the messages
class AlumList(Resource):
    def get(self):
        return message_list


@api.route("/message/fname")
class FirstName(Resource):    # this is the yoda post class
    @api.expect(message)
    @api.marshal_with(message_id)
    def post(self): # this post method posts a message with yodify, calls create_message method
        result = {'Enter': (request.get_json().get('Enter'))}
        new_message = create_message(result)
        return Message.query.filter(Message.id == new_message.id).one()

@api.route("/message/lname")
class LastName(Resource):    # this is the yoda post class
    @api.expect(message)
    @api.marshal_with(message_id)
    def post(self): # this post method posts a message with yodify, calls create_message method
        result = {'Enter': (request.get_json().get('Enter'))}
        new_message = create_message(result)
        return Message.query.filter(Message.id == new_message.id).one()

@api.route("/message/email")
class Email(Resource):    # this is the yoda post class
    @api.expect(message)
    @api.marshal_with(message_id)
    def post(self): # this post method posts a message with yodify, calls create_message method
        result = {'Enter': (request.get_json().get('Enter'))}
        new_message = create_message(result)
        return Message.query.filter(Message.id == new_message.id).one()

@api.route("/message/website")
class Website(Resource):    # this is the yoda post class
    @api.expect(message)
    @api.marshal_with(message_id)
    def post(self): # this post method posts a message with yodify, calls create_message method
        result = {'Enter': (request.get_json().get('Enter'))}
        new_message = create_message(result)
        return Message.query.filter(Message.id == new_message.id).one()


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
