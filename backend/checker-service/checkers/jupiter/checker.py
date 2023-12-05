import requests

def check_jupiter(wallets):
    headers = {
        'sec-ch-ua': '"Chromium";v="116", "Not)A;Brand";v="24", "YaBrowser";v="23"',
        'Referer': 'https://airdrop.jup.ag/',
        'sec-ch-ua-mobile': '?0',
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.5845.962 YaBrowser/23.9.1.962 Yowser/2.5 Safari/537.36',
        'sec-ch-ua-platform': '"Linux"',
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
