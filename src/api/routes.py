"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Hunter, Demon, CombatStyle
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

import requests

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)

CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"error": "User already exists"}), 400

    new_user = User(email=email)
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User created successfully"}), 200


@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    if not data.get("email") or not data.get("password"):
        return jsonify({"error": "Invalid email or password"}), 400

    user = User.query.filter_by(email=data["email"]).first()

    if not user or not user.check_password(data["password"]):
        return jsonify({"error": "Invalid email or password"}), 400

    access_token = create_access_token(identity=str(user.id))
    return jsonify({"message": "Login successful", "token": access_token}), 200


@api.route("/<int:user_id>/favorite_hunters", methods=["GET"])
def get_favorite_hunter(user_id):
    users = db.session.get(User, user_id)
    if not users:
        return jsonify({"msg": "User not found"}), 404
    favorites = [user.serialize() for user in users.favorite_hunter]
    return jsonify(favorites), 200


@api.route("/<int:user_id>/favorite_demons", methods=["GET"])
def get_favorite_demon(user_id):
    users = db.session.get(User, user_id)
    if not users:
        return jsonify({"msg": "User not found"}), 404
    favorites = [user.serialize() for user in users.favorite_demon]
    return jsonify(favorites), 200


@api.route("/<int:user_id>/favorite_combatStyles", methods=["GET"])
def get_favorite_combatStyle(user_id):
    users = db.session.get(User, user_id)
    if not users:
        return jsonify({"msg": "User not found"}), 404
    favorites = [user.serialize() for user in users.favorite_combatStyle]
    return jsonify(favorites), 200


@api.route("/<int:user_id>/favorite_hunter/<int:hunter_id>", methods=["POST"])
def add_favorite_hunter(user_id, hunter_id):
    user = db.session.get(User, user_id)
    hunter = db.session.get(Hunter, hunter_id)

    if not user or not hunter:
        return jsonify({"msg": "User or Hunter not found"}), 404

    if hunter in user.favorite_hunter:
        return jsonify({"msg": "Hunter already in user's favourite"}), 400

    user.favorite_hunter.append(hunter)

    db.session.commit()

    return jsonify(user.serialize()), 200


@api.route("/<int:user_id>/favorite_hunter/<int:hunter_id>", methods=["DELETE"])
def remove_favorite_hunter(user_id, hunter_id):
    user = db.session.get(User, user_id)
    hunter = db.session.get(Hunter, hunter_id)

    if not user or not hunter:
        return jsonify({"msg": "User or Hunter not found"}), 404

    if hunter in user.favorite_hunter:
        user.favorite_hunter.remove(hunter)
        db.session.commit()

    return jsonify(user.serialize()), 200


@api.route("/<int:user_id>/favorite_demon/<int:demon_id>", methods=["POST"])
def add_favorite_demon(user_id, demon_id):
    user = db.session.get(User, user_id)
    demon = db.session.get(Demon, demon_id)

    if not user or not demon:
        return jsonify({"msg": "User or Demon not found"}), 404

    if demon in user.favorite_demon:
        return jsonify({"msg": "demon already in user's favourite"}), 400

    user.favorite_demon.append(demon)

    db.session.commit()

    return jsonify(user.serialize()), 200


@api.route("/<int:user_id>/favorite_demon/<int:demon_id>", methods=["DELETE"])
def remove_favorite_demon(user_id, demon_id):
    user = db.session.get(User, user_id)
    demon = db.session.get(Demon, demon_id)

    if not user or not demon:
        return jsonify({"msg": "User or Demon not found"}), 404

    if demon in user.favorite_demon:
        user.favorite_demon.remove(demon)
        db.session.commit()

    return jsonify(user.serialize()), 200


@api.route("/<int:user_id>/favorite_combat_style/<int:combat_style_id>", methods=["POST"])
def add_favorite_combat_style(user_id, combat_style_id):
    user = db.session.get(User, user_id)
    combat_style = db.session.get(CombatStyle, combat_style_id)

    if not user or not combat_style:
        return jsonify({"msg": "User or Combat Style not found"}), 404

    if combat_style in user.favorite_combatStyle:
        return jsonify({"msg": "combat style already in user's favourite"}), 400

    user.favorite_combatStyle.append(combat_style)

    db.session.commit()

    return jsonify(user.serialize()), 200


@api.route("/favorite_combat_style/<int:combat_style_id>", methods=["DELETE"])
def delete_favorite_combat_style(user_id, combat_style_id):
    user = db.session.get(User, user_id)
    combat_style = db.session.get(CombatStyle, combat_style_id)

    if not user or not combat_style:
        return jsonify({"msg": "User or Combat Style not found"}), 404

    if combat_style in user.favorite_combatStyle:
        user.favorite_combatStyle.remove(combat_style)
        db.session.commit()

    return jsonify(user.serialize()), 200


@api.route("/characters", methods=["GET"])
def get_characters():
    url = f"https://www.demonslayer-api.com/api/v1/characters?limit=45"

    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        return jsonify({"content": data})
    except requests.exceptions.RequestException as e:
        print("Error al obtener personajes:", e)
        return jsonify({"error": "Error al obtener personajes"}), 500


@api.route("/combat-styles", methods=["GET"])
def get_combat_styles():
    url = f"https://www.demonslayer-api.com/api/v1/combat-styles?limit=39"

    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        return jsonify({"content": data})
    except requests.exceptions.RequestException as e:
        print("Error al obtener estilos de combate:", e)
        return jsonify({"error": "Error al obtener estilos de combate"}), 500
