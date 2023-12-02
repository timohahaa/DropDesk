from flask import request, jsonify
from app import app
from checkers.starknet.checker import check_starknet
from checkers.jupiter.checker import check_jupiter


@app.route('/')
def index():
    return 'Main page'

@app.route('/check/starknet', methods=["GET", "POST"])
def starknet_check():
    payload = request.get_json()

    wallets = []
    try:
        wallets = payload['data']['wallets']
        if wallets is None:
            return jsonify({"error_msg": "wallets array was not provided"})
    except Exception as e:
            return jsonify({"error_msg": "wallets array was not provided"})

    resp = check_starknet(wallets)
    return jsonify(resp)

@app.route('/check/jupiter', methods=["GET", "POST"])
def jupiter_check():
    payload = request.get_json()

    wallets = []
    try:
        wallets = payload['data']['wallets']
        if wallets is None:
            return jsonify({"error_msg": "wallets array was not provided"})
    except Exception as e:
            return jsonify({"error_msg": "wallets array was not provided"})

    resp = check_jupiter(wallets)
    return jsonify(resp)
