import requests

def check_jupiter(wallets):
    headers = {
        'sec-ch-ua': '"Google Chrome";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
        'Referer': 'https://airdrop.jup.ag/',
        'sec-ch-ua-mobile': '?0',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
        'sec-ch-ua-platform': '"Windows"',
    }

    responce = {
        "data": [],
    }

    # some wallets might have zero $JUP so they will panic
    for wallet in wallets:
        try:
            r = requests.get(f'https://jup-airdrop.zhen8558.workers.dev/allocation/{wallet.lower()}', headers=headers).json()
            responce['data'].append({"address": wallet, "balance": r['tokens_final'], "got_airdrop": True})
        except requests.exceptions.JSONDecodeError:
            responce['data'].append({"address": wallet, "balance": 0, "got_airdrop": False})

    return responce

